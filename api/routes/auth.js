// This route controls login registration and logout

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  addUserValidation,
  loginValidation,
} = require("../middlewares/validation");

//REGISTER
router.post("/register", async (req, res) => {
  //console.log(req.body);
  const { error } = addUserValidation(req.body);

  if (error) return res.status(400).json(error.details[0]);

  try {
    //encrypting the password
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.pass_secret
    ).toString();

    //creating new user model
    const newUser = new User(req.body);
    //saving user and send response without the password
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(201).json({
      message: "New account creation is successful.",
      data: others,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Username or email already exists.",
      err: err,
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).json(error.details[0]);

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ message: "User not found!" });

    const validPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.pass_secret
    ).toString(CryptoJS.enc.Utf8);
    if (validPassword !== req.body.password)
      return res.status(401).json({ message: "Wrong credentials!" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        isSeller: user.accountType,
      },
      process.env.jwt_secret,
      { expiresIn: "30d" }
    );

    const { password, ...others } = user._doc;

    res
      .status(200)
      .cookie("jwt", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 2592000000), //2592000000 miliseconds = 30 days
        sameSite: "strict",
      })
      .json(others); // no need to send message and type of message, client will take user automatically to the homepage
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
      err: err,
    });
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  res.status(200).clearCookie("jwt").json({ logout: true });
});

module.exports = router;
