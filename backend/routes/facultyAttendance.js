import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* Get students for subject */
router.get("/students/:subject", async (req, res) => {
 const { subject } = req.params;

 const { data } = await supabase
  .from("students")
  .select("id,name,email");

 res.json(data);
});

/* Mark single attendance */
router.post("/mark", async (req, res) => {
 const { student_id, subject, status } = req.body;

 const { data: existing } = await supabase
  .from("attendance")
  .select("*")
  .eq("student_id", student_id)
  .eq("subject", subject)
  .single();

 if (!existing) {
  await supabase.from("attendance").insert({
   student_id,
   subject,
   total: 1,
   present: status === "Present" ? 1 : 0
  });
 } else {
  await supabase
   .from("attendance")
   .update({
    total: existing.total + 1,
    present:
     existing.present + (status === "Present" ? 1 : 0)
   })
   .eq("id", existing.id);
 }

 res.json({ msg: "Attendance Updated ✅" });
});

/* Mark bulk attendance - selected students are Present, unselected are Absent */
router.post("/mark-bulk", async (req, res) => {
 try {
  const { students, subject, faculty_email, date } = req.body;

  if (!students || students.length === 0) {
   return res.status(400).json({ msg: "No students data provided" });
  }

  const today = date || new Date().toISOString().split('T')[0];

  // Get all enrolled students for this subject
  const { data: enrolledStudents } = await supabase
   .from("student_courses")
   .select("students(id)")
   .eq("course_id", subject);

  if (!enrolledStudents || enrolledStudents.length === 0) {
   return res.status(400).json({ msg: "No students enrolled in this course" });
  }

  const studentIds = enrolledStudents.map(es => es.students.id);
  const presentStudentIds = students.map(s => s.id);

  // Process each student
  for (const studentId of studentIds) {
   const isPresent = presentStudentIds.includes(studentId);

   // Check if attendance already exists for this date
   const { data: existing } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", studentId)
    .eq("subject", subject)
    .eq("date", today)
    .single();

   if (existing) {
    // Update existing record
    await supabase
     .from("attendance")
     .update({
      present: isPresent ? existing.present + 1 : existing.present,
      total: existing.total + 1,
      faculty_email: faculty_email
     })
     .eq("id", existing.id);
   } else {
    // Create new record
    await supabase.from("attendance").insert({
     student_id: studentId,
     subject: typeof subject === 'object' ? subject.course_name : subject,
     present: isPresent ? 1 : 0,
     total: 1,
     date: today,
     faculty_email: faculty_email
    });
   }
  }

  const presentCount = presentStudentIds.length;
  const absentCount = studentIds.length - presentCount;

  res.json({ 
   msg: "Bulk Attendance Saved ✅",
   summary: {
    total: studentIds.length,
    present: presentCount,
    absent: absentCount
   }
  });

 } catch (err) {
  console.log("Bulk Attendance Error:", err);
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
