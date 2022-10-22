const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    rating: {
      type: Number,
      default: 5,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      default: "Not Approved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
