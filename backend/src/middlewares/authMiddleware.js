const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ================= PROTECT ================= */
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

/* ================= TEACHER ONLY ================= */
exports.teacherOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  // normalize role (VERY IMPORTANT)
  const role = String(req.user.role).toLowerCase();

  if (role !== "teacher") {
    return res.status(403).json({
      message: "Access denied. Teachers only.",
    });
  }

  next();
};
