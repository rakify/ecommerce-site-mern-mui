const router = require("express").Router();
const Product = require("../models/Product");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndSeller,
} = require("../middlewares/verification");
const { productValidation } = require("../middlewares/validation");

//CREATE A PRODUCT
router.post("/", verifyTokenAndSeller, async (req, res) => {
  const { error } = productValidation(req.body);

  if (error) return res.status(400).json(error.details[0]);

  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "New product added successfully.", data: savedProduct });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A PRODUCT
router.put("/:id", verifyTokenAndSeller, async (req, res) => {
  const { error } = productValidation(req.body);

  if (error) return res.status(400).json(error.details[0]);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A Product
router.delete("/:id", verifyTokenAndSeller, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("the product has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET single Product
router.get("/find/:id", verifyToken, async (req, res) => {
  console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL PRODUCTS or by category or if requested by seller return him only his products
router.get("/", async (req, res) => {
  const sortByNew = req.query.new;
  const sortByCatergory = req.query.category;
  //console.log(sortByCatergory)
  try {
    let products;
    if (sortByNew) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (sortByCatergory) {
      products = await Product.find({
        cat: {
          $elemMatch: {
            value: sortByCatergory,
          },
        },
      }).sort({
        createdAt: -1,
      });
    } else {
      products = await Product.find();
    }
    console.log(products.length);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET PRODUCTS By Seller
router.get("/:seller", async (req, res) => {
  const seller = req.params.seller;
  const sortByNew = req.query.new;
  const sortByCatergory = req.query.category;
  try {
    let products;
    if (sortByNew) {
      products = await Product.find({ seller }).sort({ createdAt: -1 });
    } else if (sortByCatergory) {
      products = await Product.find({
        seller,
        categories: { $in: [sortByCatergory] },
      });
    } else {
      products = await Product.find({ seller });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
