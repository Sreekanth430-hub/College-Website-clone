import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function DepartmentFaculty() {
 const [dept, setDept] = useState("CSE");
 const [faculty, setFaculty] = useState([]);
 const [loading, setLoading] = useState(true);

 const departments = [
  { value: "CSE", label: "Computer Science Engineering" },
  { value: "ECE", label: "Electronics & Communication Engineering" },
  { value: "EEE", label: "Electrical & Electronics Engineering" },
  { value: "MECH", label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" }
 ];

 useEffect(() => {
  const fetchFaculty = async () => {
   setLoading(true);
   try {
    const res = await axios.get(`http://localhost:5050/api/admin-manage/faculty/department/${dept}`);
    setFaculty(res.data);
   } catch (err) {
    console.log("Error fetching faculty:", err);
    // Mock data for demo
    setFaculty([
     { id: 1, name: "Dr. Smith", email: "smith@college.edu", mobile: "9876543210", qualification: "Ph.D", experience: 10 },
     { id: 2, name: "Dr. Johnson", email: "johnson@college.edu", mobile: "9876543211", qualification: "M.Tech", experience: 8 },
     { id: 3, name: "Dr. Williams", email: "williams@college.edu", mobile: "9876543212", qualification: "Ph.D", experience: 12 },
     { id: 4, name: "Dr. Brown", email: "brown@college.edu", mobile: "9876543213", qualification: "M.Tech", experience: 6 },
    ]);
   } finally {
    setLoading(false);
   }
  };
  fetchFaculty();
 }, [dept]);

 const selectedDept = departments.find(d => d.value === dept);

 return (
  <Layout>
   <div className="dept-page">
    {/* Header */}
    <div className="dept-header">
     <div>
      <h2 className="dept-title">Department Faculty</h2>
      <p className="page-subtitle">View all faculty members in {selectedDept?.label}</p>
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
      <div className="stat-label">Total Faculty</div>
      <div className="stat-value blue">{faculty.length}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Department</div>
      <div className="stat-value">{dept}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Ph.D Holders</div>
      <div className="stat-value green">{faculty.filter(f => f.qualification?.includes("Ph")).length}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Avg Experience</div>
      <div className="stat-value purple">
       {faculty.length > 0 
        ? (faculty.reduce((acc, f) => acc + (f.experience || 0), 0) / faculty.length).toFixed(1) 
        : 0} yrs
      </div>
     </div>
    </div>

    {/* Faculty Table */}
    <div className="dept-table-container">
     {loading ? (
      <div className="loading-container">
       <div className="loading-spinner"></div>
       <p className="loading-text">Loading faculty...</p>
      </div>
     ) : (
      <table className="dept-table">
       <thead>
        <tr>
         <th>Name</th>
         <th>Email</th>
         <th>Mobile</th>
         <th>Qualification</th>
         <th>Experience</th>
         <th>Status</th>
        </tr>
       </thead>
       <tbody>
        {faculty.length === 0 ? (
         <tr>
          <td colSpan="6" className="dept-empty">No faculty found in {dept} department</td>
         </tr>
        ) : (
         faculty.map(f => (
          <tr key={f.id}>
           <td className="font-semibold">{f.name}</td>
           <td>{f.email}</td>
           <td>{f.mobile}</td>
           <td>
            <span className="badge badge-info">{f.qualification}</span>
           </td>
           <td>{f.experience} years</td>
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
      <li>Faculty members are listed with their qualifications and experience</li>
      <li>Contact faculty via their registered email or mobile number</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}

