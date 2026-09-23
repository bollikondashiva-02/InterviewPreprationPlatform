const express = require("express");

const router = express.Router();

const {
    getQuestions,
    getQuestionById,
    submitAnswer
} = require("../controllers/codingController");

const auth = require("../middleware/authMiddleware");


// Get all questions
router.get("/", auth, getQuestions);


// Submit MCQ answer
router.post("/submit", auth, submitAnswer);


// Get one question
router.get("/:id", auth, getQuestionById);


module.exports = router;