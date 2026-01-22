import { useState } from "react";
import axios from "axios";

export default function CollegeLogin() {
 const [form, setForm] = useState({
  email: "",
  password: "",
  role: "student",
 });

 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleLogin = async () => {
  console.log("Sending login:", form);

  try {
   const res = await axios.post(
    "http://localhost:5050/api/auth/login",
    form
   );

   console.log("LOGIN SUCCESS:", res.data);
   localStorage.setItem("token", res.data.token);
localStorage.setItem("role", form.role);
localStorage.setItem("user_id", res.data.user.id);
localStorage.setItem("user", JSON.stringify(res.data.user));


   window.location.href = `/${form.role}`;
  } catch (err) {
   console.error("LOGIN ERROR:", err.response?.data || err);
   alert("Invalid Login");
  }
 };

 return (
  <div className="login-page">
   <div className="login-card">
    <h2>College Login</h2>

    <select name="role" onChange={handleChange}>
     <option value="student">Student</option>
     <option value="faculty">Faculty</option>
     <option value="admin">Admin</option>
    </select>

    <input name="email" placeholder="Email" onChange={handleChange} />
    <input name="password" type="password" placeholder="Password" onChange={handleChange} />

    <button onClick={handleLogin}>Login</button>

    {/* Demo Credentials Section */}
    <div style={{ marginTop: "20px", textAlign: "center" }}>
     <p style={{ marginBottom: "10px", color: "#666", fontSize: "14px" }}>Demo Credentials</p>
     <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
      <div style={{ padding: "8px 12px", backgroundColor: "#fdeaea", borderRadius: "4px", fontSize: "12px" }}>
       <strong>Admin:</strong> admin@university.edu / admin123
      </div>
      <div style={{ padding: "8px 12px", backgroundColor: "#e8f4fc", borderRadius: "4px", fontSize: "12px" }}>
       <strong>Student:</strong> student@university.edu/ student123
      </div>
      <div style={{ padding: "8px 12px", backgroundColor: "#e8f8f0", borderRadius: "4px", fontSize: "12px" }}>
       <strong>Faculty:</strong> f1@srit / 123456
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

