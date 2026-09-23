const mongoose = require("mongoose");

const communicationSchema =
  new mongoose.Schema(
    {
      question: String,
      answer: String,
      category: {
        type: String,
        enum: [
          "HR",
          "GD",
          "Spoken English",
          "Interview",
        ],
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "CommunicationQuestion",
  communicationSchema
);