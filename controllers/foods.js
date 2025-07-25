const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

/* ====================== Router ==================== */
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      pantry: currentUser.pantry,
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
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

/* ================ READ ================ */
router.get("/:foodId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.foodId);
    res.render("foods/show.ejs", { food: food });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
/* ================ UPDATE ================ */

/* ================ DELETE ================ */
router.delete("/:foodId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.foodId).deleteOne();
    await currentUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
/* ================ Export ================ */
module.exports = router;
