const express = require("express");
const router = express.Router();

const { getStudentView } = require("../controllers/studentViewController");
const { protect } = require("../middlewares/authMiddleware");

// Student & teacher view
router.get("/view", protect, getStudentView);

module.exports = router;
