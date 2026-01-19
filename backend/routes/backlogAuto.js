import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/detect/:studentId", async (req, res) => {
 const { studentId } = req.params;

 const { data: failed } = await supabase
  .from("marks")
  .select("subject, semester")
  .eq("student_id", studentId)
  .eq("grade", "F");

 if (!failed.length) return res.json({ msg: "No backlogs 🎉" });

 for (const sub of failed) {
  const { data: exists } = await supabase
   .from("backlogs")
   .select("*")
   .eq("student_id", studentId)
   .eq("subject", sub.subject);

  if (!exists.length) {
   await supabase.from("backlogs").insert({
    student_id: studentId,
    subject: sub.subject,
    semester: sub.semester,
   });
  }
 }

 res.json({ msg: "Backlogs updated", failed });
});

export default router;
