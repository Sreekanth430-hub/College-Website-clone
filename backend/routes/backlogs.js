import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/:student_id", async (req, res) => {
 const { data } = await supabase
  .from("backlogs")
  .select("*")
  .eq("student_id", req.params.student_id);

 res.json(data);
});

export default router;
