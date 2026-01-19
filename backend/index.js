import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

/* ROUTES */
import authRoutes from "./routes/auth.js";
import seedRoutes from "./routes/seed.js";

import students from "./routes/students.js";
import marks from "./routes/marks.js";
import attendance from "./routes/attendance.js";
import fees from "./routes/fees.js";
import backlogs from "./routes/backlogs.js";
import disciplinary from "./routes/disciplinary.js";

import faculty from "./routes/faculty.js";
import facultyAttendance from "./routes/facultyAttendance.js";
import facultyMarks from "./routes/facultyMarks.js";

import admin from "./routes/admin.js";
import timetable from "./routes/timetable.js";
import results from "./routes/results.js";
import promotion from "./routes/promotion.js";
import facultyAnalytics from "./routes/facultyAnalytics.js";
import adminReports from "./routes/adminReports.js";
import studentDashboard from "./routes/studentDashboard.js";
import pdf from "./routes/pdf.js";
import backlogAuto from "./routes/backlogAuto.js";
import { supabase } from "./supabaseClient.js";
import adminApproval from "./routes/adminApproval.js";
import adminManage from "./routes/adminManage.js";
import adminCourses from "./routes/adminCourses.js";


// Automatically handle backlogs every day at midnight
import cron from "node-cron";
cron.schedule("0 0 * * *", async () => {
 console.log("Running backlog auto-update task...");
 await backlogAuto(supabase);
});
/* APP INIT */
const app = express();

/* MIDDLEWARE */
app.use(cors({
 origin: "http://localhost:5173", // frontend
 credentials: true
}));
app.use(express.json());

/* AUTH */
app.use("/api/auth", authRoutes);

/* SEED DATA */
app.use("/api/seed", seedRoutes);

/* STUDENT MODULE */
app.use("/api/students", students);
app.use("/api/marks", marks);
app.use("/api/attendance", attendance);
app.use("/api/fees", fees);
app.use("/api/backlogs", backlogs);
app.use("/api/disciplinary", disciplinary);

/* FACULTY MODULE */
app.use("/api/faculty", faculty);
app.use("/api/faculty/attendance", facultyAttendance);
app.use("/api/faculty/marks", facultyMarks);

/* ADMIN MODULE */
app.use("/api/admin", admin);
app.use("/api/admin-approval", adminApproval);
app.use("/api/admin-manage", adminManage);
app.use("/api/admin-courses", adminCourses);

/* OTHER MODULES */
app.use("/api/timetable", timetable);
app.use("/api/results", results);
app.use("/api/promotion", promotion);
app.use("/api/faculty-analytics", facultyAnalytics);
app.use("/api/admin-reports", adminReports);
app.use("/api/pdf", pdf);

/* STUDENT DASHBOARD */

app.use("/api/student-dashboard", studentDashboard);
/* ROOT */
app.get("/", (req, res) => {
 res.send("College Management Backend Running ✅");
});

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
