const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getQuestions,
  getByCategory,
  getByDifficulty,
} = require("../controllers/aptitudeController");

router.get("/", auth, getQuestions);

router.get(
  "/category/:category",
  auth,
  getByCategory
);

router.get(
  "/difficulty/:difficulty",
  auth,
  getByDifficulty
);

module.exports = router;