const router = require("express").Router();
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const cryptojs = require("crypto-js");

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password && req.body.password.length > 3) {
    req.body.password = cryptojs.AES.encrypt(
      req.body.password,
      process.env.pass_secret
    ).toString();
  }
  if (req.body.password && req.body.password.length <= 3) delete req.body.password;

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User account has been deleted.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET A USER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET All USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.sortBy;

  try {
    const users =
      query === "createdAt"
        ? await User.find().sort({ createdAt: -1 }).limit(30)
        : await User.find();

    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
