import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./teacherDashboard.css";

/* ---------- Utils ---------- */
const hasFile = (v) => typeof v === "string" && v.length > 0;

const openPdf = async (url, name = "document") => {
  if (!url) return;

  try {
    const res = await fetch(url);
    const blob = await res.blob();

    const blobUrl = window.URL.createObjectURL(
      new Blob([blob], { type: "application/pdf" })
    );

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${name}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch {
    alert("Failed to download PDF");
  }
};

function TeacherDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const [newSubject, setNewSubject] = useState({
    subjectCode: "",
    subjectName: "",
  });

  /* ---------- Load ---------- */
  useEffect(() => {
    fetchSubjects();
    api.get("/sessions").then((r) => setSessions(r.data));
    api.get("/courses").then((r) => setCourses(r.data));
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      setDepartments([]);
      setBatches([]);
      return;
    }
    api
      .get(`/departments?course=${selectedCourse}`)
      .then((r) => setDepartments(r.data));
    api
      .get(`/batches?course=${selectedCourse}`)
      .then((r) => setBatches(r.data));
  }, [selectedCourse]);

  const fetchSubjects = async () => {
    const res = await api.get("/subjects/all");
    setSubjects(res.data || []);
  };

  const handleCreateSubject = async () => {
    if (
      !selectedSession ||
      !selectedCourse ||
      !selectedDepartment ||
      !selectedBatch
    ) {
      return alert("Select all academic fields");
    }
    if (!newSubject.subjectCode || !newSubject.subjectName) {
      return alert("Subject code & name required");
    }

    await api.post("/subjects", {
      session: selectedSession,
      course: selectedCourse,
      department: selectedDepartment,
      batch: selectedBatch,
      subjectCode: newSubject.subjectCode,
      subjectName: newSubject.subjectName,
    });

    setNewSubject({ subjectCode: "", subjectName: "" });
    fetchSubjects();
  };

  const uploadPdf = async (id, type, file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);
    await api.post(`/subjects/${id}/upload`, fd);
    fetchSubjects();
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="teacher-dashboard">
      <div className="teacher-header">
        <h1>Teacher Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ================= Academic Scope ================= */}
      <div className="subject-card scope-card">
        <select onChange={(e) => setSelectedSession(e.target.value)}>
          <option value="">Session</option>
          {sessions.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="">Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedBatch(e.target.value)}>
          <option value="">Batch</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.year}
            </option>
          ))}
        </select>
      </div>

      <div className="subject-card create-card">
        <input
          placeholder="Subject Code"
          value={newSubject.subjectCode}
          onChange={(e) =>
            setNewSubject({ ...newSubject, subjectCode: e.target.value })
          }
        />

        <input
          placeholder="Subject Name"
          value={newSubject.subjectName}
          onChange={(e) =>
            setNewSubject({ ...newSubject, subjectName: e.target.value })
          }
        />

        <button className="create-btn" onClick={handleCreateSubject}>
          Create Subject
        </button>
      </div>

      {/* Subjects */}
      <div className="subjects-grid">
        {subjects.map((sub) => (
          <div key={sub._id} className="subject-card">
            <div className="subject-title">
              {sub.subjectCode} – {sub.subjectName}
            </div>

            {/* 3 × 2 TABLE */}
            <div className="upload-grid">
              <UploadBox
                label="Syllabus"
                file={sub.syllabus}
                onView={() =>
                  openPdf(sub.syllabus, `${sub.subjectCode}_Syllabus`)
                }
                onUpload={(f) => uploadPdf(sub._id, "syllabus", f)}
              />

              <UploadBox
                label="Assignment"
                file={sub.assignment}
                onView={() =>
                  openPdf(sub.assignment, `${sub.subjectCode}_Assignment`)
                }
                onUpload={(f) => uploadPdf(sub._id, "assignment", f)}
              />

              <UploadBox
                label="Mid Q"
                file={sub.midTerm?.question}
                onView={() =>
                  openPdf(sub.midTerm.question, `${sub.subjectCode}_Mid_Q`)
                }
                onUpload={(f) => uploadPdf(sub._id, "mid_q", f)}
              />

              <UploadBox
                label="Mid Sol"
                file={sub.midTerm?.solution}
                onView={() =>
                  openPdf(sub.midTerm.solution, `${sub.subjectCode}_Mid_Sol`)
                }
                onUpload={(f) => uploadPdf(sub._id, "mid_sol", f)}
              />

              <UploadBox
                label="End Q"
                file={sub.endSem?.question}
                onView={() =>
                  openPdf(sub.endSem.question, `${sub.subjectCode}_End_Q`)
                }
                onUpload={(f) => uploadPdf(sub._id, "end_q", f)}
              />

              <UploadBox
                label="End Sol"
                file={sub.endSem?.solution}
                onView={() =>
                  openPdf(sub.endSem.solution, `${sub.subjectCode}_End_Sol`)
                }
                onUpload={(f) => uploadPdf(sub._id, "end_sol", f)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Upload Box ---------- */
function UploadBox({ label, file, onView, onUpload }) {
  return (
    <div className="upload-box">
      <b>{label}</b>
      {hasFile(file) && (
        <button className="badge-view" onClick={onView}>
          View
        </button>
      )}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onUpload(e.target.files[0])}
      />
    </div>
  );
}

export default TeacherDashboard;
