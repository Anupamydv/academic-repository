const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
} = require("../controllers/courseController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// Admin creates course
router.post("/", protect, adminOnly, createCourse);

// Everyone fetches courses
router.get("/", protect, getCourses);

module.exports = router;
