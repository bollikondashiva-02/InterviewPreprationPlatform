const mongoose = require("mongoose");

const codingQuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        options: {
            type: [String],
            required: true
        },

        answer: {
            type: String,
            required: true
        },

        explanation: {
            type: String,
            default: ""
        },

        language: {
            type: String,
            enum: [
                "Java",
                "Python",
                "JavaScript",
                "HTML",
                "CSS",
                "SQL"
            ],
            required: true
        },

        difficulty: {
            type: String,
            enum: [
                "Easy",
                "Medium",
                "Hard"
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "CodingQuestion",
    codingQuestionSchema
);