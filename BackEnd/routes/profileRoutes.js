
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/", protect, async (req, res) => {
  try {
    console.log("req.user =", req.user);

    const user = await User.findById(req.user.id).select("-password");

    console.log("user =", user);

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;