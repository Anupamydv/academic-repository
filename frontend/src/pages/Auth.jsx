// import { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";
// import "./auth.css";

// function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });

//   const handleSubmit = async () => {
//     try {
//       const url = isLogin ? "/auth/login" : "/auth/register";
//       const payload = isLogin
//         ? { email: form.email, password: form.password }
//         : form;

//       const { data } = await api.post(url, payload);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       if (data.user.role === "admin") navigate("/admin");
//       else if (data.user.role === "teacher") navigate("/teacher");
//       else navigate("/student");
//     } catch (err) {
//       alert(err.response?.data?.message || "Authentication failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

//         {!isLogin && (
//           <input
//             placeholder="Full Name"
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//         )}

//         <input
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         {!isLogin && (
//           <select
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//           >
//             <option value="student">Student</option>
//             <option value="teacher">Teacher</option>
//           </select>
//         )}

//         <button onClick={handleSubmit}>
//           {isLogin ? "Login" : "Register"}
//         </button>

//         <p className="toggle">
//           {isLogin ? "New user?" : "Already have an account?"}
//           <span onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? " Create account" : " Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Auth;


import { useState } from "react";
import "./auth.css";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(url, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="auth-subtitle">
          Academic Repository Access Portal
        </p>

        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {!isLogin && (
          <select name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        )}

        <button className="auth-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <div className="auth-switch">
          {isLogin ? (
            <>
              New user?{" "}
              <span onClick={() => setIsLogin(false)}>
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
