import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* Get students by department */
router.get("/department/:dept", async (req, res) => {
 const { dept } = req.params;

 const { data, error } = await supabase
  .from("students")
  .select("*")
  .eq("department", dept);

 if (error) return res.status(400).json(error);

 res.json(data);
});

export default router;
