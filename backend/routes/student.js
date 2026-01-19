import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
 const { data } = await supabase
  .from("students")
  .select("*")
  .eq("id", req.params.id)
  .single();

 res.json(data);
});

export default router;
