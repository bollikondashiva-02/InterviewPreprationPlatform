const Result = require("../models/Result");

exports.saveResult = async (req, res) => {
  try {
    const {
      score,
      totalQuestions,
      percentage,
    } = req.body;

    const result = await Result.create({
      user: req.user.id,
      testType: "Aptitude",
      score,
      totalQuestions,
      percentage,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMyResults = async (
  req,
  res
) => {
  try {
    const results = await Result.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};