const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        productId: String,
        title: String,
        img: String,
        price: Number,
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
