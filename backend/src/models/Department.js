const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
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
 * Prevent duplicate departments within the same course
 * Example:
 *  - CSE can exist in B.Tech and M.Tech
 *  - but not twice in B.Tech
 */
departmentSchema.index(
  { course: 1, code: 1 },
  { unique: true }
);

module.exports = mongoose.model("Department", departmentSchema);
