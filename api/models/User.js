const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: [3, "Username must have minimum 3 characters."],
      maxlength: [100, "Username can not be more than 100 characters."],
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxlength: [300, "Email can not be more than 300 characters."],
    },
    password: {
      type: String,
      minlength: [4, "Password must have more than 3 characters."],
      maxlength: [300, "Password can not be more than 100 characters."],
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: Number,
      default: 0, //0=Buyer 1=Seller 2=Waiting for approval to change type
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
    secondaryPhoneNumber: {
      type: String,
      default: "",
    },
    currentCity: {
      type: String,
      default: "",
    },
    hometown: {
      type: String,
      default: "",
    },
    coverImg: {
      type: String,
      default:
        "https://images.pexels.com/photos/6156378/pexels-photo-6156378.jpeg",
    },
    img: {
      type: String,
      default:
        "https://cdn130.picsart.com/293313240032201.jpg?to=crop&type=webp&r=675x1000&q=95",
    },
    followedStores: {
      type: Array,
      default: [],
    },
    shippingInfo: {
      type: Object,
      default: {
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "male",
        division: "",
        district: "",
        upazila: "",
        street: "",
      },
    },
    billingInfo: {
      type: Object,
      default: {
        fullName: "",
        phoneNumber: "",
        email: "",
        gender: "male",
        division: "",
        district: "",
        upazila: "",
        street: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
