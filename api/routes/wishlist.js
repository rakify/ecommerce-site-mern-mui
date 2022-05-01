const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verification");

//CREATE Wishlist
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { productId, title, img, price } = req.body;
  const userId = req.params.id;
  try {
    const wishlist = await Wishlist.findOne({ userId: userId });
    if (wishlist) {
      //Wishlist exists for user
      let itemIndex = wishlist.products.findIndex(
        (p) => p.productId === productId
      );
      if (itemIndex > -1) {
        //product exists in the Wishlist, do nothing
      } else {
        //product does not exists in Wishlist, add new item
        wishlist.products.push({ productId, title, img, price });
      }
      await wishlist.save();
      return res.status(201).send(wishlist);
    } else {
      //no Wishlist for user, create new Wishlist
      const newWishlist = await Wishlist.create({
        userId,
        products: [{ productId, title, img, price }],
      });
      return res.status(201).send(newWishlist);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

//DELETE Wishlist
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Wishlist.deleteMany({ userId: req.params.id });
    res.status(200).json("Wishlist deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Wishlist BY USER
//It shouldnt be public request but...
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.id });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL WishlistS FOR ADMIN
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
