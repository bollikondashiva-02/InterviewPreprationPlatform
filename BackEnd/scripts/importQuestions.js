require("dotenv").config();
const mongoose = require("mongoose");

const AptitudeQuestion = require("../models/AptitudeQuestion");
const questions = require("../data/aptitudeQuestions.json");

async function importQuestions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Optional: Remove old questions
    await AptitudeQuestion.deleteMany({});
    console.log("🗑️ Old questions deleted");

    // Insert new questions
    await AptitudeQuestion.insertMany(questions);
    console.log(`✅ ${questions.length} questions imported successfully`);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

importQuestions();