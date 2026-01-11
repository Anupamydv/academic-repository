const Course = require("../models/Course");

// @desc Create course
// @route POST /api/courses
// @access Teacher only
exports.createCourse = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Course name is required" });
    }

    const existing = await Course.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Course already exists" });
    }

    const course = await Course.create({ name });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all courses
// @route GET /api/courses
// @access Logged-in users
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ name: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
