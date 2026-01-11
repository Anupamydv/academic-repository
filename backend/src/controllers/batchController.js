const Batch = require("../models/Batch");

// @desc Create batch
// @route POST /api/batches
// @access Teacher only
exports.createBatch = async (req, res) => {
  try {
    const { year } = req.body;

    if (!year) {
      return res.status(400).json({ message: "Batch year is required" });
    }

    const existing = await Batch.findOne({ year });
    if (existing) {
      return res.status(409).json({ message: "Batch already exists" });
    }

    const batch = await Batch.create({ year });

    res.status(201).json({
      message: "Batch created successfully",
      batch,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all batches
// @route GET /api/batches
// @access Logged-in users
exports.getBatches = async (req, res) => {
  try {
    const batches = await Batch.find().sort({ year: -1 });
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
