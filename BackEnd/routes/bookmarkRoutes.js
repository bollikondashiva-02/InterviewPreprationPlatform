const express = require("express");
const router = express.Router();

const {
  addBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmarkController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addBookmark);

router.get("/", authMiddleware, getBookmarks);

router.delete(
  "/:id",
  authMiddleware,
  deleteBookmark
);

module.exports = router;