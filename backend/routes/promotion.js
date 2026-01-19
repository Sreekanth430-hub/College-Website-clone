import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* CALCULATE RESULT STATUS */
router.post("/calculate/:student_id/:semester", async (req, res) => {
 const { student_id, semester } = req.params;

 const { data: marks } = await supabase
  .from("marks")
  .select("*")
  .eq("student_id", student_id)
  .eq("semester", semester);

 const totalSubjects = marks.length;
 const failed = marks.filter((m) => m.grade === "F").length;

 let status =
  failed === 0
   ? "Promoted"
   : failed <= 2
   ? "Promoted with Backlogs"
   : "Not Promoted";

 await supabase.from("semester_results").insert([
  {
   student_id,
   semester,
   total_subjects: totalSubjects,
   failed_subjects: failed,
   status,
  },
 ]);

 res.json({ semester, totalSubjects, failed, status });
});

/* ADMIN APPROVAL */
router.put("/approve/:result_id", async (req, res) => {
 const { error } = await supabase
  .from("semester_results")
  .update({ approved: true })
  .eq("id", req.params.result_id);

 if (error) return res.status(400).json(error);
 res.json({ msg: "Result Approved by Admin" });
});

/* GET ALL RESULTS FOR ADMIN */
router.get("/all", async (req, res) => {
 const { data } = await supabase
  .from("semester_results")
  .select("*, students(name,roll_number)");

 res.json(data);
});

export default router;
