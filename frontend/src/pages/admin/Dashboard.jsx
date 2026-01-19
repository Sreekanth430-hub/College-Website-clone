import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AddStudent from "./AddStudent";
import AddFaculty from "./AddFaculty";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
 const [openStudent, setOpenStudent] = useState(false);
 const [openFaculty, setOpenFaculty] = useState(false);
 const [stats, setStats] = useState({
  students: 0,
  faculty: 0,
  courses: 0,
  backlogs: 0
 });
 const [loading, setLoading] = useState(true);

 // Fetch stats from API or use mock data
 useEffect(() => {
  const fetchStats = async () => {
   try {
    // Try to fetch from API if endpoints exist
    // For now, using mock data
    setStats({
     students: 450,
     faculty: 35,
     courses: 28,
     backlogs: 12
    });
   } catch (err) {
    console.log("Error fetching stats:", err);
    setStats({
     students: 450,
     faculty: 35,
     courses: 28,
     backlogs: 12
    });
   } finally {
    setLoading(false);
   }
  };
  fetchStats();
 }, []);

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
  <>
   {openStudent && <AddStudent onClose={() => setOpenStudent(false)} />}
   {openFaculty && <AddFaculty onClose={() => setOpenFaculty(false)} />}

   <Layout>
    {/* Welcome Header */}
    <div className="dashboard-welcome">
     <h2>Admin Panel 🛡️</h2>
     <p>College Management System</p>
    </div>

    {/* Quick Actions */}
    <div className="quick-actions">
     <button 
      className="quick-action-btn dark"
      onClick={() => setOpenStudent(true)}
     >
      ➕ Add Student
     </button>
     <button 
      className="quick-action-btn blue"
      onClick={() => setOpenFaculty(true)}
     >
      👨‍🏫 Add Faculty
     </button>
     <Link to="/admin/students" className="quick-action-btn success">
      👥 View Students
     </Link>
     <Link to="/admin/reports" className="quick-action-btn purple">
      📊 View Reports
     </Link>
    </div>

    {/* Stats Cards */}
    <div className="stats-row">
     <div className="stat-card">
      <div className="stat-label">Total Students</div>
      <div className="stat-value blue">{stats.students}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Total Faculty</div>
      <div className="stat-value green">{stats.faculty}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Total Courses</div>
      <div className="stat-value purple">{stats.courses}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Active Backlogs</div>
      <div className="stat-value red">{stats.backlogs}</div>
     </div>
    </div>

    {/* Management Sections */}
    <div className="dashboard-section">
     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
      {/* Students Management */}
      <div className="dashboard-card">
       <div className="dashboard-card-header">
        <h3><span>👥</span> Students</h3>
       </div>
       <div className="info-list">
        <Link to="/admin/students/add" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">➕</span>
         <div className="info-item-content">
          <div className="info-item-title">Add New Student</div>
          <div className="info-item-subtitle">Register a new student</div>
         </div>
        </Link>
        <Link to="/admin/students/department" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">📋</span>
         <div className="info-item-content">
          <div className="info-item-title">Department-wise List</div>
          <div className="info-item-subtitle">View students by department</div>
         </div>
        </Link>
        <Link to="/admin/approval" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">✅</span>
         <div className="info-item-content">
          <div className="info-item-title">Approve Results</div>
          <div className="info-item-subtitle">Review and approve student results</div>
         </div>
        </Link>
       </div>
      </div>

      {/* Faculty Management */}
      <div className="dashboard-card">
       <div className="dashboard-card-header">
        <h3><span>👨‍🏫</span> Faculty</h3>
       </div>
       <div className="info-list">
        <Link to="/admin/faculty/add" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">➕</span>
         <div className="info-item-content">
          <div className="info-item-title">Add New Faculty</div>
          <div className="info-item-subtitle">Register a new faculty member</div>
         </div>
        </Link>
        <Link to="/admin/faculty/department" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">📋</span>
         <div className="info-item-content">
          <div className="info-item-title">Department-wise List</div>
          <div className="info-item-subtitle">View faculty by department</div>
         </div>
        </Link>
        <Link to="/admin/courses/assign" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">📚</span>
         <div className="info-item-content">
          <div className="info-item-title">Assign Courses</div>
          <div className="info-item-subtitle">Assign courses to faculty</div>
         </div>
        </Link>
       </div>
      </div>

      {/* Courses & Timetable */}
      <div className="dashboard-card">
       <div className="dashboard-card-header">
        <h3><span>📖</span> Academic</h3>
       </div>
       <div className="info-list">
        <Link to="/admin/courses/add" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">➕</span>
         <div className="info-item-content">
          <div className="info-item-title">Add New Course</div>
          <div className="info-item-subtitle">Create a new course</div>
         </div>
        </Link>
        <Link to="/admin/timetable" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">📅</span>
         <div className="info-item-content">
          <div className="info-item-title">Manage Timetable</div>
          <div className="info-item-subtitle">Edit class schedules</div>
         </div>
        </Link>
        <Link to="/admin/reports" className="info-item" style={{ textDecoration: "none" }}>
         <span className="info-item-icon">📈</span>
         <div className="info-item-content">
          <div className="info-item-title">College Reports</div>
          <div className="info-item-subtitle">View comprehensive reports</div>
         </div>
        </Link>
       </div>
      </div>
     </div>
    </div>

    {/* Recent Activity */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>🕐</span> Recent Activity</h3>
     </div>
     <div className="info-list">
      <div className="info-item">
       <span className="info-item-icon">✅</span>
       <div className="info-item-content">
        <div className="info-item-title">New student registered</div>
        <div className="info-item-subtitle">John Smith - CSE Department</div>
       </div>
       <span className="badge badge-info">2 hours ago</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">📝</span>
       <div className="info-item-content">
        <div className="info-item-title">Marks submitted</div>
        <div className="info-item-subtitle">Database Management Systems - Sem 3</div>
       </div>
       <span className="badge badge-info">5 hours ago</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">📅</span>
       <div className="info-item-content">
        <div className="info-item-title">Timetable updated</div>
        <div className="info-item-subtitle">CSE Department - Semester 6</div>
       </div>
       <span className="badge badge-info">1 day ago</span>
      </div>
     </div>
    </div>
   </Layout>
  </>
 );
}

