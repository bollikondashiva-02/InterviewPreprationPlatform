require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const CodingQuestion = require("../models/CodingQuestion");

async function importQuestions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Read JSON file
    const filePath = path.join(
      __dirname,
      "../data/codingQuestions.json"
    );

    const questions = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    // Delete old questions
    await CodingQuestion.deleteMany();

    // Insert new questions
    await CodingQuestion.insertMany(questions);

    console.log(
      `${questions.length} Coding Questions Imported Successfully ✅`
    );

    process.exit();
  } catch (err) {
    console.error("Import Error:", err);
    process.exit(1);
  }
}

importQuestions();