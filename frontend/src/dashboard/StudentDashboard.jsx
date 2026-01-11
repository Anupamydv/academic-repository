import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./studentDashboard.css";

/* ---------- Open PDF in Browser ---------- */
const openPdf = (url) => {
  if (!url) return;
  window.open(
    `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`,
    "_blank",
    "noopener,noreferrer"
  );
};

function StudentDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [filters, setFilters] = useState({
    session: "",
    course: "",
    batch: "",
    department: "",
  });

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    loadFilters();
  }, []);

  /* ---------- Load Filters ---------- */
  const loadFilters = async () => {
    try {
      const [s, c, b, d] = await Promise.all([
        api.get("/sessions"),
        api.get("/courses"),
        api.get("/batches"),
        api.get("/departments"),
      ]);
      setSessions(s.data);
      setCourses(c.data);
      setBatches(b.data);
      setDepartments(d.data);
    } catch {
      alert("Failed to load filters");
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  /* ---------- Fetch Subjects ---------- */
  const handleView = async () => {
    try {
      const res = await api.get("/subjects", { params: filters });
      setSubjects(res.data || []);
    } catch {
      alert("Failed to fetch subjects");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="filter-card">
        <h2>View Syllabus / Question Papers</h2>

        <div className="filter-grid">
          <select name="session" onChange={handleChange}>
            <option value="">Select Session</option>
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <select name="course" onChange={handleChange}>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select name="batch" onChange={handleChange}>
            <option value="">Select Batch</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.year}
              </option>
            ))}
          </select>

          <select name="department" onChange={handleChange}>
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          <button className="view-btn" onClick={handleView}>
            View
          </button>
        </div>
      </div>

      {/* ---------- Results ---------- */}
      {subjects.length > 0 && (
        <div className="result-card">
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject</th>
                <th>Syllabus</th>
                <th>Mid Term</th>
                <th>Assignment</th>
                <th>End Sem</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s._id}>
                  <td>{s.subjectCode}</td>
                  <td>{s.subjectName}</td>

                  {/* Syllabus */}
                  <td>
                    {s.syllabus && (
                      <button
                        className="badge badge-view"
                        onClick={() => openPdf(s.syllabus)}
                      >
                        📘 View
                      </button>
                    )}
                  </td>

                  {/* Mid Term */}
                  <td>
                    {s.midTerm?.question && (
                      <button
                        className="badge badge-q"
                        onClick={() => openPdf(s.midTerm.question)}
                      >
                        ❓ Q
                      </button>
                    )}
                    {s.midTerm?.solution && (
                      <button
                        className="badge badge-sol"
                        onClick={() => openPdf(s.midTerm.solution)}
                      >
                        ✅ Sol
                      </button>
                    )}
                  </td>

                  {/* Assignment */}
                  <td>
                    {s.assignment && (
                      <button
                        className="badge badge-view"
                        onClick={() => openPdf(s.assignment)}
                      >
                        📝 View
                      </button>
                    )}
                  </td>

                  {/* End Sem */}
                  <td>
                    {s.endSem?.question && (
                      <button
                        className="badge badge-q"
                        onClick={() => openPdf(s.endSem.question)}
                      >
                        ❓ Q
                      </button>
                    )}
                    {s.endSem?.solution && (
                      <button
                        className="badge badge-sol"
                        onClick={() => openPdf(s.endSem.solution)}
                      >
                        ✅ Sol
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
