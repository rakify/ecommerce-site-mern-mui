const router = require("express").Router();
const Category = require("../models/Category");
const { verifyTokenAndAdmin } = require("../middlewares/verification");

// CREATE A Category
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json({
      message: "New category added successfully.",
      data: savedCategory,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A Category
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A Category
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("the Category has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A Category
router.get("/find/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Categories
router.get("/", async (req, res) => {
  const sortBy = req.query.sortBy;
  try {
    let categories;
    if (sortBy) {
      categories = await Category.find().select(["-createdAt","-updatedAt"]);
    } else {
      categories = await Category.find();
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
