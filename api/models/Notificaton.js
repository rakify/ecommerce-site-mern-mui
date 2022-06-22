const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    fromUser: {
      type: Object,
      required: true,
    },
    toUsername: {
      type: String,
      required: true,
      default: "Admin",
    },
    messageSubject: {
      type: Number,
      default: 0, //0 = be buyer 1 = be seller 2 = promos
    },
    messageBody: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
