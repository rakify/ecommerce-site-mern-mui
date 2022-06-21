const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    seller: {
      type: String,
      requuired: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      maxlength: 500,
      required: true,
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
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
