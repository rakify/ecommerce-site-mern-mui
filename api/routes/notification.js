const router = require("express").Router();
const Notification = require("../models/Notificaton");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verification");

//CREATE Notification
router.post("/", verifyToken, async (req, res) => {
  const newNotification = new Notification(req.body);
  console.log(newNotification)

  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE NotificationS
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Notification
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Notification has been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER NotificationS
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Notifications = await Notification.find({ "user._id": req.params.id });
    console.log(Notifications);
    res.status(200).json(Notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET single Notification
router.get("/Notification/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log(req.params.id);
  try {
    const Notification = await Notification.findById(req.params.id);
    res.status(200).json(Notification);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//GET ALL NotificationS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.sortBy;

  try {
    const Notifications =
      query === "createdAt"
        ? await Notification.find().sort({ createdAt: -1 }).limit(30)
        : await Notification.find().limit(30);
    res.status(200).json(Notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
