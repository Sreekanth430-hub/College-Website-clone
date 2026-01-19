import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/student/:id", async (req, res) => {
 const { id } = req.params;

 const { data, error } = await supabase
  .from("marks")
  .select("*")
  .eq("student_id", id);
  

 res.json(data);
});

export default router;
