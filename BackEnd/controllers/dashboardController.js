const User = require("../models/User");
const Profile = require("../models/Profile");
const Question = require("../models/Question");

const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const profiles = await Profile.countDocuments();
    const questions = await Question.countDocuments();

    res.json({
      users,
      profiles,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};