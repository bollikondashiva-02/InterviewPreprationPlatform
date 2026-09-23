const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Quantitative", "Logical", "Verbal"],
      required: true,
    },

    topic: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AptitudeQuestion",
  aptitudeSchema
);