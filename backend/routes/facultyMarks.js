import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* FACULTY COURSES */
router.get("/courses/:id", async (req, res) => {
 const { data } = await supabase
  .from("faculty_courses")
  .select(`courses(*)`)
  .eq("faculty_id", req.params.id);

 res.json(data.map(d => d.courses));
});

/* STUDENTS PER COURSE */
router.get("/students/:course_id", async (req, res) => {
 const { data } = await supabase
  .from("student_courses")
  .select(`students(*)`)
  .eq("course_id", req.params.course_id);

 res.json(data.map(d => d.students));
});

/* GET ALL STUDENTS (for faculty to mark marks) */
router.get("/students", async (req, res) => {
 const { data } = await supabase
  .from("students")
  .select("id,name,email,roll")
  .limit(50);
 
 res.json(data || []);
});

/* ADD MARKS */
router.post("/add", async (req, res) => {
 try {
  const { student_id, subject, internal, external, semester, credits } = req.body;
  
  // Calculate total and grade
  const total = parseInt(internal) + parseInt(external);
  let grade = "F";
  if (total >= 90) grade = "S";
  else if (total >= 80) grade = "A";
  else if (total >= 70) grade = "B";
  else if (total >= 60) grade = "C";
  else if (total >= 50) grade = "D";
  else grade = "F";

  const { error } = await supabase.from("marks").insert({
   student_id,
   subject,
   internal: parseInt(internal),
   external: parseInt(external),
   total,
   grade,
   semester: parseInt(semester),
   credits: parseInt(credits)
  });

  if (error) {
   console.log("Marks insert error:", error);
   return res.status(400).json(error);
  }

  res.json({ msg: "Marks Saved Successfully ✅" });
 } catch (err) {
  console.log("Server error:", err);
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
