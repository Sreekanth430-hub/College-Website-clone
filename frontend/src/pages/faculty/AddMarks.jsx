import { useEffect, useState } from "react";
import axios from "axios";

export default function AddMarks() {
 const user = JSON.parse(localStorage.getItem("user"));

 const [courses, setCourses] = useState([]);
 const [students, setStudents] = useState([]);

 const [form, setForm] = useState({
  course_id: "",
  student_id: "",
  internal: "",
  external: "",
  semester: "",
  credits: ""
 });

 useEffect(() => {
  axios.get(`http://localhost:5050/api/faculty/courses/${user.id}`)
   .then(res => setCourses(res.data));
 }, []);

 const loadStudents = async (course_id) => {
  setForm({ ...form, course_id });

  const res = await axios.get(
   `http://localhost:5050/api/faculty/students/${course_id}`
  );

  setStudents(res.data);
 };

 const submit = async () => {
  await axios.post("http://localhost:5050/api/faculty-marks/add", {
   ...form
  });

  alert("Marks Submitted ");
 };

 return (
  <div className="dept-page">
   <h2 className="dept-title">Enter Student Marks</h2>

   <select onChange={e => loadStudents(e.target.value)}>
    <option>Select Course</option>
    {courses.map(c => (
     <option key={c.id} value={c.id}>
      {c.course_name}
     </option>
    ))}
   </select>

   <select onChange={e => setForm({ ...form, student_id: e.target.value })}>
    <option>Select Student</option>
    {students.map(s => (
     <option key={s.id} value={s.id}>
      {s.name}
     </option>
    ))}
   </select>

   <input placeholder="Internal Marks" onChange={e => setForm({ ...form, internal: e.target.value })} />
   <input placeholder="External Marks" onChange={e => setForm({ ...form, external: e.target.value })} />
   <input placeholder="Semester" onChange={e => setForm({ ...form, semester: e.target.value })} />

   <button onClick={submit} className="btn-primary">Submit Marks</button>
  </div>
 );
}
