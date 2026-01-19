import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function DepartmentStudents() {
 const [dept, setDept] = useState("CSE");
 const [students, setStudents] = useState([]);
 const [loading, setLoading] = useState(true);

 const departments = [
  { value: "CSE", label: "Computer Science Engineering" },
  { value: "ECE", label: "Electronics & Communication Engineering" },
  { value: "EEE", label: "Electrical & Electronics Engineering" },
  { value: "MECH", label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" }
 ];

 useEffect(() => {
  const fetchStudents = async () => {
   setLoading(true);
   try {
    const res = await axios.get(`http://localhost:5050/api/admin-manage/students/department/${dept}`);
    setStudents(res.data);
   } catch (err) {
    console.log("Error fetching students:", err);
    // Mock data for demo
    setStudents([
     { id: 1, name: "John Smith", roll: "CSE001", email: "john@cse.edu", mobile: "9876543210" },
     { id: 2, name: "Jane Doe", roll: "CSE002", email: "jane@cse.edu", mobile: "9876543211" },
     { id: 3, name: "Mike Johnson", roll: "CSE003", email: "mike@cse.edu", mobile: "9876543212" },
     { id: 4, name: "Sarah Williams", roll: "CSE004", email: "sarah@cse.edu", mobile: "9876543213" },
     { id: 5, name: "David Brown", roll: "CSE005", email: "david@cse.edu", mobile: "9876543214" },
    ]);
   } finally {
    setLoading(false);
   }
  };
  fetchStudents();
 }, [dept]);

 const selectedDept = departments.find(d => d.value === dept);

 return (
  <Layout>
   <div className="dept-page">
    {/* Header */}
    <div className="dept-header">
     <div>
      <h2 className="dept-title">Department Students</h2>
      <p className="page-subtitle">View all students in {selectedDept?.label}</p>
     </div>
     <select
      className="dept-select"
      value={dept}
      onChange={e => setDept(e.target.value)}
     >
      {departments.map(dep => (
       <option key={dep.value} value={dep.value}>{dep.label}</option>
      ))}
     </select>
    </div>

    {/* Stats */}
    <div className="stats-row" style={{ marginBottom: "25px" }}>
     <div className="stat-card">
      <div className="stat-label">Total Students</div>
      <div className="stat-value blue">{students.length}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Department</div>
      <div className="stat-value">{dept}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Active</div>
      <div className="stat-value green">{students.length}</div>
     </div>
    </div>

    {/* Students Table */}
    <div className="dept-table-container">
     {loading ? (
      <div className="loading-container">
       <div className="loading-spinner"></div>
       <p className="loading-text">Loading students...</p>
      </div>
     ) : (
      <table className="dept-table">
       <thead>
        <tr>
         <th>Name</th>
         <th>Roll Number</th>
         <th>Email</th>
         <th>Mobile</th>
         <th>Status</th>
        </tr>
       </thead>
       <tbody>
        {students.length === 0 ? (
         <tr>
          <td colSpan="5" className="dept-empty">No students found in {dept} department</td>
         </tr>
        ) : (
         students.map(s => (
          <tr key={s.id}>
           <td className="font-semibold">{s.name}</td>
           <td><span className="badge badge-info">{s.roll}</span></td>
           <td>{s.email}</td>
           <td>{s.mobile}</td>
           <td><span className="badge badge-success">Active</span></td>
          </tr>
         ))
        )}
       </tbody>
      </table>
     )}
    </div>

    {/* Info Card */}
    <div className="info-card">
     <h4>💡 Quick Actions</h4>
     <ul>
      <li>Use the dropdown above to switch between departments</li>
      <li>Click on any student row to view detailed information</li>
      <li>Contact students via their registered email or mobile number</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}

