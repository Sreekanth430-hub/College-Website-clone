import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Attendance() {
 const [attendance, setAttendance] = useState([]);
 const [loading, setLoading] = useState(true);
 const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const fetchAttendance = async () => {
   try {
    const res = await axios.get(`http://localhost:5050/api/attendance/student/${user.id}`);
    setAttendance(res.data);
   } catch (err) {
    console.log("Error fetching attendance:", err);
    // Mock data for demo
    setAttendance([
     { id: 1, subject: "Data Structures", total: 40, present: 38 },
     { id: 2, subject: "Algorithms", total: 40, present: 35 },
     { id: 3, subject: "Database Systems", total: 40, present: 39 },
     { id: 4, subject: "Operating Systems", total: 40, present: 32 },
     { id: 5, subject: "Computer Networks", total: 40, present: 36 },
     { id: 6, subject: "Web Technologies", total: 40, present: 40 },
    ]);
   } finally {
    setLoading(false);
   }
  };

  fetchAttendance();
 }, [user.id]);

 const totalClasses = attendance.reduce((a, b) => a + b.total, 0);
 const totalPresent = attendance.reduce((a, b) => a + b.present, 0);
 const overallPercent = totalClasses ? ((totalPresent / totalClasses) * 100).toFixed(1) : 0;

 const getAttendanceStatus = (percent) => {
  if (percent >= 90) return { class: "success", label: "Excellent" };
  if (percent >= 75) return { class: "warning", label: "Good" };
  return { class: "danger", label: "Low" };
 };

 if (loading) {
  return (
   <Layout>
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p className="loading-text">Loading attendance...</p>
    </div>
   </Layout>
  );
 }

 return (
  <Layout>
   <div className="marks-page">
    <div className="marks-header">
     <h2>Attendance Record</h2>
     <p className="page-subtitle">Track your class attendance percentage</p>
    </div>

    {/* Attendance Summary */}
    <div className="attendance-summary">
     <div className="attendance-card">
      <div className="attendance-card-label">Total Classes</div>
      <div className="attendance-card-value">{totalClasses}</div>
     </div>
     <div className="attendance-card">
      <div className="attendance-card-label">Classes Attended</div>
      <div className="attendance-card-value success">{totalPresent}</div>
     </div>
     <div className="attendance-card">
      <div className="attendance-card-label">Classes Missed</div>
      <div className="attendance-card-value danger">{totalClasses - totalPresent}</div>
     </div>
     <div className="attendance-card">
      <div className="attendance-card-label">Overall Attendance</div>
      <div className={`attendance-card-value ${getAttendanceStatus(overallPercent).class}`}>
       {overallPercent}%
      </div>
      <div className="attendance-progress">
       <div 
        className={`attendance-progress-bar ${getAttendanceStatus(overallPercent).class}`}
        style={{ width: `${overallPercent}%` }}
       ></div>
      </div>
     </div>
    </div>

    {/* Attendance Status Message */}
    <div className={`alert ${overallPercent >= 75 ? "alert-success" : "alert-warning"}`}>
     {overallPercent >= 75 ? (
      <>✅ Your attendance is satisfactory. Keep it up!</>
     ) : (
      <>⚠️ Your attendance is below 75%. Attend more classes to maintain eligibility.</>
     )}
    </div>

    {/* Attendance Table */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>📋</span> Subject-wise Attendance</h3>
     </div>
     <div className="table-container">
      <table className="marks-table">
       <thead>
        <tr>
         <th>Subject</th>
         <th>Total Classes</th>
         <th>Classes Attended</th>
         <th>Classes Missed</th>
         <th>Percentage</th>
         <th>Status</th>
        </tr>
       </thead>
       <tbody>
        {attendance.map((a, i) => {
         const percent = ((a.present / a.total) * 100).toFixed(1);
         const status = getAttendanceStatus(percent);
         return (
          <tr key={i}>
           <td className="font-semibold">{a.subject}</td>
           <td>{a.total}</td>
           <td>
            <span className="badge badge-success">{a.present}</span>
           </td>
           <td>
            <span className="badge badge-danger">{a.total - a.present}</span>
           </td>
           <td className="font-semibold">{percent}%</td>
           <td>
            <span className={`badge badge-${status.class}`}>{status.label}</span>
           </td>
          </tr>
         );
        })}
       </tbody>
      </table>
     </div>

     {attendance.length === 0 && (
      <div className="empty-state">
       <div className="empty-state-icon">📋</div>
       <h3>No Attendance Records</h3>
       <p>Your attendance has not been recorded yet.</p>
      </div>
     )}
    </div>

    {/* Attendance Guidelines */}
    <div className="info-card">
     <h4>📝 Attendance Guidelines</h4>
     <ul>
      <li>Students must maintain a minimum of 75% attendance to be eligible for exams</li>
      <li>Attendance is calculated on a per-subject basis</li>
      <li>Late arrivals may be counted as absent</li>
      <li>Medical leave with proper documentation may be considered</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}

