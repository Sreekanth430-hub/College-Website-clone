import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* ADD STUDENT */
router.post("/students", async (req, res) => {
 const { name, email, password, department, semester } = req.body;

 const { error } = await supabase.from("students").insert([
  { name, email, password, department, semester },
 ]);

 if (error) return res.status(400).json(error);
 res.json({ msg: "Student Added" });
});

/* ADD FACULTY */
router.post("/faculty", async (req, res) => {
 const { name, email, password, department } = req.body;

 const { error } = await supabase.from("faculty").insert([
  { name, email, password, department },
 ]);

 if (error) return res.status(400).json(error);
 res.json({ msg: "Faculty Added" });
});

/* ADD COURSE */
router.post("/courses", async (req, res) => {
 const { code, name, department, semester } = req.body;

 const { error } = await supabase.from("courses").insert([
  { code, name, department, semester },
 ]);

 if (error) return res.status(400).json(error);
 res.json({ msg: "Course Added" });
});

/* ASSIGN COURSE TO FACULTY */
router.post("/assign", async (req, res) => {
 const { faculty_id, course_id } = req.body;

 const { error } = await supabase.from("faculty_courses").insert([
  { faculty_id, course_id },
 ]);

 if (error) return res.status(400).json(error);
 res.json({ msg: "Course Assigned" });
});

/* CREATE TIMETABLE */
router.post("/timetable", async (req, res) => {
 const { department, semester, day, time, course, faculty, room } = req.body;

 const { error } = await supabase.from("timetable").insert([
  { department, semester, day, time, course, faculty, room },
 ]);

 if (error) return res.status(400).json(error);
 res.json({ msg: "Timetable Created" });
});

export default router;
