import express from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/login", async (req, res) => {
 try {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
   return res.status(400).json({ msg: "Missing login fields" });
  }

  const table =
   role === "student" ? "students" :
   role === "faculty" ? "faculty" :
   "admins";
   console.log("LOGIN DATA:", role, email, password);
console.log("TABLE USED:", table);

  const { data, error } = await supabase
   .from(table)
   .select("*")
   .eq("email", email)
   .eq("password", password)
   .single();

  if (error || !data) {
   return res.status(401).json({ msg: "Invalid Login" });
  }

  const token = jwt.sign(
   { id: data.id, role },
   "college_secret",
   { expiresIn: "1d" }
  );

  res.json({ token, user: data });

 } catch (err) {
  console.log(err);
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
