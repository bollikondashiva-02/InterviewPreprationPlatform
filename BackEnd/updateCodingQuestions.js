const mongoose = require("mongoose");
const dotenv = require("dotenv");

const CodingQuestion = require("./models/CodingQuestion");

dotenv.config();

const updateQuestions = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");


        // Question 1
        await CodingQuestion.updateOne(
            {
                _id: "6a5af9099a96d4649a9a9b01"
            },
            {
                $set: {
                    options: [
                        'System.out.println("Hello World");',
                        'print("Hello World");',
                        'Console.WriteLine("Hello World");',
                        'echo "Hello World";'
                    ],

                    answer:
                        'System.out.println("Hello World");',

                    explanation:
                        "System.out.println() is used in Java to print text to the console."
                }
            }
        );


        // Question 2
        await CodingQuestion.updateOne(
            {
                _id: "6a5af9099a96d4649a9a9b02"
            },
            {
                $set: {

                    options: [
                        "Multiply numbers from 1 to n",
                        "Add numbers from 1 to n",
                        "Divide n by every number",
                        "Multiply only even numbers"
                    ],

                    answer:
                        "Multiply numbers from 1 to n",

                    explanation:
                        "The factorial of n is calculated as 1 × 2 × 3 × ... × n."
                }
            }
        );


        console.log("Coding questions updated successfully ✅");


        await mongoose.disconnect();

        console.log("MongoDB Disconnected");

    } catch (error) {

        console.error(
            "Update failed:",
            error.message
        );

    }
};

updateQuestions();
