import express from "express";
import PDFDocument from "pdfkit";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/marksheet/:studentId/:semester", async (req, res) => {
 const { studentId, semester } = req.params;

 const { data: marks } = await supabase
  .from("marks")
  .select("*")
  .eq("student_id", studentId)
  .eq("semester", semester);

 const { data: student } = await supabase
  .from("students")
  .select("name,email")
  .eq("id", studentId)
  .single();

 const doc = new PDFDocument({ margin: 40 });

 res.setHeader("Content-Type", "application/pdf");
 res.setHeader(
  "Content-Disposition",
  `attachment; filename=marksheet_sem${semester}.pdf`
 );

 doc.pipe(res);

 doc.fontSize(20).text("COLLEGE MARKSHEET", { align: "center" });
 doc.moveDown();

 doc.fontSize(12).text(`Name: ${student.name}`);
 doc.text(`Email: ${student.email}`);
 doc.text(`Semester: ${semester}`);
 doc.moveDown();

 doc.fontSize(14).text("Subject-wise Marks", { underline: true });
 doc.moveDown(0.5);

 marks.forEach(sub => {
  doc.fontSize(12).text(
   `${sub.subject} | Internal: ${sub.internal} | External: ${sub.external} | Total: ${sub.total} | Grade: ${sub.grade} | Credits: ${sub.credits}`
  );
 });

 doc.end();
});

export default router;
