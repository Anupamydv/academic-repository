const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

//
const { protect, teacherOnly } = require("../middlewares/authMiddleware");

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

router.get("/teacher-test", protect, teacherOnly, (req, res) => {
  res.json({
    message: "Teacher access granted",
  });
});


//

module.exports = router;
