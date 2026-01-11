const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    // Academic hierarchy
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    // Subject details
    subjectCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= PDF FIELDS ================= */

    syllabus: {
      type: String,
      default: null,
    },

    midTerm: {
      question: { type: String, default: null },
      solution: { type: String, default: null },
    },

    assignment: {
      type: String,
      default: null,
    },

    endSem: {
      question: { type: String, default: null },
      solution: { type: String, default: null },
    },

    // Metadata
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate subject in same academic scope
subjectSchema.index(
  {
    session: 1,
    course: 1,
    batch: 1,
    department: 1,
    subjectCode: 1,
  },
  { unique: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
