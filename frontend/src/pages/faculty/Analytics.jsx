import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Analytics() {
 const [stats, setStats] = useState({});
 const [loading, setLoading] = useState(true);
 const faculty = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const fetchAnalytics = async () => {
   try {
    const res = await axios.get(`http://localhost:5050/api/faculty-analytics/${faculty.email}`);
    setStats(res.data);
   } catch (err) {
    console.log("Error fetching analytics:", err);
    // Mock data for demo
    setStats({
     totalSubjects: 5,
     totalStudents: 180,
     totalAttendanceSessions: 42,
     totalMarksEntered: 850,
     averageAttendance: 87.5,
     subjectsBySemester: [
      { semester: 3, subjects: 2, students: 65 },
      { semester: 4, subjects: 3, students: 115 }
     ],
     recentActivity: [
      { type: "attendance", desc: "Updated attendance for DBMS", date: "Today" },
      { type: "marks", desc: "Entered internal marks for CN", date: "Yesterday" },
      { type: "assignment", desc: "Uploaded assignment for OS", date: "2 days ago" }
     ]
    });
   } finally {
    setLoading(false);
   }
  };

  fetchAnalytics();
 }, [faculty.email]);

 if (loading) {
  return (
   <Layout>
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p className="loading-text">Loading analytics...</p>
    </div>
   </Layout>
  );
 }

 return (
  <Layout>
   <div className="analytics-page">
    <div className="analytics-header">
     <h2>Faculty Workload Analytics</h2>
     <p>Overview of your teaching activities and performance metrics</p>
    </div>

    {/* Main Stats Grid */}
    <div className="analytics-grid">
     <div className="analytics-card">
      <div className="analytics-card-icon">📚</div>
      <div className="analytics-card-title">Subjects Handled</div>
      <div className="analytics-card-value">{stats.totalSubjects}</div>
     </div>
     <div className="analytics-card">
      <div className="analytics-card-icon">👥</div>
      <div className="analytics-card-title">Total Students</div>
      <div className="analytics-card-value">{stats.totalStudents}</div>
     </div>
     <div className="analytics-card">
      <div className="analytics-card-icon">📋</div>
      <div className="analytics-card-title">Attendance Sessions</div>
      <div className="analytics-card-value">{stats.totalAttendanceSessions}</div>
     </div>
     <div className="analytics-card">
      <div className="analytics-card-icon">📝</div>
      <div className="analytics-card-title">Marks Entered</div>
      <div className="analytics-card-value">{stats.totalMarksEntered}</div>
     </div>
     <div className="analytics-card">
      <div className="analytics-card-icon">📊</div>
      <div className="analytics-card-title">Avg Attendance</div>
      <div className="analytics-card-value">{stats.averageAttendance}%</div>
     </div>
    </div>

    {/* Semester-wise breakdown */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>📅</span> Subjects by Semester</h3>
     </div>
     <div className="table-container">
      <table className="marks-table">
       <thead>
        <tr>
         <th>Semester</th>
         <th>Subjects</th>
         <th>Students</th>
         <th>Workload</th>
        </tr>
       </thead>
       <tbody>
        {stats.subjectsBySemester?.map((sem, i) => (
         <tr key={i}>
          <td className="font-semibold">Semester {sem.semester}</td>
          <td>
           <span className="badge badge-info">{sem.subjects} subjects</span>
          </td>
          <td>{sem.students} students</td>
          <td>
           <span className="badge badge-warning">
            {sem.subjects * sem.students} student-subjects
           </span>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    </div>

    {/* Recent Activity */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>🕐</span> Recent Activity</h3>
     </div>
     <div className="info-list">
      {stats.recentActivity?.map((activity, i) => (
       <div key={i} className="info-item">
        <span className="info-item-icon">
         {activity.type === "attendance" ? "📋" : activity.type === "marks" ? "📝" : "📄"}
        </span>
        <div className="info-item-content">
         <div className="info-item-title">{activity.desc}</div>
         <div className="info-item-subtitle">{activity.date}</div>
        </div>
       </div>
      ))}
     </div>
    </div>

    {/* Performance Tips */}
    <div className="info-card">
     <h4>💡 Performance Insights</h4>
     <ul>
      <li>You have entered marks for {stats.totalMarksEntered} student records this semester</li>
      <li>Your average class attendance is at {stats.averageAttendance}%</li>
      <li>Consider updating attendance regularly to keep students informed</li>
      <li>Internal marks deadline is approaching - ensure all entries are complete</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}

