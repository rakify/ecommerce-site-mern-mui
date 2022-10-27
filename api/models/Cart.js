const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
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
        quantity: Number,
        price: Number,
        marketPrice: Number,
        seller: String,
        sellerId: String,
        hasMerchantReturnPolicy: Boolean,
      },
    ],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
