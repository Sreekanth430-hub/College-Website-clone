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

/* Mark attendance */
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

export default router;
