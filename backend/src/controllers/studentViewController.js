const Subject = require("../models/Subject");

// @desc Student view formatted subjects
// @route GET /api/student/view
// @access Student + Teacher
exports.getStudentView = async (req, res) => {
  try {
    const { session, course, batch, department } = req.query;

    if (!session || !course || !batch || !department) {
      return res.status(400).json({
        message: "All filters are required",
      });
    }

    const subjects = await Subject.find({
      session,
      course,
      batch,
      department,
    })
      .populate("session", "name")
      .populate("course", "name")
      .populate("batch", "year")
      .populate("department", "name")
      .sort({ subjectCode: 1 });

    if (subjects.length === 0) {
      return res.json({
        header: null,
        subjects: [],
      });
    }

    const header = {
      session: subjects[0].session.name,
      course: subjects[0].course.name,
      batch: subjects[0].batch.year,
      department: subjects[0].department.name,
    };

    const formattedSubjects = subjects.map((sub) => ({
      subjectCode: sub.subjectCode,
      subjectName: sub.subjectName,

      syllabus: sub.syllabusPdf,

      midTerm: {
        question: sub.midTerm.questionPdf,
        solution: sub.midTerm.solutionPdf,
      },

      assignment: sub.assignmentQuizPdf,

      endSem: {
        question: sub.endSem.questionPdf,
        solution: sub.endSem.solutionPdf,
      },
    }));

    res.json({
      header,
      subjects: formattedSubjects,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
