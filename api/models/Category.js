const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
      maxlength: 500,
      default: [],
    },
    img: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
