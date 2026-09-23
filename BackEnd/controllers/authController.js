const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
const hashedPassword = await bcrypt.hash(password, 10);
const verificationToken =
  crypto.randomBytes(32).toString("hex");

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  verificationToken,
});
await sendEmail(
  user.email,
  verificationToken
);
   res.status(201).json({
  message:
    "Registration successful. Please check your email to verify your account.",
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    if (!user.isVerified) {
   return res.status(400).json({
    message:
      "Please verify your email before logging in.",
   });
}
  

    // Compare passwords

console.log("Entered Password:", password);
console.log("Database Password:", user.password);

const isMatch = await bcrypt.compare(password, user.password);

console.log("Password Match:", isMatch);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid Email or Password",
  });
}

   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login Successful ✅",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    res.send("Email verification completed successfully ✅");

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
};