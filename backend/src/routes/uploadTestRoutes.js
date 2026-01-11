const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { protect, teacherOnly } = require("../middlewares/authMiddleware");

router.post(
  "/pdf",
  protect,
  teacherOnly,
  upload.single("file"),
  (req, res) => {
    res.json({
      message: "PDF uploaded successfully",
      url: req.file.path,
    });
  }
);

module.exports = router;
