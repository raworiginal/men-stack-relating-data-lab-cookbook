const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
/* ====================== Router ==================== */
router.get("/", (req, res) => {
  console.log(req.session.user);
  res.render("foods/index.ejs");
});
module.exports = router;
