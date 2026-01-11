const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Prevent duplicate batches within the same course
 * Example:
 *  - 2023 can exist in B.Tech and M.Tech
 *  - but not twice in B.Tech
 */
batchSchema.index(
  { course: 1, year: 1 },
  { unique: true }
);

module.exports = mongoose.model("Batch", batchSchema);
