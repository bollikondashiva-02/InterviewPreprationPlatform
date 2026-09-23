const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const findUsers = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");

        const users = await User.find(
            {},
            {
                name: 1,
                email: 1,
                _id: 0
            }
        );

        console.log("Registered Users:");

        console.log(users);

        await mongoose.disconnect();

    } catch (error) {

        console.log(
            "Error:",
            error.message
        );

    }

};

findUsers();
