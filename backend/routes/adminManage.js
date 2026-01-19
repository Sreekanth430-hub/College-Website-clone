import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* GET ALL STUDENTS */
router.get("/students", async (req, res) => {
 try {
  const { data, error } = await supabase
   .from("students")
   .select("*")
   .order("name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET SINGLE STUDENT */
router.get("/students/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { data, error } = await supabase
   .from("students")
   .select("*")
   .eq("id", id)
   .single();
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* ADD STUDENT */
router.post("/students/add", async (req, res) => {
 try {
  const {
   roll,
   name,
   email,
   password,
   mobile,
   department,
   dob,
   gender,
   address,
   admission_year,
   father_name,
   father_mobile,
   mother_name,
   mother_mobile
  } = req.body;

  const { error } = await supabase.from("students").insert([
   {
    roll,
    name,
    email,
    password,
    mobile,
    department,
    dob,
    gender,
    address,
    admission_year,
    father_name,
    father_mobile,
    mother_name,
    mother_mobile
   }
  ]);

  if (error) {
   console.log("Insert Error:", error);
   return res.status(400).json(error);
  }

  res.json({ msg: "Student Added Successfully ✅" });

 } catch (err) {
  console.log("Server Error:", err);
  res.status(500).json({ msg: "Server Error" });
 }
});

/* UPDATE STUDENT */
router.put("/students/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const {
   roll,
   name,
   email,
   password,
   mobile,
   department,
   dob,
   gender,
   address,
   admission_year,
   father_name,
   father_mobile,
   mother_name,
   mother_mobile
  } = req.body;

  const { error } = await supabase
   .from("students")
   .update({
    roll,
    name,
    email,
    password,
    mobile,
    department,
    dob,
    gender,
    address,
    admission_year,
    father_name,
    father_mobile,
    mother_name,
    mother_mobile
   })
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Student Updated Successfully ✏️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* DELETE STUDENT */
router.delete("/students/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { error } = await supabase
   .from("students")
   .delete()
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Student Deleted Successfully 🗑️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET ALL FACULTY */
router.get("/faculty", async (req, res) => {
 try {
  const { data, error } = await supabase
   .from("faculty")
   .select("*")
   .order("name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET SINGLE FACULTY */
router.get("/faculty/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { data, error } = await supabase
   .from("faculty")
   .select("*")
   .eq("id", id)
   .single();
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* ADD FACULTY */
router.post("/faculty/add", async (req, res) => {
 try {
  const {
   name,
   email,
   password,
   mobile,
   department,
   dob,
   gender,
   address,
   qualification,
   experience
  } = req.body;

  const { error } = await supabase.from("faculty").insert([
   {
    name,
    email,
    password,
    mobile,
    department,
    dob,
    gender,
    address,
    qualification,
    experience
   }
  ]);

  if (error) return res.status(400).json(error);

  res.json({ msg: "Faculty Added Successfully 👨‍🏫" });

 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* UPDATE FACULTY */
router.put("/faculty/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const {
   name,
   email,
   password,
   mobile,
   department,
   dob,
   gender,
   address,
   qualification,
   experience
  } = req.body;

  const { error } = await supabase
   .from("faculty")
   .update({
    name,
    email,
    password,
    mobile,
    department,
    dob,
    gender,
    address,
    qualification,
    experience
   })
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Faculty Updated Successfully ✏️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* DELETE FACULTY */
router.delete("/faculty/:id", async (req, res) => {
 try {
  const { id } = req.params;
  const { error } = await supabase
   .from("faculty")
   .delete()
   .eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ msg: "Faculty Deleted Successfully 🗑️" });
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET STUDENTS BY DEPARTMENT */
router.get("/students/department/:dept", async (req, res) => {
 try {
  const { dept } = req.params;
  const { data, error } = await supabase
   .from("students")
   .select("*")
   .eq("department", dept)
   .order("name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

/* GET FACULTY BY DEPARTMENT */
router.get("/faculty/department/:dept", async (req, res) => {
 try {
  const { dept } = req.params;
  const { data, error } = await supabase
   .from("faculty")
   .select("*")
   .eq("department", dept)
   .order("name", { ascending: true });
  
  if (error) return res.status(400).json(error);
  res.json(data);
 } catch (err) {
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;
