import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";

import TeacherDashboard from "./dashboard/TeacherDashboard";
import StudentDashboard from "./dashboard/StudentDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";



/* ---------- Role Guard ---------- */
function RequireRole({ role, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== role) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* ---------- Public ---------- */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* ---------- Admin ---------- */}
      <Route
        path="/admin"
        element={
          <RequireRole role="admin">
            <AdminDashboard />
          </RequireRole>
        }
      />

      {/* ---------- Teacher ---------- */}
      <Route
        path="/teacher"
        element={
          <RequireRole role="teacher">
            <TeacherDashboard />
          </RequireRole>
        }
      />

      {/* ---------- Student ---------- */}
      <Route
        path="/student"
        element={
          <RequireRole role="student">
            <StudentDashboard />
          </RequireRole>
        }
      />

      {/* ---------- Fallback ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
