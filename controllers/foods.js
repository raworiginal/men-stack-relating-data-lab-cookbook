const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

/* ====================== Helper Fn ==================== */

const getCurrentUser = async (userId) => {
  return await User.findById(userId);
};

/* ====================== Router ==================== */
router.get("/", async (req, res) => {
  try {
    const currentUser = getCurrentUser(req.session.user._id);
    res.render("foods/index.ejs", {
      currentUser: currentUser.foods,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
/* ================ CREATE ================ */
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});
router.post("/", async (req, res) => {
  try {
    const currentUser = getCurrentUser(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/* ================ Export ================ */
module.exports = router;
