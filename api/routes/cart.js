const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verification");

//CREATE & Update CART
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const {
    productId,
    title,
    img,
    quantity,
    price,
    seller,
    marketPrice,
    hasMerchantReturnPolicy,
  } = req.body;
  console.log(req.body);
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
          cart.total -= price * Math.abs(quantity);
        } else {
          cart.products[itemIndex] = productItem;
          cart.total += price * quantity;
        }
      } else {
        //product does not exists in cart, add new item
        cart.products.push({
          productId,
          title,
          img,
          quantity,
          price,
          marketPrice,
          seller,
          hasMerchantReturnPolicy,
        });
        cart.total += price * quantity;
      }
      await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [
          {
            productId,
            title,
            img,
            quantity,
            price,
            seller,
            marketPrice,
            hasMerchantReturnPolicy,
          },
        ],
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
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    if (cart) {
      const { __v, ...others } = cart._doc;
      res.status(200).json(others);
    }
    if (!cart) {
      // cart is null so lets make a default cart for this user
      initialCart = {
        userId: req.params.id,
        products: [],
        total: 0,
      };
      res.status(200).json(initialCart);
    }
  } catch (err) {
    console.log(err);
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
