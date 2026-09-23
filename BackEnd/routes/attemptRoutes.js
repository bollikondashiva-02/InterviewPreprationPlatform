const express = require("express");

const router = express.Router();

const {
    saveAttempt,
    getAttempts,
    getProgress
} = require("../controllers/attemptController");

const auth =
    require("../middleware/authMiddleware");


router.post(
    "/",
    auth,
    saveAttempt
);


router.get(
    "/",
    auth,
    getAttempts
);


router.get(
    "/progress",
    auth,
    getProgress
);


module.exports = router;