// import { useNavigate } from "react-router-dom";
// import "./landing.css";

// function Landing() {
//   const navigate = useNavigate();

//   return (
//     <div className="landing">
//       <nav className="landing-nav">
//         <h2>Academic Repository</h2>
//         <button onClick={() => navigate("/auth")}>Login</button>
//       </nav>

//       <div className="landing-hero">
//         <h1>One Platform for All Academic Resources</h1>
//         <p>
//           Access syllabi, previous year papers, solutions and assignments —
//           structured by session, course, department and batch.
//         </p>

//         <div className="landing-actions">
//           <button className="primary" onClick={() => navigate("/auth")}>
//             Get Started
//           </button>
//           <button className="secondary" onClick={() => navigate("/auth")}>
//             Student / Teacher Login
//           </button>
//         </div>
//       </div>

//       <footer className="landing-footer">
//         © {new Date().getFullYear()} Academic Repository
//       </footer>
//     </div>
//   );
// }

// export default Landing;




import { useNavigate } from "react-router-dom";
import "./landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* ---------- NAV ---------- */}
      <nav className="landing-nav">
        <h2>Academic Repository</h2>
        <button onClick={() => navigate("/auth")}>Login</button>
      </nav>

      {/* ---------- HERO ---------- */}
      <section className="landing-hero">
        <h1>Centralized Academic Repository</h1>
        <p>
          A structured platform to access syllabi, previous year question papers,
          solutions and assignments — organized by session, course, department
          and batch.
        </p>

        <div className="landing-actions">
          <button className="primary" onClick={() => navigate("/auth")}>
            Get Started
          </button>
          <button className="secondary" onClick={() => navigate("/auth")}>
            Student / Teacher Login
          </button>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="landing-features">
        <Feature
          title="📘 Organized Content"
          desc="All academic resources arranged session-wise and course-wise."
        />
        <Feature
          title="👩‍🏫 Teacher Friendly"
          desc="Upload syllabus, question papers and solutions with ease."
        />
        <Feature
          title="🎓 Student Access"
          desc="Quickly find and view all academic materials in one place."
        />
        <Feature
          title="🛡️ Admin Control"
          desc="Manage sessions, courses, departments and batches centrally."
        />
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} Academic Repository
      </footer>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default Landing;
