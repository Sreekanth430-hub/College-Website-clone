import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/courses/:id", async (req, res) => {
 try {
  const { id } = req.params;

  const { data, error } = await supabase
   .from("faculty_courses")
   .select(`
    courses (
     id,
     course_name,
     course_code,
     semester,
     credits
    )
   `)
   .eq("faculty_id", id);

  if (error) {
   console.log(error);
   return res.status(400).json(error);
  }

  // flatten relation
  const courses = data.map(d => d.courses);

  console.log("COURSES SENT TO FRONTEND:", courses);

  res.json(courses);

 } catch (err) {
  console.log(err);
  res.status(500).json({ msg: "Server Error" });
 }
});

router.get("/students/:course_id", async (req, res) => {
 const { data } = await supabase
  .from("student_courses")
  .select(`students(id,name,roll,email)`)
  .eq("course_id", req.params.course_id);

 res.json(data.map(d => d.students));
});

/* Faculty Dashboard Activity */
router.get("/dashboard/:email", async (req, res) => {
 try {
  const { email } = req.params;

  // Get faculty's assigned courses
  const { data: facultyCourses } = await supabase
   .from("faculty_courses")
   .select(`
    courses (
     id,
     course_name,
     course_code,
     semester,
     credits
    )
   `)
   .eq("faculty_id", email);

  const assignedCourses = facultyCourses?.map(fc => fc.courses) || [];

  // Get timetable entries for this faculty
  const { data: timetable } = await supabase
   .from("timetable")
   .select("*")
   .eq("faculty", email)
   .order(["day", "time"]);

  // Get recent attendance records
  const { data: attendance } = await supabase
   .from("attendance")
   .select("*")
   .eq("faculty_email", email)
   .order("created_at", { ascending: false })
   .limit(10);

  // Get recent marks entries
  const { data: marks } = await supabase
   .from("marks")
   .select("*")
   .eq("faculty_email", email)
   .order("created_at", { ascending: false })
   .limit(10);

  // Get unique subjects from courses for pending marks
  const courseSubjects = assignedCourses.map(c => c.course_name);

  // Calculate pending tasks
  const pendingTasks = [];

  // Check for marks not entered (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  if (marks && marks.length > 0) {
   const lastMarkDate = new Date(marks[0].created_at);
   if (lastMarkDate < sevenDaysAgo) {
    pendingTasks.push({
     type: "marks",
     title: "Submit Internal Marks",
     subtitle: "Marks not updated for 7 days",
     priority: "warning"
    });
   }
  } else if (assignedCourses.length > 0) {
   pendingTasks.push({
    type: "marks",
    title: "Submit Internal Marks",
    subtitle: "No marks entered yet",
    priority: "warning"
   });
  }

  // Check for attendance not updated
  if (attendance && attendance.length > 0) {
   const lastAttendanceDate = new Date(attendance[0].created_at);
   if (lastAttendanceDate < sevenDaysAgo) {
    pendingTasks.push({
     type: "attendance",
     title: "Attendance Update",
     subtitle: "Attendance not updated for 7 days",
     priority: "soon"
    });
   }
  } else if (assignedCourses.length > 0) {
   pendingTasks.push({
    type: "attendance",
    title: "Attendance Update",
    subtitle: "No attendance records yet",
    priority: "soon"
   });
  }

  // Check for assignments pending review
  pendingTasks.push({
   type: "assignment",
   title: "Assignment Review",
   subtitle: "Assignments pending review",
   priority: "new"
  });

  res.json({
   upcomingClasses: timetable || [],
   recentAttendance: attendance || [],
   recentMarks: marks || [],
   pendingTasks: pendingTasks.slice(0, 5),
   assignedCourses
  });

 } catch (err) {
  console.log(err);
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
