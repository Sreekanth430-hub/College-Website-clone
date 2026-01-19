import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* Get pending results */
router.get("/pending", async (req, res) => {
 const { data } = await supabase
  .from("marks")
  .select("id, student_id, subject, semester, total, grade, status")
  .eq("status", "Pending");

 res.json(data);
});

/* Approve result */
router.post("/approve/:id", async (req, res) => {
 const { id } = req.params;

 await supabase
  .from("marks")
  .update({ status: "Approved" })
  .eq("id", id);

 res.json({ msg: "Result Approved ✅" });
});

export default router;
