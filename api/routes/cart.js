const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE CART
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { productId, title, img, quantity, price } = req.body;
  const userId = req.params.id;

  try {
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId === productId);
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        if (productItem.quantity <= 0) {
          cart.products.splice(itemIndex, 1);
          cart.total -= price;
        } else {
          console.log(price,quantity)
          cart.products[itemIndex] = productItem;
          cart.total += (price * quantity);
        }
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, title, img, quantity, price });
        cart.total += price * quantity;
      }
      await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, title, img, quantity, price }],
        total: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

//DELETE CART
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.id });
    res.status(200).json("Cart deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CART BY USER
//It shouldnt be public request but...
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CARTS FOR ADMIN
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
