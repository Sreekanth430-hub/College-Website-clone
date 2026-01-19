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

export default router;
