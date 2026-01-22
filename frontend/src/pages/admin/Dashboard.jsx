import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AddStudent from "./AddStudent";
import AddFaculty from "./AddFaculty";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
 const [openStudent, setOpenStudent] = useState(false);
 const [openFaculty, setOpenFaculty] = useState(false);
 const [stats, setStats] = useState({
  students: 0,
  faculty: 0,
  courses: 0,
  backlogs: 0,
  pendingApprovals: 0,
  todayAttendance: 0
 });
 const [loading, setLoading] = useState(true);
 const [recentActivity, setRecentActivity] = useState([]);
 const [pendingApprovals, setPendingApprovals] = useState([]);

 // Fetch stats and recent activity from API or use mock data
 useEffect(() => {
  const fetchData = async () => {
   try {
    // Try to fetch from API if endpoints exist
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    
    try {
     // Fetch real data from APIs
     const [studentsRes, facultyRes, coursesRes, approvalRes] = await Promise.all([
      axios.get("http://localhost:5050/api/admin-manage/students", { headers }),
      axios.get("http://localhost:5050/api/admin-manage/faculty", { headers }),
      axios.get("http://localhost:5050/api/admin-courses", { headers }),
      axios.get("http://localhost:5050/api/admin-approval/pending", { headers }).catch(() => ({ data: [] }))
     ]);

     setStats({
      students: studentsRes.data?.length || 0,
      faculty: facultyRes.data?.length || 0,
      courses: coursesRes.data?.length || 0,
      backlogs: 12, // This would need a separate endpoint
      pendingApprovals: approvalRes.data?.length || 0,
      todayAttendance: 85 // This would need a separate endpoint
     });

     // Generate recent activity from fetched data
     const activities = [];
     
     // Recent students
     if (studentsRes.data && studentsRes.data.length > 0) {
      const recentStudents = studentsRes.data.slice(-3).reverse();
      recentStudents.forEach((student, idx) => {
       activities.push({
        id: `student-${student.id}`,
        type: "student",
        title: "New Student Registered",
        description: `${student.name} joined ${student.department}`,
        time: "Just now",
        icon: "👨‍🎓",
        status: "success"
       });
      });
     }

     // Recent faculty
     if (facultyRes.data && facultyRes.data.length > 0) {
      const recentFaculty = facultyRes.data.slice(-2).reverse();
      recentFaculty.forEach((faculty) => {
       activities.push({
        id: `faculty-${faculty.id}`,
        type: "faculty",
        title: "Faculty Member Added",
        description: `${faculty.name} joined as ${faculty.department} faculty`,
        time: "2 hours ago",
        icon: "👨‍🏫",
        status: "info"
       });
      });
     }

     // Pending approvals
     if (approvalRes.data && approvalRes.data.length > 0) {
      setPendingApprovals(approvalRes.data.slice(0, 3));
     }

     setRecentActivity(activities.slice(0, 6));

    } catch (apiError) {
     console.log("API fetch error, using mock data:", apiError);
     // Mock data for demo
     setStats({
      students: 450,
      faculty: 35,
      courses: 28,
      backlogs: 12,
      pendingApprovals: 5,
      todayAttendance: 87
     });

     setRecentActivity([
      {
       id: 1,
       type: "student",
       title: "New Student Registered",
       description: "John Doe joined Computer Science",
       time: "5 minutes ago",
       icon: "👨‍🎓",
       status: "success"
      },
      {
       id: 2,
       type: "approval",
       title: "Result Approval Pending",
       description: "5 student results awaiting approval",
       time: "1 hour ago",
       icon: "📋",
       status: "warning"
      },
      {
       id: 3,
       type: "faculty",
       title: "Faculty Assignment Updated",
       description: "Prof. Smith assigned to DBMS Course",
       time: "2 hours ago",
       icon: "👨‍🏫",
       status: "info"
      },
      {
       id: 4,
       type: "timetable",
       title: "Timetable Updated",
       description: "Monday timetable has been updated",
       time: "Yesterday",
       icon: "📅",
       status: "info"
      },
      {
       id: 5,
       type: "student",
       title: "Student Promoted",
       description: "Batch 2022 promoted to 3rd Semester",
       time: "Yesterday",
       icon: "🎓",
       status: "success"
      },
      {
       id: 6,
       type: "backlog",
       title: "Backlog Clearance",
       description: "3 students cleared all backlogs",
       time: "2 days ago",
       icon: "✅",
       status: "success"
      }
     ]);

     setPendingApprovals([
      { id: 1, type: "Result", student: "Jane Smith", course: "Operating Systems", date: "Today" },
      { id: 2, type: "Result", student: "Mike Johnson", course: "CN", date: "Today" },
      { id: 3, type: "Result", student: "Sarah Wilson", course: "Java Programming", date: "Yesterday" }
     ]);
    }

   } catch (err) {
    console.log("Error fetching data:", err);
    // Fallback mock data
    setStats({
     students: 450,
     faculty: 35,
     courses: 28,
     backlogs: 12,
     pendingApprovals: 5,
     todayAttendance: 87
    });
    setRecentActivity([
     {
      id: 1,
      type: "student",
      title: "New Student Registered",
      description: "John Doe joined Computer Science",
      time: "5 minutes ago",
      icon: "👨‍🎓",
      status: "success"
     },
     {
      id: 2,
      type: "approval",
      title: "Result Approval Pending",
      description: "5 student results awaiting approval",
      time: "1 hour ago",
      icon: "📋",
      status: "warning"
     },
     {
      id: 3,
      type: "faculty",
      title: "Faculty Assignment Updated",
      description: "Prof. Smith assigned to DBMS Course",
      time: "2 hours ago",
      icon: "👨‍🏫",
      status: "info"
     }
    ]);
   } finally {
    setLoading(false);
   }
  };
  fetchData();
 }, []);

 // Helper function to format time
 const formatTime = (time) => {
  return time;
 };

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
     <p>College Management System - Academic Year 2024-25</p>
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
      + Add Faculty
     </button>
     <Link to="/admin/students" className="quick-action-btn success">
      👥 View Students
     </Link>
     <Link to="/admin/reports" className="quick-action-btn purple">
       View Reports
     </Link>
    </div>

    {/* Stats Cards */}
    <div className="stats-row">
     <div className="stat-card">
      <div className="stat-icon">👨‍🎓</div>
      <div className="stat-content">
       <div className="stat-value blue">{stats.students}</div>
       <div className="stat-label">Total Students</div>
      </div>
     </div>
     <div className="stat-card">
      <div className="stat-icon">👨‍🏫</div>
      <div className="stat-content">
       <div className="stat-value green">{stats.faculty}</div>
       <div className="stat-label">Total Faculty</div>
      </div>
     </div>
     <div className="stat-card">
      <div className="stat-icon">📖</div>
      <div className="stat-content">
       <div className="stat-value purple">{stats.courses}</div>
       <div className="stat-label">Total Courses</div>
      </div>
     </div>
     <div className="stat-card">
      <div className="stat-icon">⚠️</div>
      <div className="stat-content">
       <div className="stat-value red">{stats.backlogs}</div>
       <div className="stat-label">Active Backlogs</div>
      </div>
     </div>
     <div className="stat-card">
      <div className="stat-icon">📋</div>
      <div className="stat-content">
       <div className="stat-value orange">{stats.pendingApprovals}</div>
       <div className="stat-label">Pending Approvals</div>
      </div>
     </div>
     <div className="stat-card">
      <div className="stat-icon">📊</div>
      <div className="stat-content">
       <div className="stat-value green">{stats.todayAttendance}%</div>
       <div className="stat-label">Today's Attendance</div>
      </div>
     </div>
    </div>

    {/* Management Sections */}
    <div className="dashboard-section">
     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
      {/* Students Management */}
      <div className="dashboard-card">
       <div className="dashboard-card-header">
        <h3><span>👥</span> Students</h3>
        <Link to="/admin/students" className="view-all-link">View All</Link>
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
        <Link to="/admin/faculty" className="view-all-link">View All</Link>
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
        <Link to="/admin/courses" className="view-all-link">View All</Link>
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
         <span className="info-item-icon">📊</span>
         <div className="info-item-content">
          <div className="info-item-title">College Reports</div>
          <div className="info-item-subtitle">View comprehensive reports</div>
         </div>
        </Link>
       </div>
      </div>
     </div>
    </div>

    {/* Recent Activity & Pending Approvals */}
    <div className="dashboard-section">
     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
      
      {/* Recent Activity */}
      <div className="dashboard-card recent-activity-card">
       <div className="dashboard-card-header">
        <h3><span>📋</span> Recent Activity</h3>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
         🔄 Refresh
        </button>
       </div>
       <div className="activity-list">
        {recentActivity.length > 0 ? (
         recentActivity.map((activity) => (
          <div key={activity.id} className="activity-item">
           <div className={`activity-icon ${activity.status}`}>
            {activity.icon}
           </div>
           <div className="activity-content">
            <div className="activity-title">{activity.title}</div>
            <div className="activity-description">{activity.description}</div>
            <div className="activity-time">{activity.time}</div>
           </div>
          </div>
         ))
        ) : (
         <div className="empty-activity">
          <span className="empty-icon">📭</span>
          <p>No recent activity</p>
         </div>
        )}
       </div>
       <Link to="/admin/reports" className="view-all-activity">
        View All Activity →
       </Link>
      </div>

      {/* Pending Approvals */}
      <div className="dashboard-card pending-approvals-card">
       <div className="dashboard-card-header">
        <h3><span>⏳</span> Pending Approvals</h3>
        <span className="approval-count">{pendingApprovals.length} pending</span>
       </div>
       <div className="approval-list">
        {pendingApprovals.length > 0 ? (
         pendingApprovals.map((approval) => (
          <div key={approval.id} className="approval-item">
           <div className="approval-info">
            <div className="approval-type">{approval.type}</div>
            <div className="approval-details">
             <strong>{approval.student}</strong> - {approval.course}
            </div>
            <div className="approval-date">{approval.date}</div>
           </div>
           <div className="approval-actions">
            <button className="approval-btn approve">✓</button>
            <button className="approval-btn reject">✗</button>
           </div>
          </div>
         ))
        ) : (
         <div className="empty-approval">
          <span className="empty-icon">✅</span>
          <p>All caught up! No pending approvals.</p>
         </div>
        )}
       </div>
       <Link to="/admin/approval" className="view-all-approvals">
        View All Pending → 
       </Link>
      </div>
     </div>
    </div>

   </Layout>
  </>
 );
}

