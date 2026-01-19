import express from "express";
import { supabase } from "../supabaseClient.js";
import { gradePoints } from "../utils/gradePoints.js";

const router = express.Router();

router.get("/sgpa/:studentId/:semester", async (req, res) => {
 const { studentId, semester } = req.params;

 const { data } = await supabase
  .from("marks")
  .select("*")
  .eq("student_id", studentId)
  .eq("semester", semester);

 let totalCredits = 0;
 let totalPoints = 0;

 data.forEach(sub => {
  const gp = gradePoints[sub.grade] || 0;
  totalCredits += sub.credits;
  totalPoints += gp * sub.credits;
 });

 const sgpa = totalCredits
  ? (totalPoints / totalCredits).toFixed(2)
  : 0;

 res.json({ sgpa, subjects: data });
});

export default router;
