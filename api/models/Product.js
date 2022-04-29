const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
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
      default: "https://cdn-icons-png.flaticon.com/512/40/40162.png?w=740",
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    cat: {
      type: Array,
      required: true,
      trim: true,
    },
    tags: {
      type: Array,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: String,
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
