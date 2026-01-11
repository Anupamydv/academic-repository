const express = require("express");
const router = express.Router();

const {
  createSubject,
  getSubjects,        // student view (filtered)
  getAllSubjects,     // teacher view (own subjects)
  uploadSubjectPdf,
} = require("../controllers/subjectController");

const { protect, teacherOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

/* ---------- Teacher ---------- */

// Create subject
router.post("/", protect, teacherOnly, createSubject);

// Teacher dashboard – get all subjects created by teacher
router.get("/all", protect, teacherOnly, getAllSubjects);

// 🔥 FIXED: multer MUST run BEFORE auth checks
// router.post(
//   "/:id/upload",
//   upload.single("file"),   // ✅ FIRST
//   protect,
//   teacherOnly,
//   uploadSubjectPdf
// );
router.post(
  "/:id/upload",
  upload.single("file"),
  uploadSubjectPdf
);



/* ---------- Student ---------- */

// Student view – filtered subjects
router.get("/", protect, getSubjects);

module.exports = router;
