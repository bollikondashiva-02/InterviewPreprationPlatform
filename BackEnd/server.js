const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const resultRoutes = require("./routes/resultRoutes");
const codingRoutes = require("./routes/codingRoutes");
const attemptRoutes = require("./routes/attemptRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://127.0.0.1:8080",
            "http://localhost:8080"
        ],
        credentials: true
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/attempts", attemptRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("PrepConnect Server Running 🚀");
});

const PORT = process.env.PORT || 3001;

// Start server only after MongoDB connects
const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("Failed to start server:", error.message);

        process.exit(1);
    }
};

startServer();