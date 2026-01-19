import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Timetable() {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const [timetable, setTimetable] = useState([]);
 const [facultyList, setFacultyList] = useState([]);
 const [courses, setCourses] = useState([]);
 
 const [form, setForm] = useState({
  department: "",
  semester: "",
  day: "Monday",
  time: "09:00-10:00",
  subject: "",
  faculty: "",
  room: ""
 });

 const [filter, setFilter] = useState({
  department: "",
  semester: ""
 });

 const days = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" }
 ];

 const timeSlots = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00"
 ];

 const departments = [
  { value: "CSE", label: "CSE - Computer Science" },
  { value: "ECE", label: "ECE - Electronics & Communication" },
  { value: "EEE", label: "EEE - Electrical & Electronics" },
  { value: "MECH", label: "MECH - Mechanical" },
  { value: "CIVIL", label: "CIVIL - Civil" }
 ];

 const semesters = [
  { value: "1", label: "Semester 1" },
  { value: "2", label: "Semester 2" },
  { value: "3", label: "Semester 3" },
  { value: "4", label: "Semester 4" },
  { value: "5", label: "Semester 5" },
  { value: "6", label: "Semester 6" },
  { value: "7", label: "Semester 7" },
  { value: "8", label: "Semester 8" }
 ];

 // Load initial data
 useEffect(() => {
  loadTimetable();
  loadFaculty();
  loadCourses();
 }, []);

 const loadTimetable = async () => {
  try {
   const res = await axios.get("http://localhost:5050/api/timetable/all");
   setTimetable(res.data);
  } catch (err) {
   console.log("Error loading timetable:", err);
   // Use mock data for demo
   setTimetable([
    { id: 1, department: "CSE", semester: 6, day: "Monday", time: "09:00-10:00", subject: "Data Structures", faculty: "Dr. Smith", room: "Room 101" },
    { id: 2, department: "CSE", semester: 6, day: "Monday", time: "10:00-11:00", subject: "Algorithms", faculty: "Dr. Johnson", room: "Room 102" },
    { id: 3, department: "CSE", semester: 6, day: "Tuesday", time: "09:00-10:00", subject: "Database Systems", faculty: "Dr. Williams", room: "Room 103" },
    { id: 4, department: "CSE", semester: 6, day: "Wednesday", time: "11:00-12:00", subject: "Operating Systems", faculty: "Dr. Brown", room: "Room 101" },
    { id: 5, department: "ECE", semester: 6, day: "Monday", time: "09:00-10:00", subject: "Digital Signal Processing", faculty: "Dr. Davis", room: "Room 201" },
   ]);
  }
 };

 const loadFaculty = async () => {
  try {
   const res = await axios.get("http://localhost:5050/api/admin-manage/faculty");
   setFacultyList(res.data);
  } catch (err) {
   console.log("Error loading faculty:", err);
   setFacultyList([
    { id: 1, name: "Dr. Smith", email: "smith@college.edu", department: "CSE" },
    { id: 2, name: "Dr. Johnson", email: "johnson@college.edu", department: "CSE" },
    { id: 3, name: "Dr. Williams", email: "williams@college.edu", department: "CSE" },
    { id: 4, name: "Dr. Brown", email: "brown@college.edu", department: "CSE" },
    { id: 5, name: "Dr. Davis", email: "davis@college.edu", department: "ECE" },
   ]);
  }
 };

 const loadCourses = async () => {
  try {
   const res = await axios.get("http://localhost:5050/api/admin-courses");
   setCourses(res.data);
  } catch (err) {
   console.log("Error loading courses:", err);
   setCourses([
    { id: 1, course_name: "Data Structures", course_code: "CS301", department: "CSE", semester: 6 },
    { id: 2, course_name: "Algorithms", course_code: "CS302", department: "CSE", semester: 6 },
    { id: 3, course_name: "Database Systems", course_code: "CS303", department: "CSE", semester: 6 },
   ]);
  }
 };

 const validateForm = () => {
  if (!form.department) return "Please select a department";
  if (!form.semester) return "Please select a semester";
  if (!form.day) return "Please select a day";
  if (!form.time) return "Please select a time slot";
  if (!form.subject.trim()) return "Please enter subject name";
  if (!form.faculty) return "Please select faculty";
  if (!form.room.trim()) return "Please enter room number";
  return "";
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  
  const validationError = validateForm();
  if (validationError) {
   setError(validationError);
   return;
  }

  setLoading(true);
  try {
   await axios.post("http://localhost:5050/api/timetable/add", {
    ...form,
    semester: parseInt(form.semester)
   });
   setSuccess("Timetable entry added successfully ✅");
   setForm({
    department: filter.department,
    semester: filter.semester,
    day: "Monday",
    time: "09:00-10:00",
    subject: "",
    faculty: "",
    room: ""
   });
   loadTimetable();
   setTimeout(() => setSuccess(""), 3000);
  } catch (err) {
   console.log("Error:", err.response?.data || err.message);
   setError("Failed to add timetable entry ❌");
  } finally {
   setLoading(false);
  }
 };

 const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this timetable entry?")) return;
  
  try {
   await axios.delete(`http://localhost:5050/api/timetable/${id}`);
   setSuccess("Timetable entry deleted successfully 🗑️");
   loadTimetable();
   setTimeout(() => setSuccess(""), 3000);
  } catch (err) {
   setError("Failed to delete entry ❌");
  }
 };

 const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilter(prev => ({ ...prev, [name]: value }));
  setForm(prev => ({ ...prev, [name]: value }));
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
  if (error) setError("");
 };

 // Filter timetable based on filter state
 const filteredTimetable = timetable.filter(t => {
  if (filter.department && t.department !== filter.department) return false;
  if (filter.semester && t.semester !== parseInt(filter.semester)) return false;
  return true;
 });

 // Group by day for display
 const groupedByDay = days.reduce((acc, day) => {
  acc[day.value] = filteredTimetable.filter(t => t.day === day.value);
  return acc;
 }, {});

 // Get faculty options filtered by department
 const filteredFaculty = facultyList.filter(f => 
  !form.department || f.department === form.department
 );

 return (
  <Layout>
   <div className="timetable-page">
    <div className="page-header">
     <h2>Timetable Management</h2>
     <p className="page-subtitle">Create and manage class schedules for students and faculty</p>
    </div>

    {success && <div className="alert alert-success">{success}</div>}
    {error && <div className="alert alert-error">{error}</div>}

    <div className="timetable-container">
     {/* Add Timetable Form */}
     <div className="form-card">
      <h3 className="section-title">Add Timetable Entry</h3>
      
      <form onSubmit={handleSubmit}>
       <div className="form-grid">
        <div className="form-group">
         <label>Department *</label>
         <select 
          name="department"
          value={form.department}
          onChange={handleChange}
         >
          <option value="">Select Department</option>
          {departments.map(dept => (
           <option key={dept.value} value={dept.value}>{dept.label}</option>
          ))}
         </select>
        </div>

        <div className="form-group">
         <label>Semester *</label>
         <select 
          name="semester"
          value={form.semester}
          onChange={handleChange}
         >
          <option value="">Select Semester</option>
          {semesters.map(sem => (
           <option key={sem.value} value={sem.value}>{sem.label}</option>
          ))}
         </select>
        </div>

        <div className="form-group">
         <label>Day *</label>
         <select 
          name="day"
          value={form.day}
          onChange={handleChange}
         >
          {days.map(day => (
           <option key={day.value} value={day.value}>{day.label}</option>
          ))}
         </select>
        </div>

        <div className="form-group">
         <label>Time Slot *</label>
         <select 
          name="time"
          value={form.time}
          onChange={handleChange}
         >
          {timeSlots.map(slot => (
           <option key={slot} value={slot}>{slot}</option>
          ))}
         </select>
        </div>

        <div className="form-group">
         <label>Subject *</label>
         <input 
          type="text"
          name="subject"
          placeholder="Enter subject name"
          value={form.subject}
          onChange={handleChange}
         />
        </div>

        <div className="form-group">
         <label>Faculty *</label>
         <select 
          name="faculty"
          value={form.faculty}
          onChange={handleChange}
         >
          <option value="">Select Faculty</option>
          {filteredFaculty.map(f => (
           <option key={f.id} value={f.name}>{f.name} ({f.department})</option>
          ))}
         </select>
        </div>

        <div className="form-group">
         <label>Room *</label>
         <input 
          type="text"
          name="room"
          placeholder="e.g., Room 101, Lab A"
          value={form.room}
          onChange={handleChange}
         />
        </div>
       </div>

       <div className="form-actions">
        <button 
         type="submit" 
         className="btn-primary btn-large"
         disabled={loading}
        >
         {loading ? (
          <>
           <span className="spinner"></span>
           Adding...
          </>
         ) : (
          "Add Entry"
         )}
        </button>
       </div>
      </form>
     </div>

     {/* Filter Section */}
     <div className="filter-card">
      <h3 className="section-title">Filter Timetable</h3>
      <div className="form-grid">
       <div className="form-group">
        <label>Filter by Department</label>
        <select 
         name="department"
         value={filter.department}
         onChange={handleFilterChange}
        >
         <option value="">All Departments</option>
         {departments.map(dept => (
          <option key={dept.value} value={dept.value}>{dept.label}</option>
         ))}
        </select>
       </div>

       <div className="form-group">
        <label>Filter by Semester</label>
        <select 
         name="semester"
         value={filter.semester}
         onChange={handleFilterChange}
        >
         <option value="">All Semesters</option>
         {semesters.map(sem => (
          <option key={sem.value} value={sem.value}>{sem.label}</option>
         ))}
        </select>
       </div>
      </div>
     </div>

     {/* Timetable Grid Display */}
     <div className="timetable-display">
      <h3 className="section-title">
       Timetable 
       {filter.department && ` - ${filter.department}`}
       {filter.semester && ` Sem ${filter.semester}`}
      </h3>

      {days.map(day => (
       groupedByDay[day.value]?.length > 0 && (
        <div key={day} className="day-section">
         <h4 className="day-title">{day.value}</h4>
         <div className="day-slots">
          {groupedByDay[day.value]
           .sort((a, b) => a.time.localeCompare(b.time))
           .map(entry => (
            <div key={entry.id} className="time-slot">
             <div className="slot-time">{entry.time}</div>
             <div className="slot-details">
              <span className="slot-subject">{entry.subject}</span>
              <span className="slot-faculty">{entry.faculty}</span>
              <span className="slot-room">{entry.room}</span>
             </div>
             <button 
              className="btn-danger btn-small"
              onClick={() => handleDelete(entry.id)}
             >
              Delete
             </button>
            </div>
          ))}
         </div>
        </div>
       )
      ))}

      {filteredTimetable.length === 0 && (
       <div className="empty-state">
        <div className="empty-state-icon">📅</div>
        <h3>No timetable entries found</h3>
        <p>Add timetable entries using the form above</p>
       </div>
      )}
     </div>
    </div>

    <div className="info-card">
     <h4>📋 How it Works</h4>
     <ul>
      <li>Add timetable entries with department, semester, day, time, subject, faculty, and room</li>
      <li>Students can view their department and semester specific timetable</li>
      <li>Faculty can view their assigned classes and schedule</li>
      <li>Use filters to quickly find specific timetables</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}
