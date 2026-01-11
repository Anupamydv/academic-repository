const express = require("express");
const router = express.Router();

const {
  createBatch,
  getBatches,
} = require("../controllers/batchController");

const {
  protect,
  teacherOnly,
} = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// Teacher creates batch
router.post("/", protect, adminOnly, createBatch);

// Everyone fetches batches
router.get("/", protect, getBatches);

module.exports = router;
