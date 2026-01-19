import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/:facultyEmail", async (req, res) => {
 const { facultyEmail } = req.params;

 // subjects handled (from marks table)
 const { data: subjects } = await supabase
  .from("marks")
  .select("subject")
  .eq("faculty_email", facultyEmail);

 // attendance sessions
 const { data: attendance } = await supabase
  .from("attendance")
  .select("subject")
  .eq("faculty_email", facultyEmail);

 // total marks entries
 const { data: marks } = await supabase
  .from("marks")
  .select("*")
  .eq("faculty_email", facultyEmail);

 const uniqueSubjects = [...new Set(subjects.map(s => s.subject))];

 res.json({
  totalSubjects: uniqueSubjects.length,
  totalAttendanceSessions: attendance.length,
  totalMarksEntered: marks.length
 });
});

export default router;
