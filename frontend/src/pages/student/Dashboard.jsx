import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
 const [data, setData] = useState(null);
 const [marksSummary, setMarksSummary] = useState({
  totalSubjects: 0,
  totalMarks: 0,
  average: 0
 });
 const [loading, setLoading] = useState(true);

 const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const fetchData = async () => {
   try {
    // Try to fetch from API
    const [overviewRes, marksRes] = await Promise.all([
     axios.get(`http://localhost:5050/api/students/overview/${user.id}`),
     axios.get(`http://localhost:5050/api/student-dashboard/marks-summary/${user.id}`)
    ]);
    setData(overviewRes.data);
    setMarksSummary(marksRes.data);
   } catch (err) {
    console.log("API fetch error, using mock data:", err);
    // Mock data for demo
    setData({
     student: user,
     attendance: 85,
     cgpa: 8.2,
     fees: 5000,
     backlogs: 0,
     disciplinary: "Clean"
    });
    setMarksSummary({
     totalSubjects: 6,
     totalMarks: 482,
     average: 80.3
    });
   }
   setLoading(false);
  };
  fetchData();
 }, [user.id]);

 if (loading) {
  return (
   <Layout>
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p className="loading-text">Loading dashboard...</p>
    </div>
   </Layout>
  );
 }

 return (
  <Layout>
   {/* Welcome Header */}
   <div className="dashboard-welcome">
    <h2>Welcome, {user?.name} 👋</h2>
    <p>{user?.department} Department - Semester {user?.semester}</p>
   </div>

   {/* Quick Actions */}
   <div className="quick-actions">
    <Link to="/student/marks" className="quick-action-btn primary">
     📊 View Marks
    </Link>
    <Link to="/student/attendance" className="quick-action-btn success">
     📋 Attendance
    </Link>
    <Link to="/student/timetable" className="quick-action-btn purple">
     📅 Timetable
    </Link>
    <Link to="/student/profile" className="quick-action-btn orange">
     👤 Profile
    </Link>
   </div>

   {/* Stats Cards */}
   <div className="stats-row">
    <div className="stat-card">
     <div className="stat-label">Attendance</div>
     <div className="stat-value blue">{data?.attendance}%</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">CGPA</div>
     <div className="stat-value green">{data?.cgpa}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Pending Fees</div>
     <div className="stat-value orange">₹{data?.fees?.toLocaleString()}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Backlogs</div>
     <div className="stat-value red">{data?.backlogs}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Status</div>
     <div className="stat-value purple">✅ Active</div>
    </div>
   </div>

   {/* Marks Summary */}
   <div className="stats-row">
    <div className="stat-card">
     <div className="stat-label">Subjects</div>
     <div className="stat-value">{marksSummary.totalSubjects}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Total Marks</div>
     <div className="stat-value green">{marksSummary.totalMarks}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Average</div>
     <div className="stat-value purple">{marksSummary.average}%</div>
    </div>
   </div>

   {/* Academic Info & Upcoming Events */}
   <div className="dashboard-section">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
     {/* Academic Info Card */}
     <div className="dashboard-card">
      <div className="dashboard-card-header">
       <h3><span>📚</span> Current Semester</h3>
      </div>
      <div className="info-list">
       <div className="info-item">
        <span className="info-item-icon">🆔</span>
        <div className="info-item-content">
         <div className="info-item-title">Roll Number</div>
         <div className="info-item-subtitle">{user?.roll || "N/A"}</div>
        </div>
       </div>
       <div className="info-item">
        <span className="info-item-icon">🏛️</span>
        <div className="info-item-content">
         <div className="info-item-title">Department</div>
         <div className="info-item-subtitle">{user?.department || "N/A"}</div>
        </div>
       </div>
       <div className="info-item">
        <span className="info-item-icon">📅</span>
        <div className="info-item-content">
         <div className="info-item-title">Semester</div>
         <div className="info-item-subtitle">{user?.semester || "N/A"}</div>
        </div>
       </div>
       <div className="info-item">
        <span className="info-item-icon">🎓</span>
        <div className="info-item-content">
         <div className="info-item-title">Admission Year</div>
         <div className="info-item-subtitle">{user?.admission_year || "N/A"}</div>
        </div>
       </div>
      </div>
     </div>

     {/* Upcoming Events Card */}
     <div className="dashboard-card">
      <div className="dashboard-card-header">
       <h3><span>📅</span> Upcoming Events</h3>
      </div>
      <div className="info-list">
       <div className="info-item">
        <span className="info-item-icon">📝</span>
        <div className="info-item-content">
         <div className="info-item-title">Internal Exam</div>
         <div className="info-item-subtitle">DBMS - Next Monday</div>
        </div>
        <span className="badge badge-danger">Urgent</span>
       </div>
       <div className="info-item">
        <span className="info-item-icon">📚</span>
        <div className="info-item-content">
         <div className="info-item-title">Assignment Due</div>
         <div className="info-item-subtitle">CN - 3 days remaining</div>
        </div>
        <span className="badge badge-warning">Soon</span>
       </div>
       <div className="info-item">
        <span className="info-item-icon">🎉</span>
        <div className="info-item-content">
         <div className="info-item-title">Tech Fest</div>
         <div className="info-item-subtitle">Registration open</div>
        </div>
        <span className="badge badge-success">New</span>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Quick Links */}
   <div className="dashboard-section">
    <h3 className="dashboard-section-title">Quick Links</h3>
    <div className="quick-links-grid">
     <Link to="/student/fees" className="quick-link-card">
      <span className="quick-link-icon">💰</span>
      <span className="quick-link-text">Pay Fees</span>
     </Link>
     <Link to="/student/backlogs" className="quick-link-card">
      <span className="quick-link-icon">📋</span>
      <span className="quick-link-text">Backlogs</span>
     </Link>
     <Link to="/student/results" className="quick-link-card">
      <span className="quick-link-icon">📈</span>
      <span className="quick-link-text">Results</span>
     </Link>
     <Link to="/student/disciplinary" className="quick-link-card">
      <span className="quick-link-icon">⚖️</span>
      <span className="quick-link-text">Disciplinary</span>
     </Link>
    </div>
   </div>
  </Layout>
 );
}

