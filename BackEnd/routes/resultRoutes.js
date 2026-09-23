const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  saveResult,
  getMyResults,
} = require("../controllers/resultController");

router.post("/", auth, saveResult);

router.get("/", auth, getMyResults);

module.exports = router;