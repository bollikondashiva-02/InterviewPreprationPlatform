const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  getAllQuestions,
  deleteQuestionByAdmin,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

// Questions
router.get(
  "/questions",
  authMiddleware,
  adminMiddleware,
  getAllQuestions
);

router.delete(
  "/questions/:id",
  authMiddleware,
  adminMiddleware,
  deleteQuestionByAdmin
);

module.exports = router;