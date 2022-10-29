const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true,
    },
    answer: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: Boolean,
      default: false, // false = not answered
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
