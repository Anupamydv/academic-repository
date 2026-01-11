const Subject = require("../models/Subject");

/* ================= CREATE SUBJECT ================= */
// @route POST /api/subjects
// @access Teacher only
exports.createSubject = async (req, res) => {
  try {
    const {
      session,
      course,
      batch,
      department,
      subjectCode,
      subjectName,
    } = req.body;

    if (
      !session ||
      !course ||
      !batch ||
      !department ||
      !subjectCode ||
      !subjectName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subject = await Subject.create({
      session,
      course,
      batch,
      department,
      subjectCode,
      subjectName,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "Subject already exists for selected session/course/batch/department",
      });
    }
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= STUDENT VIEW ================= */
// @route GET /api/subjects
// @access Student + Teacher
exports.getSubjects = async (req, res) => {
  try {
    const { session, course, batch, department } = req.query;

    const filter = {};
    if (session) filter.session = session;
    if (course) filter.course = course;
    if (batch) filter.batch = batch;
    if (department) filter.department = department;

    const subjects = await Subject.find(filter)
      .populate("session", "name")
      .populate("course", "name")
      .populate("batch", "year")
      .populate("department", "name code")
      .sort({ subjectCode: 1 });

    res.json(subjects);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= PDF UPLOAD ================= */
// @route POST /api/subjects/:id/upload
// @access Teacher only
// exports.uploadSubjectPdf = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { type } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // 🔐 Ownership check
//     const subject = await Subject.findOne({
//       _id: id,
//       createdBy: req.user._id,
//     });

//     if (!subject) {
//       return res
//         .status(403)
//         .json({ message: "Not allowed to upload for this subject" });
//     }

//     const pdfUrl = req.file.path;

//     switch (type) {
//       case "syllabus":
//         subject.syllabusPdf = pdfUrl;
//         break;

//       case "mid_q":
//         subject.midTerm.questionPdf = pdfUrl;
//         break;

//       case "mid_sol":
//         subject.midTerm.solutionPdf = pdfUrl;
//         break;

//       case "assignment":
//         subject.assignmentQuizPdf = pdfUrl;
//         break;

//       case "end_q":
//         subject.endSem.questionPdf = pdfUrl;
//         break;

//       case "end_sol":
//         subject.endSem.solutionPdf = pdfUrl;
//         break;

//       default:
//         return res.status(400).json({ message: "Invalid upload type" });
//     }

//     await subject.save();

//     res.json({
//       message: "PDF uploaded successfully",
//       url: pdfUrl,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };



exports.uploadSubjectPdf = async (req, res) => {
  

  try {
    const { id } = req.params;
    const { type } = req.body;

    

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const pdfUrl = req.file.path;

    const updateMap = {
      syllabus: { syllabus: pdfUrl },
      mid_q: { "midTerm.question": pdfUrl },
      mid_sol: { "midTerm.solution": pdfUrl },
      assignment: { assignment: pdfUrl },
      end_q: { "endSem.question": pdfUrl },
      end_sol: { "endSem.solution": pdfUrl },
    };

    if (!updateMap[type]) {
      return res.status(400).json({ message: "Invalid upload type" });
    }

    const subject = await Subject.findByIdAndUpdate(
      id,
      { $set: updateMap[type] },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.json({
      message: "PDF uploaded successfully",
      subject,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload failed" });
  }
};





/* ================= TEACHER DASHBOARD ================= */
// @route GET /api/subjects/all
// @access Teacher only
// exports.getAllSubjects = async (req, res) => {
//   try {
//     const subjects = await Subject.find({
//       createdBy: req.user._id,
//     })
//       .populate("session", "name")
//       .populate("course", "name")
//       .populate("batch", "year")
//       .populate("department", "name code")
//       .sort({ subjectCode: 1 });

//     res.json(subjects);
//   } catch {
//     res.status(500).json({ message: "Failed to fetch subjects" });
//   }
// };
// exports.getAllSubjects = async (req, res) => {
//   try {
//     const subjects = await Subject.find()
//       .populate("session", "name")
//       .populate("course", "name")
//       .populate("batch", "year")
//       .populate("department", "name code")
//       .sort({ subjectCode: 1 });

//     res.json(subjects);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch subjects" });
//   }
// };

// @desc    Get subjects created by logged-in teacher
// @route   GET /api/subjects/all
// @access  Teacher only
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      createdBy: req.user._id,   // 🔐 KEY FIX
    })
      .populate("session", "name")
      .populate("course", "name")
      .populate("batch", "year")
      .populate("department", "name code")
      .sort({ subjectCode: 1 });

    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};


