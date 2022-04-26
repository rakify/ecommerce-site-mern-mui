const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    products: [
      {
        productId: String,
        title: String,
        img: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryTimeSlot: {
      type: String,
      default: "Not provided",
    },
    paymentMethod: {
      type: String,
      default: "Cash on delivery",
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
