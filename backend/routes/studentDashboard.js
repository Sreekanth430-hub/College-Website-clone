import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/marks-summary/:id", async (req, res) => {
 const { id } = req.params;

 const { data } = await supabase
  .from("marks")
  .select("*")
  .eq("student_id", id);

 const totalSubjects = data.length;
 const totalMarks = data.reduce((a, b) => a + b.total, 0);
 const avg = totalSubjects ? (totalMarks / totalSubjects).toFixed(1) : 0;

 res.json({
  totalSubjects,
  totalMarks,
  average: avg,
  marks: data
 });
});

export default router;
