const router = require("express").Router();
const Review = require("../models/Review");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verification");

// CREATE A Review
router.post("/", verifyToken, async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(201).json({
      message: "Review added successfully.",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE A Review
router.post("/:reviewId", verifyToken, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body
    );
    res.status(201).json({
      message: "Review updated successfully.",
      data: updatedReview,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A Review only admin can do that
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("The review has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all reviews by product id
router.get("/find/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
