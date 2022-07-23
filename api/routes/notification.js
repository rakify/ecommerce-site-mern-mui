const router = require("express").Router();
const Notification = require("../models/Notificaton");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verification");

//SEND Notification
router.post("/", async (req, res) => {
  const newNotification = new Notification(req.body);

  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});

//DELETE Notification
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id); //anyone can delete notification if he has access to its id
    res.status(200).json({ msg: "Notification has been deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET NotificationS
router.get("/", verifyToken, async (req, res) => {
  const query = req.query.SORTBY;
  console.log(req.user)
  try {
    const notifications =
      query === "CREATEDAT"
        ? await Notification.find({ to: req.user.id })
            .sort({ createdAt: -1 })
            .limit(30)
        : await Notification.find({ to: req.user.id }).limit(30);
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
