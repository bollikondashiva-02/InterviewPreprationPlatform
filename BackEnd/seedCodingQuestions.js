const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CodingQuestion = require("./models/CodingQuestion");

dotenv.config();

const questions = [

    // ========================================
    // JAVA - EASY
    // ========================================

    {
        title: "Print Hello World",

        description:
            "Write a Java program to print Hello World.",

        options: [
            'System.out.println("Hello World");',
            'print("Hello World");',
            'Console.WriteLine("Hello World");',
            'echo "Hello World";'
        ],

        answer:
            'System.out.println("Hello World");',

        explanation:
            "System.out.println() is used in Java to print text to the console.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Entry Point",

        description:
            "Which method is the entry point of a Java program?",

        options: [
            "start()",
            "main()",
            "run()",
            "execute()"
        ],

        answer: "main()",

        explanation:
            "The main() method is the entry point from which a Java application starts execution.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Integer Variable",

        description:
            "Which data type is used to store an integer value in Java?",

        options: [
            "int",
            "float",
            "char",
            "boolean"
        ],

        answer: "int",

        explanation:
            "The int data type is used to store whole-number integer values.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java String",

        description:
            "Which class is used to represent a sequence of characters in Java?",

        options: [
            "String",
            "Character",
            "Text",
            "StringBuilderClass"
        ],

        answer: "String",

        explanation:
            "String is the Java class used to represent a sequence of characters.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Comment",

        description:
            "Which symbol is used to create a single-line comment in Java?",

        options: [
            "//",
            "/*",
            "#",
            "<!--"
        ],

        answer: "//",

        explanation:
            "In Java, // starts a single-line comment.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Object Creation",

        description:
            "Which keyword is used to create an object in Java?",

        options: [
            "create",
            "object",
            "new",
            "instance"
        ],

        answer: "new",

        explanation:
            "The new keyword is used to create an object and allocate memory for it.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Boolean Values",

        description:
            "Which two values can a boolean variable contain in Java?",

        options: [
            "Yes and No",
            "1 and 0",
            "true and false",
            "On and Off"
        ],

        answer: "true and false",

        explanation:
            "A boolean variable in Java can contain either true or false.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Array Declaration",

        description:
            "Which declaration correctly creates an integer array in Java?",

        options: [
            "int[] numbers;",
            "array int numbers;",
            "int numbers();",
            "integer[] numbers;"
        ],

        answer: "int[] numbers;",

        explanation:
            "int[] numbers; declares a variable capable of referencing an integer array.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Class Keyword",

        description:
            "Which keyword is used to declare a class in Java?",

        options: [
            "Class",
            "class",
            "define",
            "struct"
        ],

        answer: "class",

        explanation:
            "The class keyword is used to define a class in Java.",

        language: "Java",

        difficulty: "Easy"
    },


    {
        title: "Java Inheritance",

        description:
            "Which keyword is used for inheritance between classes in Java?",

        options: [
            "inherits",
            "extends",
            "implements",
            "super"
        ],

        answer: "extends",

        explanation:
            "The extends keyword is used when one class inherits from another class.",

        language: "Java",

        difficulty: "Easy"
    }

];


// ========================================
// CONNECT TO MONGODB
// ========================================

const seedQuestions = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            "MongoDB Connected ✅"
        );


        // Remove existing Java questions
        await CodingQuestion.deleteMany({
            language: "Java"
        });

        console.log(
            "Old Java questions removed."
        );


        // Insert new questions
        const inserted =
            await CodingQuestion.insertMany(
                questions
            );


        console.log(
            `${inserted.length} Java questions inserted successfully ✅`
        );


        await mongoose.disconnect();

        console.log(
            "MongoDB Disconnected."
        );

    } catch (error) {

        console.error(
            "Seeding failed ❌"
        );

        console.error(error);

        process.exit(1);

    }

};


seedQuestions();