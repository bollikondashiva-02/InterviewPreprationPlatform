const User = require("../models/User");
const AptitudeQuestion = require("../models/AptitudeQuestion");
const CodingQuestion = require("../models/CodingQuestion");
const CommunicationQuestion = require("../models/CommunicationQuestion");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const aptitude = await AptitudeQuestion.find();

    const coding = await CodingQuestion.find();

    const communication =
      await CommunicationQuestion.find();

    res.json({
      aptitude,
      coding,
      communication,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete question
const deleteQuestionByAdmin = async (
  req,
  res
) => {
  try {
    const { type, id } = req.params;

    if (type === "aptitude") {
      await AptitudeQuestion.findByIdAndDelete(
        id
      );
    } else if (type === "coding") {
      await CodingQuestion.findByIdAndDelete(
        id
      );
    } else if (type === "communication") {
      await CommunicationQuestion.findByIdAndDelete(
        id
      );
    } else {
      return res.status(400).json({
        message: "Invalid question type",
      });
    }

    res.json({
      message:
        "Question deleted successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllQuestions,
  deleteQuestionByAdmin,
};