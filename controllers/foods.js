const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

/* ====================== Helper Fn ==================== */

const getCurrentUser = async () => {
  return await User.findById(req);
};
/* ====================== Router ==================== */
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      currentUser: currentUser.foods,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});
module.exports = router;
