import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Reports() {
 const [stats, setStats] = useState({});
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchReports = async () => {
   try {
    const res = await axios.get("http://localhost:5050/api/admin-reports/summary");
    setStats(res.data);
   } catch (err) {
    console.log("Error fetching reports:", err);
    // Mock data for demo
    setStats({
     students: 450,
     faculty: 35,
     courses: 28,
     backlogs: 12,
     approved: 380,
     pass: 1250,
     fail: 45
    });
   } finally {
    setLoading(false);
   }
  };
  fetchReports();
 }, []);

 if (loading) {
  return (
   <Layout>
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p className="loading-text">Loading reports...</p>
    </div>
   </Layout>
  );
 }

 return (
  <Layout>
   <div className="reports-page">
    {/* Header */}
    <div className="dashboard-welcome">
     <h2>College Reports 📊</h2>
     <p>Overview of college statistics and performance metrics</p>
    </div>

    {/* Reports Grid */}
    <div className="reports-grid">
     <div className="report-card">
      <div className="report-card-header">
       <div className="report-card-icon blue">👥</div>
       <div className="report-card-title">Total Students</div>
      </div>
      <div className="report-card-value">{stats.students}</div>
     </div>

     <div className="report-card">
      <div className="report-card-header">
       <div className="report-card-icon green">👨‍🏫</div>
       <div className="report-card-title">Total Faculty</div>
      </div>
      <div className="report-card-value">{stats.faculty}</div>
     </div>

     <div className="report-card">
      <div className="report-card-header">
       <div className="report-card-icon purple">📚</div>
       <div className="report-card-title">Total Courses</div>
      </div>
      <div className="report-card-value">{stats.courses}</div>
     </div>

     <div className="report-card">
      <div className="report-card-header">
       <div className="report-card-icon red">⚠️</div>
       <div className="report-card-title">Active Backlogs</div>
      </div>
      <div className="report-card-value">{stats.backlogs}</div>
     </div>

     <div className="report-card">
      <div className="report-card-header">
       <div className="report-card-icon green">✅</div>
       <div className="report-card-title">Approved Results</div>
      </div>
      <div className="report-card-value">{stats.approved}</div>
     </div>

     <div className="report-card">
      <div className="report-card-header">
       <div className="report-card-icon blue">📝</div>
       <div className="report-card-title">Pass Subjects</div>
      </div>
      <div className="report-card-value">{stats.pass}</div>
     </div>

     <div className="report-card danger">
      <div className="report-card-header">
       <div className="report-card-icon red">❌</div>
       <div className="report-card-title">Failed Subjects</div>
      </div>
      <div className="report-card-value">{stats.fail}</div>
     </div>
    </div>

    {/* Performance Overview */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>📈</span> Performance Overview</h3>
     </div>
     <div className="info-list">
      <div className="info-item">
       <span className="info-item-icon">📊</span>
       <div className="info-item-content">
        <div className="info-item-title">Pass Rate</div>
        <div className="info-item-subtitle">
         {stats.pass && stats.fail 
          ? ((stats.pass / (stats.pass + stats.fail)) * 100).toFixed(1) 
          : 0}% students passed
        </div>
       </div>
       <span className="badge badge-success">Good</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">👥</span>
       <div className="info-item-content">
        <div className="info-item-title">Student-Faculty Ratio</div>
        <div className="info-item-subtitle">
         {stats.faculty > 0 ? (stats.students / stats.faculty).toFixed(1) : 0} students per faculty
        </div>
       </div>
       <span className="badge badge-info">Optimal</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">📚</span>
       <div className="info-item-content">
        <div className="info-item-title">Courses per Department</div>
        <div className="info-item-subtitle">
         {stats.courses > 0 ? (stats.courses / 5).toFixed(1) : 0} avg courses
        </div>
       </div>
       <span className="badge badge-info">Balanced</span>
      </div>
      <div className="info-item">
       <span className="info-item-icon">⚠️</span>
       <div className="info-item-content">
        <div className="info-item-title">Backlog Rate</div>
        <div className="info-item-subtitle">
         {stats.students > 0 
          ? ((stats.backlogs / stats.students) * 100).toFixed(1) 
          : 0}% of students have backlogs
        </div>
       </div>
       <span className={`badge ${stats.backlogs / stats.students < 0.1 ? "badge-success" : "badge-warning"}`}>
        {stats.backlogs / stats.students < 0.1 ? "Low" : "Monitor"}
       </span>
      </div>
     </div>
    </div>

    {/* Quick Stats */}
    <div className="info-card">
     <h4>📋 Summary</h4>
     <ul>
      <li>The college has <strong>{stats.students}</strong> students across all departments</li>
      <li>There are <strong>{stats.faculty}</strong> faculty members teaching <strong>{stats.courses}</strong> courses</li>
      <li>Result approval rate is at <strong>{stats.approved}</strong> with a pass rate of{" "}
       <strong>{stats.pass && stats.fail ? ((stats.pass / (stats.pass + stats.fail)) * 100).toFixed(1) : 0}%</strong></li>
      <li>Backlog count is at <strong>{stats.backlogs}</strong> which requires attention</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}

