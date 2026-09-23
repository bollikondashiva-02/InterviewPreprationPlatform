const AptitudeQuestion = require("../models/AptitudeQuestion");

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.find();

    res.json(questions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get questions by category
exports.getByCategory = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.find({
      category: req.params.category,
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get questions by difficulty
exports.getByDifficulty = async (req, res) => {
  try {
    const questions = await AptitudeQuestion.find({
      difficulty: req.params.difficulty,
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};