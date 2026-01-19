import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Marks() {
 const [marks, setMarks] = useState([]);
 const [loading, setLoading] = useState(true);
 const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const fetchMarks = async () => {
   try {
    const res = await axios.get(
     `http://localhost:5050/api/marks/student/${user.id}`
    );
    setMarks(res.data);

    // Auto backlog detection AFTER marks load
    await axios.post(
     `http://localhost:5050/api/backlog-auto/detect/${user.id}`
    );
   } catch (err) {
    console.log("Error fetching marks:", err);
    // Mock data for demo
    setMarks([
     { id: 1, subject: "Data Structures", internal: 25, external: 62, total: 87, grade: "A+", credits: 4, semester: 3 },
     { id: 2, subject: "Algorithms", internal: 22, external: 58, total: 80, grade: "A", credits: 4, semester: 3 },
     { id: 3, subject: "Database Systems", internal: 28, external: 65, total: 93, grade: "A+", credits: 3, semester: 3 },
     { id: 4, subject: "Operating Systems", internal: 20, external: 55, total: 75, grade: "B+", credits: 3, semester: 3 },
     { id: 5, subject: "Computer Networks", internal: 24, external: 60, total: 84, grade: "A", credits: 3, semester: 3 },
     { id: 6, subject: "Web Technologies", internal: 26, external: 68, total: 94, grade: "A+", credits: 3, semester: 3 },
    ]);
   } finally {
    setLoading(false);
   }
  };

  fetchMarks();
 }, [user.id]);

 // Calculate summary
 const totalSubjects = marks.length;
 const totalInternal = marks.reduce((acc, m) => acc + m.internal, 0);
 const totalExternal = marks.reduce((acc, m) => acc + m.external, 0);
 const grandTotal = marks.reduce((acc, m) => acc + m.total, 0);
 const average = totalSubjects ? (grandTotal / totalSubjects).toFixed(1) : 0;

 // Calculate GPA
 const totalCredits = marks.reduce((acc, m) => acc + m.credits, 0);
 const gradePoints = { "A+": 10, "A": 9, "B+": 8, "B": 7, "C+": 6, "C": 5, "F": 0 };
 const totalGradePoints = marks.reduce((acc, m) => acc + (gradePoints[m.grade] || 0) * m.credits, 0);
 const gpa = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : 0;

 const getGradeColor = (grade) => {
  if (grade.startsWith("A")) return "badge-success";
  if (grade.startsWith("B")) return "badge-info";
  if (grade.startsWith("C")) return "badge-warning";
  return "badge-danger";
 };

 if (loading) {
  return (
   <Layout>
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p className="loading-text">Loading marks...</p>
    </div>
   </Layout>
  );
 }

 return (
  <Layout>
   <div className="marks-page">
    <div className="marks-header">
     <h2>Academic Marks</h2>
     <p className="page-subtitle">View your subject-wise performance and grades</p>
    </div>

    {/* Marks Summary */}
    <div className="marks-summary">
     <div className="marks-summary-card">
      <div className="marks-summary-label">Subjects</div>
      <div className="marks-summary-value">{totalSubjects}</div>
     </div>
     <div className="marks-summary-card">
      <div className="marks-summary-label">Internal (Max 180)</div>
      <div className="marks-summary-value">{totalInternal}</div>
     </div>
     <div className="marks-summary-card">
      <div className="marks-summary-label">External (Max 420)</div>
      <div className="marks-summary-value">{totalExternal}</div>
     </div>
     <div className="marks-summary-card">
      <div className="marks-summary-label">Grand Total</div>
      <div className="marks-summary-value">{grandTotal}</div>
     </div>
     <div className="marks-summary-card">
      <div className="marks-summary-label">Average</div>
      <div className="marks-summary-value highlight">{average}%</div>
     </div>
     <div className="marks-summary-card">
      <div className="marks-summary-label">GPA</div>
      <div className="marks-summary-value highlight">{gpa}</div>
     </div>
    </div>

    {/* Marks Table */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>📊</span> Subject-wise Performance</h3>
     </div>
     <div className="table-container">
      <table className="marks-table">
       <thead>
        <tr>
         <th>Subject</th>
         <th>Internal (30)</th>
         <th>External (70)</th>
         <th>Total (100)</th>
         <th>Grade</th>
         <th>Credits</th>
         <th>Semester</th>
        </tr>
       </thead>
       <tbody>
        {marks.map((m, i) => (
         <tr key={i}>
          <td className="font-semibold">{m.subject}</td>
          <td>
           <span className={m.internal >= 25 ? "badge badge-success" : m.internal >= 20 ? "badge badge-warning" : "badge badge-danger"}>
            {m.internal}/30
           </span>
          </td>
          <td>
           <span className={m.external >= 56 ? "badge badge-success" : m.external >= 49 ? "badge badge-warning" : "badge badge-danger"}>
            {m.external}/70
           </span>
          </td>
          <td className="font-semibold">{m.total}</td>
          <td>
           <span className={`badge ${getGradeColor(m.grade)}`}>{m.grade}</span>
          </td>
          <td>{m.credits}</td>
          <td>Sem {m.semester}</td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>

     {marks.length === 0 && (
      <div className="empty-state">
       <div className="empty-state-icon">📝</div>
       <h3>No Marks Available</h3>
       <p>Your marks have not been uploaded yet.</p>
      </div>
     )}
    </div>

    {/* Grade Legend */}
    <div className="info-card">
     <h4>📖 Grade Legend</h4>
     <ul>
      <li><strong>A+ (90-100):</strong> Excellent - 10 GPA</li>
      <li><strong>A (80-89):</strong> Very Good - 9 GPA</li>
      <li><strong>B+ (70-79):</strong> Good - 8 GPA</li>
      <li><strong>B (60-69):</strong> Above Average - 7 GPA</li>
      <li><strong>C+ (50-59):</strong> Average - 6 GPA</li>
      <li><strong>C (40-49):</strong> Pass - 5 GPA</li>
     <li><strong>F (40):</strong> Fail - Backlog</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}

