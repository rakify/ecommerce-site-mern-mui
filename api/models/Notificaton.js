const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    from: {
      type: Object,
      required: true,
    },
    to: {
      type: String,
      required: true,
      default: "61460be8f89ac4ff55b1cf7a",
    },
    messageSubject: {
      type: Number,
      default: 0, //0 = be buyer 1 = be seller 2 = buyer accepted 3 = seller accepted 4 = buyer declined 5 = seller declined 
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
