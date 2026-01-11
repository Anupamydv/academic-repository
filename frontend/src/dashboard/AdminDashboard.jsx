import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";


function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);

  const [sessionName, setSessionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [selectedCourseForDept, setSelectedCourseForDept] = useState("");
  const [selectedCourseForBatch, setSelectedCourseForBatch] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [s, c, d, b] = await Promise.all([
        api.get("/sessions"),
        api.get("/courses"),
        api.get("/departments"),
        api.get("/batches"),
      ]);

      setSessions(s.data);
      setCourses(c.data);
      setDepartments(d.data);
      setBatches(b.data);
    } catch {
      alert("Failed to load admin data");
    }
  };

  const createSession = async () => {
    if (!sessionName) return alert("Session name required");
    await api.post("/sessions", { name: sessionName });
    setSessionName("");
    loadAll();
  };

  const createCourse = async () => {
    if (!courseName) return alert("Course name required");
    await api.post("/courses", { name: courseName });
    setCourseName("");
    loadAll();
  };

  const createDepartment = async () => {
    if (!departmentName || !departmentCode || !selectedCourseForDept) {
      return alert("Department name, code, and course are required");
    }

    await api.post("/departments", {
      name: departmentName,
      code: departmentCode,
      course: selectedCourseForDept,
    });

    setDepartmentName("");
    setDepartmentCode("");
    setSelectedCourseForDept("");
    loadAll();
  };

  const createBatch = async () => {
    if (!batchYear || !selectedCourseForBatch) {
      return alert("Batch year and course are required");
    }

    await api.post("/batches", {
      year: batchYear,
      course: selectedCourseForBatch,
    });

    setBatchYear("");
    setSelectedCourseForBatch("");
    loadAll();
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    
  <div className="admin-dashboard">
    <div className="admin-header">
      <h1>Admin Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>

    <div className="admin-grid">
      {/* -------- Sessions -------- */}
      <div className="admin-card">
        <h3>Sessions</h3>
        <input
          placeholder="Jan–Jun 2026"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
        <button className="add-btn" onClick={createSession}>
          Add Session
        </button>
        <ul className="admin-list">
          {sessions.map((s) => (
            <li key={s._id}>{s.name}</li>
          ))}
        </ul>
      </div>

      {/* -------- Courses -------- */}
      <div className="admin-card">
        <h3>Courses</h3>
        <input
          placeholder="B.Tech"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button className="add-btn" onClick={createCourse}>
          Add Course
        </button>
        <ul className="admin-list">
          {courses.map((c) => (
            <li key={c._id}>{c.name}</li>
          ))}
        </ul>
      </div>

      {/* -------- Departments -------- */}
      <div className="admin-card">
        <h3>Departments</h3>

        <select
          value={selectedCourseForDept}
          onChange={(e) => setSelectedCourseForDept(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />

        <input
          placeholder="Department Code (EE)"
          value={departmentCode}
          onChange={(e) => setDepartmentCode(e.target.value)}
        />

        <button className="add-btn" onClick={createDepartment}>
          Add Department
        </button>

        <ul className="admin-list">
          {departments.map((d) => (
            <li key={d._id}>
              {d.name} ({d.code}) — {d.course?.name}
            </li>
          ))}
        </ul>
      </div>

      {/* -------- Batches -------- */}
      <div className="admin-card">
        <h3>Batches</h3>

        <select
          value={selectedCourseForBatch}
          onChange={(e) => setSelectedCourseForBatch(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Batch Year (2023)"
          value={batchYear}
          onChange={(e) => setBatchYear(e.target.value)}
        />

        <button className="add-btn" onClick={createBatch}>
          Add Batch
        </button>

        <ul className="admin-list">
          {batches.map((b) => (
            <li key={b._id}>
              {b.year} — {b.course?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

  
}

/* ---------- Single Input Section ---------- */
function Section({ title, value, setValue, onCreate, list, placeholder }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>{title}</h3>

      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={onCreate} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Two Input Section (Department) ---------- */
function SectionWithTwoInputs({
  title,
  value1,
  setValue1,
  placeholder1,
  value2,
  setValue2,
  placeholder2,
  onCreate,
  list,
}) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>{title}</h3>

      <input
        placeholder={placeholder1}
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
      />

      <input
        placeholder={placeholder2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
        style={{ marginLeft: "8px" }}
      />

      <button onClick={onCreate} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
