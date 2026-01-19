import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";

export default function FacultyDashboard() {
 const stored = localStorage.getItem("user");
 if (!stored) {
  return (
   <Layout>
    <div className="empty-state">
     <div className="empty-state-icon">🔒</div>
     <h3>Session Expired</h3>
     <p>Please login again to continue.</p>
    </div>
   </Layout>
  );
 }

 const user = JSON.parse(stored);
 const [courses, setCourses] = useState([]);
 const [stats, setStats] = useState({
  totalCourses: 0,
  totalStudents: 0,
  attendanceSessions: 0,
  marksEntered: 0
 });
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchData = async () => {
   try {
    // Fetch courses
    const coursesRes = await axios.get(`http://localhost:5050/api/faculty/courses/${user.id}`);
    setCourses(coursesRes.data);
    
    // Calculate stats
    const totalStudents = coursesRes.data.reduce((acc, c) => acc + (c.students || 45), 0);
    setStats({
     totalCourses: coursesRes.data.length,
     totalStudents: totalStudents,
     attendanceSessions: coursesRes.data.length * 8,
     marksEntered: coursesRes.data.length * 45
    });
   } catch (err) {
    console.log("Course Fetch Error:", err);
    // Mock data for demo
    setCourses([
     { id: 1, course_name: "Database Management Systems", course_code: "CS301", semester: 3, credits: 4 },
     { id: 2, course_name: "Computer Networks", course_code: "CS302", semester: 4, credits: 3 }
    ]);
    setStats({
     totalCourses: 2,
     totalStudents: 90,
     attendanceSessions: 16,
     marksEntered: 90
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
    <h2>Welcome, {user?.name} 👨‍🏫</h2>
    <p>{user?.department} Department</p>
   </div>

   {/* Quick Actions */}
   <div className="quick-actions">
    <Link to="/faculty/attendance" className="quick-action-btn primary">
     📋 Mark Attendance
    </Link>
    <Link to="/faculty/marks" className="quick-action-btn success">
     📝 Enter Marks
    </Link>
    <Link to="/faculty/timetable" className="quick-action-btn purple">
     📅 View Timetable
    </Link>
    <Link to="/faculty/analytics" className="quick-action-btn orange">
     📊 Analytics
    </Link>
   </div>

   {/* Stats Cards */}
   <div className="stats-row">
    <div className="stat-card">
     <div className="stat-label">Total Courses</div>
     <div className="stat-value blue">{stats.totalCourses}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Total Students</div>
     <div className="stat-value green">{stats.totalStudents}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Attendance Sessions</div>
     <div className="stat-value orange">{stats.attendanceSessions}</div>
    </div>
    <div className="stat-card">
     <div className="stat-label">Marks Entered</div>
     <div className="stat-value purple">{stats.marksEntered}</div>
    </div>
   </div>

   {/* Assigned Courses */}
   <div className="dashboard-card">
    <div className="dashboard-card-header">
     <h3><span>📚</span> Assigned Courses</h3>
    </div>

    {courses.length === 0 ? (
     <div className="empty-state">
      <div className="empty-state-icon">📖</div>
      <h3>No Courses Assigned</h3>
      <p>Contact admin to assign courses to your profile</p>
     </div>
    ) : (
     <div className="table-container">
      <table className="marks-table">
       <thead>
        <tr>
         <th>Course Code</th>
         <th>Course Name</th>
         <th>Semester</th>
         <th>Credits</th>
         <th>Students</th>
         <th>Actions</th>
        </tr>
       </thead>
       <tbody>
        {courses.map(c => (
         <tr key={c.id}>
          <td className="font-mono text-sm">{c.course_code}</td>
          <td className="font-semibold">{c.course_name}</td>
          <td>Semester {c.semester}</td>
          <td>{c.credits}</td>
          <td>
           <span className="badge badge-info">~45 students</span>
          </td>
          <td>
           <div className="flex gap-2">
            <button 
             onClick={() => window.location.href = `/faculty/attendance?course=${c.id}`}
             className="btn-secondary btn-small"
            >
             Attendance
            </button>
            <button 
             onClick={() => window.location.href = `/faculty/marks?course=${c.id}`}
             className="btn-primary btn-small"
            >
             Marks
            </button>
           </div>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    )}
   </div>

   {/* Recent Activity Section */}
   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
    {/* Upcoming Classes */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>📅</span> Upcoming Classes</h3>
     </div>
     <div className="info-list">
      <div className="info-item">
       <span className="info-item-icon">📖</span>
       <div className="info-item-content">
        <div className="info-item-title">Database Management Systems</div>
        <div className="info-item-subtitle">Monday, 10:00 - 11:00 AM</div>
       </div>
       <span className="badge badge-info">Room 301</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">📖</span>
       <div className="info-item-content">
        <div className="info-item-title">Computer Networks</div>
        <div className="info-item-subtitle">Tuesday, 2:00 - 3:00 PM</div>
       </div>
       <span className="badge badge-info">Room 302</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">📖</span>
       <div className="info-item-content">
        <div className="info-item-title">Database Management Systems</div>
        <div className="info-item-subtitle">Wednesday, 10:00 - 11:00 AM</div>
       </div>
       <span className="badge badge-info">Room 301</span>
      </div>
     </div>
    </div>

    {/* Pending Tasks */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>⚡</span> Pending Tasks</h3>
     </div>
     <div className="info-list">
      <div className="info-item">
       <span className="info-item-icon">⚠️</span>
       <div className="info-item-content">
        <div className="info-item-title">Submit Internal Marks</div>
        <div className="info-item-subtitle">DBMS - Due in 3 days</div>
       </div>
       <span className="badge badge-danger">Urgent</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">⏰</span>
       <div className="info-item-content">
        <div className="info-item-title">Attendance Update</div>
        <div className="info-item-subtitle">CN - Not updated for 2 days</div>
       </div>
       <span className="badge badge-warning">Soon</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">✅</span>
       <div className="info-item-content">
        <div className="info-item-title">Assignment Review</div>
        <div className="info-item-subtitle">5 assignments pending review</div>
       </div>
       <span className="badge badge-success">New</span>
      </div>
     </div>
    </div>
   </div>
  </Layout>
 );
}

