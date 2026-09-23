const mongoose = require("mongoose");
const dotenv = require("dotenv");

const CodingQuestion = require("./models/CodingQuestion");

dotenv.config();

const findQuestions = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");

        const questions = await CodingQuestion.find({
            language: "Java"
        });

        console.log(
            JSON.stringify(questions, null, 2)
        );

        await mongoose.disconnect();

    } catch (error) {

        console.error(
            "Error:",
            error.message
        );

    }
};

findQuestions();
