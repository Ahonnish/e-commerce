const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");


const { protect } = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;