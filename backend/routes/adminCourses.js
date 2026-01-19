import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* GET ALL COURSES */
router.get("/", async (req, res) => {
 try {
  const { data, error } = await supabase
   .from("courses")
   .select("*")
   .order("course_name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET SINGLE COURSE */
router.get("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { data, error } = await supabase
   .from("courses")
   .select("*")
   .eq("id", id)
   .single();
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* ADD COURSE + AUTO ENROLL STUDENTS */
router.post("/add", async (req, res) => {
 try {
  const { course_name, course_code, department, semester, credits } = req.body;

  const { data: course, error } = await supabase
   .from("courses")
   .insert([{ course_name, course_code, department, semester, credits }])
   .select()
   .single();

  if (error) return res.status(400).json(error);

  const { data: students } = await supabase
   .from("students")
   .select("id")
   .eq("department", department)
   .eq("semester", semester);

  if (students.length > 0) {
   const mappings = students.map(s => ({
    student_id: s.id,
    course_id: course.id
   }));

   await supabase.from("student_courses").insert(mappings);
  }

  res.json({ msg: "Course Added & Students Auto Enrolled 🎓" });
 } catch {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* UPDATE COURSE */
router.put("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { course_name, course_code, department, semester, credits } = req.body;

  const { error } = await supabase
   .from("courses")
   .update({ course_name, course_code, department, semester, credits })
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Course Updated Successfully ✏️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* DELETE COURSE */
router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { error } = await supabase
   .from("courses")
   .delete()
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Course Deleted Successfully 🗑️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET COURSES BY DEPARTMENT */
router.get("/department/:dept", async (req, res) => {
 try {
  const { dept } = req.params;
  const { data, error } = await supabase
   .from("courses")
   .select("*")
   .eq("department", dept)
   .order("course_name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET ALL FACULTY */
router.get("/faculty/all", async (req, res) => {
 try {
  const { data, error } = await supabase
   .from("faculty")
   .select("id, name, department")
   .order("name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* ASSIGN COURSE TO FACULTY */
router.post("/assign", async (req, res) => {
 try {
  const { faculty_id, course_id } = req.body;

  const { error } = await supabase
   .from("faculty_courses")
   .insert([{ faculty_id, course_id }]);

  if (error) return res.status(400).json(error);

  res.json({ msg: "Assigned Successfully 👨‍🏫" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET FACULTY COURSES */
router.get("/faculty/courses/:facultyId", async (req, res) => {
 try {
  const { facultyId } = req.params;
  const { data, error } = await supabase
   .from("faculty_courses")
   .select(`
    *,
    courses:courses(*)
   `)
   .eq("faculty_id", facultyId);
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* REMOVE FACULTY COURSE ASSIGNMENT */
router.delete("/faculty/assign/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { error } = await supabase
   .from("faculty_courses")
   .delete()
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Assignment Removed Successfully 🗑️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
