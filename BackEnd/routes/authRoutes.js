const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
  registerUser,
  loginUser,
  verifyEmail,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token",verifyEmail);


// Protected Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile Access Granted ✅",
    user: req.user
  });
});


router.get("/", (req, res) => {
  res.send("Auth Route Working ✅");
});
router.get("/status/:email", async (req, res) => {
  try {

    const user = await User.findOne({
      email: req.params.email
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      isVerified: user.isVerified
    });

  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }
});
module.exports =  router;