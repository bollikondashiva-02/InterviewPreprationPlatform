const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodingQuestion",
      required: true,
    },

    language: {
      type: String,
      enum: [
        "Java",
        "Python",
        "JavaScript",
        "HTML",
        "CSS",
        "SQL",
      ],
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Attempted",
        "Accepted",
        "Wrong Answer",
      ],
      default: "Attempted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Attempt",
  attemptSchema
);