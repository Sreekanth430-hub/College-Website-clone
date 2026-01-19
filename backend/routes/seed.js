import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Seed test data - run this once to populate the database
router.post("/seed", async (req, res) => {
 try {
  // Create test admin
  const { error: adminError } = await supabase.from("admins").insert([
   {
    name: "System Admin",
    email: "admin@college.edu",
    password: "admin123",
    mobile: "9999999999",
    department: "Administration"
   }
  ]);

  // Create test students
  const { error: studentError } = await supabase.from("students").insert([
   {
    roll: "CSE001",
    name: "John Smith",
    email: "john@cse.edu",
    password: "student123",
    mobile: "9876543210",
    department: "CSE",
    semester: 6,
    dob: "2002-05-15",
    gender: "Male",
    admission_year: 2022,
    father_name: "Robert Smith",
    father_mobile: "9876543211",
    mother_name: "Mary Smith",
    mother_mobile: "9876543212",
    address: "123 Main St, City"
   },
   {
    roll: "CSE002",
    name: "Jane Doe",
    email: "jane@cse.edu",
    password: "student123",
    mobile: "9876543213",
    department: "CSE",
    semester: 6,
    dob: "2002-08-20",
    gender: "Female",
    admission_year: 2022,
    father_name: "Michael Doe",
    father_mobile: "9876543214",
    mother_name: "Sarah Doe",
    mother_mobile: "9876543215",
    address: "456 Oak Ave, City"
   }
  ]);

  // Create test faculty
  const { error: facultyError } = await supabase.from("faculty").insert([
   {
    name: "Dr. Robert Johnson",
    email: "robert@college.edu",
    password: "faculty123",
    mobile: "9888888888",
    department: "CSE",
    dob: "1975-03-10",
    gender: "Male",
    qualification: "Ph.D. in Computer Science",
    experience: 15,
    address: "789 Faculty Block"
   },
   {
    name: "Prof. Emily Williams",
    email: "emily@college.edu",
    password: "faculty123",
    mobile: "9888888889",
    department: "CSE",
    dob: "1980-07-22",
    gender: "Female",
    qualification: "M.Tech",
    experience: 10,
    address: "101 Faculty Block"
   }
  ]);

  if (adminError && !adminError.message.includes('duplicate')) {
   console.log("Admin insert:", adminError);
  }
  if (studentError && !studentError.message.includes('duplicate')) {
   console.log("Student insert:", studentError);
  }
  if (facultyError && !facultyError.message.includes('duplicate')) {
   console.log("Faculty insert:", facultyError);
  }

  res.json({ 
   msg: "Test data seeded successfully!",
   test_credentials: {
    admin: { email: "admin@college.edu", password: "admin123" },
    student: { email: "john@cse.edu", password: "student123" },
    faculty: { email: "robert@college.edu", password: "faculty123" }
   }
  });

 } catch (err) {
  console.log("Seed Error:", err);
  res.status(500).json({ msg: "Server Error" });
 }
});

export default router;

