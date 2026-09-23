const CodingQuestion =
    require("../models/CodingQuestion");

const Attempt =
    require("../models/Attempt");


// ========================================
// GET ALL CODING QUESTIONS
// ========================================

exports.getQuestions = async (req, res) => {
       console.log("GET /coding CALLED");
console.log("Language:", req.query.language);
    try {

        const language =
            req.query.language;


        let questions;


        // ========================================
        // GET QUESTIONS BY LANGUAGE
        // ========================================

        if (language) {

            questions =
                await CodingQuestion.find({

                    language: language

                })
                .sort({
                    createdAt: 1
                });

        }

        // ========================================
        // GET ALL QUESTIONS
        // ========================================

        else {

            questions =
                await CodingQuestion.find()
                .sort({
                    createdAt: 1
                });

        }


        console.log(
            "Coding Questions:",
            questions.length
        );


        res.status(200).json(
            questions
        );

    }
    catch (err) {

        console.error(
            "Error loading coding questions:",
            err
        );

        res.status(500).json({

            message:
                "Failed to load coding questions",

            error:
                err.message

        });

    }

};


// ========================================
// GET ONE CODING QUESTION
// ========================================

exports.getQuestionById = async (req, res) => {

    try {

        const question =
            await CodingQuestion.findById(
                req.params.id
            );


        if (!question) {

            return res.status(404).json({

                message:
                    "Question not found"

            });

        }


        res.status(200).json(
            question
        );

    }
    catch (err) {

        console.error(
            "Error loading question:",
            err
        );

        res.status(500).json({

            message:
                "Failed to load question",

            error:
                err.message

        });

    }

};


// ========================================
// SUBMIT CODING MCQ ANSWER
// ========================================

exports.submitAnswer = async (req, res) => {

    try {

        const {
            questionId,
            selectedAnswer
        } = req.body;


        console.log(
            "Question ID:",
            questionId
        );

        console.log(
            "Selected Answer:",
            JSON.stringify(
                selectedAnswer
            )
        );


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !questionId ||
            !selectedAnswer
        ) {

            return res.status(400).json({

                message:
                    "Question ID and answer are required."

            });

        }


        // ========================================
        // FIND QUESTION
        // ========================================

        const question =
            await CodingQuestion.findById(
                questionId
            );


        if (!question) {

            return res.status(404).json({

                message:
                    "Question not found."

            });

        }


        // ========================================
        // COMPARE ANSWERS
        // ========================================

        const correctAnswer =
            String(
                question.answer
            ).trim();


        const userAnswer =
            String(
                selectedAnswer
            ).trim();


        const isCorrect =
            correctAnswer ===
            userAnswer;


        console.log(
            "Correct Answer:",
            JSON.stringify(
                correctAnswer
            )
        );

        console.log(
            "User Answer:",
            JSON.stringify(
                userAnswer
            )
        );

        console.log(
            "Is Correct:",
            isCorrect
        );


        // ========================================
        // STATUS
        // ========================================

        const status =
            isCorrect
                ? "Accepted"
                : "Wrong Answer";


        // ========================================
        // FIND EXISTING ATTEMPT
        // ========================================

        let attempt =
            await Attempt.findOne({

                user:
                    req.user.id,

                question:
                    questionId

            });


        // ========================================
        // UPDATE EXISTING ATTEMPT
        // ========================================

        if (attempt) {

            attempt.language =
                question.language;

            attempt.code =
                selectedAnswer;

            attempt.status =
                status;

            await attempt.save();

        }


        // ========================================
        // CREATE NEW ATTEMPT
        // ========================================

        else {

            attempt =
                await Attempt.create({

                    user:
                        req.user.id,

                    question:
                        questionId,

                    language:
                        question.language,

                    code:
                        selectedAnswer,

                    status:
                        status

                });

        }


        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            correct:
                isCorrect,

            message:
                isCorrect
                    ? "Correct Answer! 🎉"
                    : "Wrong Answer ❌",

            explanation:
                question.explanation || "",

            attemptId:
                attempt._id

        });

    }
    catch (err) {

        console.error(
            "Submit answer error:",
            err
        );

        res.status(500).json({

            message:
                "Failed to submit answer.",

            error:
                err.message

        });

    }

};