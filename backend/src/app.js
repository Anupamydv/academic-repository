// // src/app.js
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");

// const app = express();


// // const fileRoutes = require("./routes/fileRoutes");

// // app.use("/api/files", fileRoutes);


// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("Academic Repository API running");
// });
// app.use("/api/auth", authRoutes);

// const sessionRoutes = require("./routes/sessionRoutes");

// app.use("/api/sessions", sessionRoutes);

// const courseRoutes = require("./routes/courseRoutes");

// app.use("/api/courses", courseRoutes);

// const batchRoutes = require("./routes/batchRoutes");

// app.use("/api/batches", batchRoutes);

// const departmentRoutes = require("./routes/departmentRoutes");

// app.use("/api/departments", departmentRoutes);

// const subjectRoutes = require("./routes/subjectRoutes");

// app.use("/api/subjects", subjectRoutes);



// const uploadTestRoutes = require("./routes/uploadTestRoutes");

// app.use("/api/upload-test", uploadTestRoutes);


// const studentViewRoutes = require("./routes/studentViewRoutes");

// app.use("/api/student", studentViewRoutes);




// module.exports = app;

// src/app.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ------------------ MIDDLEWARES ------------------ */
app.use(cors({
    origin: "*", 
    credentials: true,
  }));
app.use(express.json());

/* ------------------ TEST ROUTE ------------------ */
app.get("/", (req, res) => {
  res.send("Academic Repository API running");
});

/* ------------------ ROUTES ------------------ */

// Auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Sessions
const sessionRoutes = require("./routes/sessionRoutes");
app.use("/api/sessions", sessionRoutes);

// Courses
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

// Batches
const batchRoutes = require("./routes/batchRoutes");
app.use("/api/batches", batchRoutes);

// Departments
const departmentRoutes = require("./routes/departmentRoutes");
app.use("/api/departments", departmentRoutes);

// Subjects
const subjectRoutes = require("./routes/subjectRoutes");
app.use("/api/subjects", subjectRoutes);

// Student View
const studentViewRoutes = require("./routes/studentViewRoutes");
app.use("/api/student", studentViewRoutes);

// 🔥 PDF VIEW / FILE STREAM ROUTES (ADD HERE)
const fileRoutes = require("./routes/fileRoutes");
app.use("/api/files", fileRoutes);

// Upload Test (optional)
const uploadTestRoutes = require("./routes/uploadTestRoutes");
app.use("/api/upload-test", uploadTestRoutes);

module.exports = app;

