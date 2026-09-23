const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();


const resetPassword = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected ✅");

        const email = "shivakumarbollikonda08@gmail.com";

        const newPassword = "YourNewPassword@123";

        const user = await User.findOne({
            email: email
        });

        if (!user) {

            console.log("User not found ❌");

            process.exit(1);

        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        console.log("Password reset successfully ✅");

        await mongoose.disconnect();

        console.log("MongoDB Disconnected");

        process.exit(0);

    } catch (error) {

        console.error(
            "Password reset failed:",
            error.message
        );

        process.exit(1);

    }

};

resetPassword();