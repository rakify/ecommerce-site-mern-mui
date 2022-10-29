const router = require("express").Router();
const Question = require("../models/Question");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verification");

// CREATE A Question
router.post("/", verifyToken, async (req, res) => {
  const newQuestion = new Question(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json({
      message:
        "Question added successfully. We will notify you once seller answer it.",
      data: savedQuestion,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A Question only admin can do that
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Question = await Question.findByIdAndDelete(req.params.id);
    res.status(200).json("The Question has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all Questions by product id
router.get("/find/:id", async (req, res) => {
  try {
    const questions = await Question.find({ productId: req.params.id });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all Questions that is already answered by product id
router.get("/findAnswers/:id", async (req, res) => {
  try {
    const questions = await Question.find({
      productId: req.params.id,
      status: 1,
    });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
