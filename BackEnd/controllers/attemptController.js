const Attempt = require("../models/Attempt");

// ========================================
// SAVE ATTEMPT
// ========================================

exports.saveAttempt = async (req, res) => {

    try {

        const {
            question,
            language,
            code,
            status
        } = req.body;


        // ========================================
        // VALIDATION
        // ========================================

        if (!question || !language || !code || !status) {

            return res.status(400).json({

                message:
                    "Question, language, code and status are required."

            });

        }


        // ========================================
        // CHECK EXISTING ATTEMPT
        // ========================================

        let attempt =
            await Attempt.findOne({

                user: req.user.id,

                question: question

            });


        // ========================================
        // UPDATE EXISTING ATTEMPT
        // ========================================

        if (attempt) {

            attempt.language = language;

            attempt.code = code;

            attempt.status = status;

            await attempt.save();


            return res.status(200).json({

                message:
                    "Attempt updated successfully.",

                attempt

            });

        }


        // ========================================
        // CREATE NEW ATTEMPT
        // ========================================

        attempt =
            await Attempt.create({

                user: req.user.id,

                question: question,

                language: language,

                code: code,

                status: status

            });


        res.status(201).json({

            message:
                "Attempt saved successfully.",

            attempt

        });

    }
    catch (err) {

        console.error(
            "Save Attempt Error:",
            err
        );

        res.status(500).json({

            message:
                err.message

        });

    }

};


// ========================================
// GET USER ATTEMPTS
// ========================================

exports.getAttempts = async (req, res) => {

    try {

        const attempts =
            await Attempt.find({

                user: req.user.id

            })
            .populate(
                "question",
                "title difficulty language"
            )
            .sort({
                createdAt: -1
            });


        res.status(200).json(
            attempts
        );

    }
    catch (err) {

        console.error(
            "Get Attempts Error:",
            err
        );

        res.status(500).json({

            message:
                err.message

        });

    }

};


// ========================================
// GET CODING PROGRESS
// ========================================

exports.getProgress = async (req, res) => {

    try {

        const userId =
            req.user.id;

        const language =
            req.query.language;


        console.log(
            "========================================"
        );

        console.log(
            "GET CODING PROGRESS"
        );

        console.log(
            "User ID:",
            userId
        );

        console.log(
            "Language:",
            language
        );

        console.log(
            "========================================"
        );


        // ========================================
        // BUILD FILTER
        // ========================================

        const filter = {

            user: userId

        };


        // ========================================
        // FILTER BY LANGUAGE
        // ========================================

        if (language) {

            filter.language =
                language;

        }


        // ========================================
        // GET ATTEMPTS
        // ========================================

        const attempts =
            await Attempt.find(
                filter
            );


        console.log(
            "Attempts Found:",
            attempts.length
        );


        // ========================================
        // QUESTION STATUS
        // ========================================

        const questionStatus = {};


        attempts.forEach(
            (attempt) => {

                if (!attempt.question) {

                    return;

                }


                const questionId =
                    attempt.question.toString();


                questionStatus[questionId] =
                    attempt.status;

            }
        );


        // ========================================
        // ATTEMPTED QUESTIONS
        // ========================================

        const attempted =
            Object.keys(
                questionStatus
            ).length;


        // ========================================
        // SOLVED QUESTIONS
        // ========================================

        const solved =
            Object.values(
                questionStatus
            )
            .filter(
                status =>
                    status === "Accepted"
            )
            .length;


        // ========================================
        // RESPONSE
        // ========================================

        res.status(200).json({

            attempted,

            solved,

            questionStatus

        });

    }
    catch (err) {

        console.error(
            "Progress Error:",
            err
        );

        res.status(500).json({

            message:
                "Failed to load coding progress.",

            error:
                err.message

        });

    }

};