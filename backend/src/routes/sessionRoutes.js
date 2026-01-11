const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");
const {
  createSession,
  getSessions,
} = require("../controllers/sessionController");

// Admin creates session
router.post("/", protect, adminOnly, createSession);

// Everyone can read
router.get("/", protect, getSessions);

module.exports = router;
