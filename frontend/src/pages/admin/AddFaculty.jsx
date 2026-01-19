import { useState } from "react";
import axios from "axios";

export default function AddFaculty({ onClose, onSuccess }) {
 const [loading, setLoading] = useState(false);
 const [errors, setErrors] = useState({});
 
 const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  mobile: "",
  department: "",
  dob: "",
  gender: "",
  address: "",
  qualification: "",
  experience: ""
 });

 const validateForm = () => {
  const newErrors = {};
  
  if (!form.name.trim()) {
   newErrors.name = "Faculty Name is required";
  }
  
  if (!form.email.trim()) {
   newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
   newErrors.email = "Please enter a valid email";
  }
  
  if (!form.password || form.password.length < 6) {
   newErrors.password = "Password must be at least 6 characters";
  }
  
  if (!form.mobile.trim()) {
   newErrors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(form.mobile)) {
   newErrors.mobile = "Please enter a valid 10-digit mobile number";
  }
  
  if (!form.department) {
   newErrors.department = "Please select a department";
  }
  
  if (!form.dob) {
   newErrors.dob = "Date of Birth is required";
  }
  
  if (!form.gender) {
   newErrors.gender = "Please select gender";
  }
  
  if (!form.qualification.trim()) {
   newErrors.qualification = "Qualification is required";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
 };

 const submit = async () => {
  if (!validateForm()) {
   return;
  }
  
  setLoading(true);
  try {
   await axios.post("http://localhost:5050/api/admin-manage/faculty/add", form);
   alert("Faculty Added Successfully 👨‍🏫");
   if (onSuccess) onSuccess();
   onClose();
  } catch (err) {
   console.log("Error:", err.response?.data || err.message);
   const errorMsg = err.response?.data?.message || err.response?.data?.error?.message || "Failed to add faculty";
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
  <div className="modal-backdrop">
   <div className="modal-card modal-medium">
    <div className="modal-header">
     <h2>Add New Faculty</h2>
     <span className="modal-close" onClick={onClose}>×</span>
    </div>

    <div className="modal-body">
     {/* Basic Information */}
     <div className="form-section">
      <h3 className="section-title">Personal Information</h3>
      <div className="modal-grid">
       
       <div className="form-group">
        <label>Full Name *</label>
        <input 
         type="text" 
         name="name"
         placeholder="Enter faculty name"
         value={form.name}
         onChange={handleChange}
         className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
       </div>

       <div className="form-group">
        <label>Email Address *</label>
        <input 
         type="email" 
         name="email"
         placeholder="Enter email address"
         value={form.email}
         onChange={handleChange}
         className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
       </div>

       <div className="form-group">
        <label>Password *</label>
        <input 
         type="password" 
         name="password"
         placeholder="Enter password (min 6 chars)"
         value={form.password}
         onChange={handleChange}
         className={errors.password ? "error" : ""}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
       </div>

       <div className="form-group">
        <label>Mobile Number *</label>
        <input 
         type="tel" 
         name="mobile"
         placeholder="10-digit mobile number"
         maxLength="10"
         value={form.mobile}
         onChange={handleChange}
         className={errors.mobile ? "error" : ""}
        />
        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
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
         <option value="CSE">CSE - Computer Science</option>
         <option value="ECE">ECE - Electronics & Communication</option>
         <option value="EEE">EEE - Electrical & Electronics</option>
         <option value="MECH">MECH - Mechanical</option>
         <option value="CIVIL">CIVIL - Civil Engineering</option>
        </select>
        {errors.department && <span className="error-text">{errors.department}</span>}
       </div>

       <div className="form-group">
        <label>Date of Birth *</label>
        <input 
         type="date" 
         name="dob"
         value={form.dob}
         onChange={handleChange}
         className={errors.dob ? "error" : ""}
        />
        {errors.dob && <span className="error-text">{errors.dob}</span>}
       </div>

       <div className="form-group">
        <label>Gender *</label>
        <select 
         name="gender"
         value={form.gender}
         onChange={handleChange}
         className={errors.gender ? "error" : ""}
        >
         <option value="">Select Gender</option>
         <option value="Male">Male</option>
         <option value="Female">Female</option>
         <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="error-text">{errors.gender}</span>}
       </div>

       <div className="form-group full-width">
        <label>Address</label>
        <input 
         type="text" 
         name="address"
         placeholder="Enter full address"
         value={form.address}
         onChange={handleChange}
        />
       </div>

      </div>
     </div>

     {/* Professional Information */}
     <div className="form-section">
      <h3 className="section-title">Professional Information</h3>
      <div className="modal-grid">
       
       <div className="form-group">
        <label>Qualification *</label>
        <input 
         type="text" 
         name="qualification"
         placeholder="e.g., M.Tech, Ph.D"
         value={form.qualification}
         onChange={handleChange}
         className={errors.qualification ? "error" : ""}
        />
        {errors.qualification && <span className="error-text">{errors.qualification}</span>}
       </div>

       <div className="form-group">
        <label>Experience (Years)</label>
        <input 
         type="number" 
         name="experience"
         placeholder="e.g., 5"
         min="0"
         max="50"
         value={form.experience}
         onChange={handleChange}
        />
       </div>

      </div>
     </div>

    </div>

    <div className="modal-footer">
     <button 
      type="button" 
      className="btn-secondary" 
      onClick={onClose}
      disabled={loading}
     >
      Cancel
     </button>
     <button 
      type="button" 
      className="btn-primary btn-loading" 
      onClick={submit}
      disabled={loading}
     >
      {loading ? (
       <>
        <span className="spinner"></span>
        Adding...
       </>
      ) : (
       "Add Faculty"
      )}
     </button>
    </div>
   </div>
  </div>
 );
}
