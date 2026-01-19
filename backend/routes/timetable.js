import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* GET ALL TIMETABLES */
router.get("/all", async (req, res) => {
 try {
  const { department, semester } = req.query;
  let query = supabase.from("timetable").select("*");
  
  if (department) {
   query = query.eq("department", department);
  }
  if (semester) {
   query = query.eq("semester", parseInt(semester));
  }
  
  const { data, error } = await query.order(["day", "time"]);
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET SINGLE TIMETABLE */
router.get("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { data, error } = await supabase
   .from("timetable")
   .select("*")
   .eq("id", id)
   .single();
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* Add timetable entry */
router.post("/add", async (req, res) => {
 try {
  const { semester, subject, faculty, day, time, department, room } = req.body;

  const { error } = await supabase.from("timetable").insert({
   semester,
   subject,
   faculty,
   day,
   time,
   department,
   room
  });

  if (error) return res.status(400).json(error);
  
  res.json({ msg: "Timetable Added Successfully ✅" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* UPDATE TIMETABLE */
router.put("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { semester, subject, faculty, day, time, department, room } = req.body;

  const { error } = await supabase
   .from("timetable")
   .update({ semester, subject, faculty, day, time, department, room })
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Timetable Updated Successfully ✏️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* DELETE TIMETABLE */
router.delete("/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { error } = await supabase
   .from("timetable")
   .delete()
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Timetable Entry Deleted 🗑️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* Faculty timetable by email */
router.get("/faculty/:email", async (req, res) => {
 try {
  const { email } = req.params;
  const { data, error } = await supabase
   .from("timetable")
   .select("*")
   .eq("faculty", email)
   .order(["day", "time"]);

  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* Student timetable by semester */
router.get("/student/:semester", async (req, res) => {
 try {
  const { semester } = req.params;
  const { data, error } = await supabase
   .from("timetable")
   .select("*")
   .eq("semester", parseInt(semester))
   .order(["day", "time"]);

  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET TIMETABLE BY DEPARTMENT AND SEMESTER */
router.get("/:department/:semester", async (req, res) => {
 try {
  const { department, semester } = req.params;
  const { data, error } = await supabase
   .from("timetable")
   .select("*")
   .eq("department", department)
   .eq("semester", parseInt(semester))
   .order(["day", "time"]);

  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
