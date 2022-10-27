const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSeller,
} = require("../middlewares/verification");

//CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  //console.log(newOrder)

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE ORDERS
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Order has been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.params.id }).sort({
      createdAt: -1,
    });
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET single order
router.get("/order/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log(req.params.id);
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL ORDERS
router.get("/", verifyTokenAndSeller, async (req, res) => {
  console.log(req.user);
  try {
    const orders = await Order.find({ seller: req.user.username })
      .sort({ createdAt: -1 })
      .limit(50);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elementMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
