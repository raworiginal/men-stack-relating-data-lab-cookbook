const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

/* ==================== READ ==================== */
/* All Users */
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const allOtherUsers = await User.find({
      username: { $ne: currentUser.username },
    });
    res.render("users/index.ejs", {
      allOtherUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/* One User */
router.get("/:userId", async (req, res) => {
  try {
    const otherUser = await User.findById(req.params.userId);
    res.render("users/show.ejs", {
      otherUser: otherUser.username,
      pantry: otherUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/* ================ Export ================ */
module.exports = router;
