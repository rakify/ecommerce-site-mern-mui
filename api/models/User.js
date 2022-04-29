const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: [3, "Username must be more than 3 characters"],
      maxlength: [30, "Username must be less than 30 characters"],
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [4, "Password must be more than 4 characters"],
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "male",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default:
        "https://cdn130.picsart.com/293313240032201.jpg?to=crop&type=webp&r=675x1000&q=95",
    },
    shippingInfo: {
      type: Object,
      default: {
        fullName: "",
        phoneNumber: "",
        gender: "male",
        division: "",
        distrcit: "",
        upazila: "",
        street: "",
      },
    },
    billingInfo: {
      type: Object,
      default: {
        fullName: "",
        phoneNumber: "",
        gender: "male",
        division: "",
        distrcit: "",
        upazila: "",
        street: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
