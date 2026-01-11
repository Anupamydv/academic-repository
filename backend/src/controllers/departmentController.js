const Department = require("../models/Department");

// @desc Create department
// @route POST /api/departments
// @access Teacher only
exports.createDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "Department name and code are required",
      });
    }

    const existing = await Department.findOne({
      $or: [{ name }, { code }],
    });

    if (existing) {
      return res.status(409).json({
        message: "Department already exists",
      });
    }

    const department = await Department.create({ name, code });

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all departments
// @route GET /api/departments
// @access Logged-in users
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
