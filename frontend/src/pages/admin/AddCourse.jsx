import { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function AddCourse({ onSuccess }) {
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState({});
 const [success, setSuccess] = useState("");
 
 const [form, setForm] = useState({
  course_name: "",
  course_code: "",
  department: "",
  semester: "",
  credits: ""
 });

 const departments = [
  { value: "CSE", label: "CSE - Computer Science Engineering" },
  { value: "ECE", label: "ECE - Electronics & Communication Engineering" },
  { value: "EEE", label: "EEE - Electrical & Electronics Engineering" },
  { value: "MECH", label: "MECH - Mechanical Engineering" },
  { value: "CIVIL", label: "CIVIL - Civil Engineering" }
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

 const validateForm = () => {
  const newErrors = {};
  
  if (!form.course_name.trim()) {
   newErrors.course_name = "Course Name is required";
  }
  
  if (!form.course_code.trim()) {
   newErrors.course_code = "Course Code is required";
  } else if (!/^[A-Z]{2,4}\d{3,4}$/.test(form.course_code)) {
   newErrors.course_code = "Format: CS101 or CSE3015";
  }
  
  if (!form.department) {
   newErrors.department = "Please select a department";
  }
  
  if (!form.semester) {
   newErrors.semester = "Please select a semester";
  }
  
  if (!form.credits) {
   newErrors.credits = "Credits are required";
  } else if (isNaN(form.credits) || form.credits < 1 || form.credits > 6) {
   newErrors.credits = "Credits must be between 1 and 6";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
 };

 const submit = async () => {
  if (!validateForm()) {
   return;
  }
  
  setLoading(true);
  setSuccess("");
  try {
   await axios.post("http://localhost:5050/api/admin-courses/add", form);
   setSuccess("Course Added Successfully 📚");
   if (onSuccess) onSuccess();
   
   // Reset form
   setForm({
    course_name: "",
    course_code: "",
    department: "",
    semester: "",
    credits: ""
   });
   
   // Clear success message after 3 seconds
   setTimeout(() => setSuccess(""), 3000);
  } catch (err) {
   console.log("Error:", err.response?.data || err.message);
   const errorMsg = err.response?.data?.message || err.response?.data?.error?.message || "Failed to add course";
   alert(`Insert Failed: ${errorMsg} ❌`);
  } finally {
   setLoading(false);
  }
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: value }));
  if (errors[name]) {
   setErrors(prev => ({ ...prev, [name]: "" }));
  }
 };

 return (
  <Layout>
   <div className="add-course-container">
    <div className="page-header">
     <h2>Add New Course</h2>
     <p className="page-subtitle">Create a new course and automatically enroll eligible students</p>
    </div>

    {success && (
     <div className="alert alert-success">
      {success}
     </div>
    )}

    <div className="form-card">
     <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
      
      <div className="form-section">
       <h3 className="section-title">Course Details</h3>
       
       <div className="form-grid">
        <div className="form-group">
         <label>Course Name *</label>
         <input 
          type="text" 
          name="course_name"
          placeholder="e.g., Data Structures and Algorithms"
          value={form.course_name}
          onChange={handleChange}
          className={errors.course_name ? "error" : ""}
         />
         {errors.course_name && <span className="error-text">{errors.course_name}</span>}
        </div>

        <div className="form-group">
         <label>Course Code *</label>
         <input 
          type="text" 
          name="course_code"
          placeholder="e.g., CS301"
          value={form.course_code}
          onChange={handleChange}
          className={errors.course_code ? "error" : ""}
         />
         {errors.course_code && <span className="error-text">{errors.course_code}</span>}
        </div>

        <div className="form-group">
         <label>Department *</label>
         <select 
          name="department"
          value={form.department}
          onChange={handleChange}
          className={errors.department ? "error" : ""}
         >
          <option value="">Select Department</option>
          {departments.map(dept => (
           <option key={dept.value} value={dept.value}>{dept.label}</option>
          ))}
         </select>
         {errors.department && <span className="error-text">{errors.department}</span>}
        </div>

        <div className="form-group">
         <label>Semester *</label>
         <select 
          name="semester"
          value={form.semester}
          onChange={handleChange}
          className={errors.semester ? "error" : ""}
         >
          <option value="">Select Semester</option>
          {semesters.map(sem => (
           <option key={sem.value} value={sem.value}>{sem.label}</option>
          ))}
         </select>
         {errors.semester && <span className="error-text">{errors.semester}</span>}
        </div>

        <div className="form-group">
         <label>Credits *</label>
         <select 
          name="credits"
          value={form.credits}
          onChange={handleChange}
          className={errors.credits ? "error" : ""}
         >
          <option value="">Select Credits</option>
          <option value="1">1 Credit</option>
          <option value="2">2 Credits</option>
          <option value="3">3 Credits</option>
          <option value="4">4 Credits</option>
          <option value="5">5 Credits</option>
          <option value="6">6 Credits</option>
         </select>
         {errors.credits && <span className="error-text">{errors.credits}</span>}
        </div>

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
          Adding Course...
         </>
        ) : (
         "Add Course"
        )}
       </button>
      </div>

     </form>
    </div>

    <div className="info-card">
     <h4>ℹ️ Information</h4>
     <ul>
      <li>When you add a course, students from the selected department and semester will be automatically enrolled.</li>
      <li>Course code should follow the format: 2-4 letters followed by 3-4 digits (e.g., CS301, CSE3015).</li>
      <li>Credits determine the weight of the course in the student's CGPA calculation.</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}
