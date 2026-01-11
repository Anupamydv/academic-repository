const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
} = require("../controllers/departmentController");

const {
  protect,
  teacherOnly,
} = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// Teacher creates department
router.post("/", protect, adminOnly, createDepartment);

// Everyone fetches departments
router.get("/", protect, getDepartments);

module.exports = router;
