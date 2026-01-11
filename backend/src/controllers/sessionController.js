const Session = require("../models/Session");

// @desc Create session
// @route POST /api/sessions
// @access Teacher only
exports.createSession = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Session name is required" });
    }

    const existing = await Session.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Session already exists" });
    }

    const session = await Session.create({ name });

    res.status(201).json({
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all sessions
// @route GET /api/sessions
// @access Public (logged-in users)
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
