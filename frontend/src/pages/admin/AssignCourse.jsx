import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function AssignCourses() {
 const [faculty, setFaculty] = useState([]);
 const [courses, setCourses] = useState([]);
 const [facultyId, setFacultyId] = useState("");
 const [courseId, setCourseId] = useState("");

 useEffect(() => {
  axios.get("http://localhost:5050/api/admin-reports/faculty")
   .then(res => setFaculty(res.data));

  axios.get("http://localhost:5050/api/admin-reports/courses")
   .then(res => setCourses(res.data));
 }, []);

 const assign = async () => {
  try {
   console.log("Assigning:", facultyId, courseId);

   const res = await axios.post(
    "http://localhost:5050/api/admin-courses/assign",
    {
     faculty_id: facultyId,
     course_id: courseId
    }
   );

   console.log("ASSIGN RESPONSE:", res.data);
   alert("Course Assigned Successfully 👨‍🏫");

  } catch (err) {
   console.log("ASSIGN ERROR:", err.response?.data || err);
   alert("Assignment Failed ❌");
  }
 };

 return (
  <Layout>
   <h2 className="text-2xl font-bold mb-6">Assign Courses</h2>

   <div className="bg-white p-6 shadow rounded space-y-4">

    <select onChange={e => setFacultyId(e.target.value)} className="border p-2 w-full">
     <option>Select Faculty</option>
     {faculty.map(f => (
      <option key={f.id} value={f.id}>
       {f.name} ({f.department})
      </option>
     ))}
    </select>

    <select onChange={e => setCourseId(e.target.value)} className="border p-2 w-full">
     <option>Select Course</option>
     {courses.map(c => (
      <option key={c.id} value={c.id}>
       {c.course_name} - Sem {c.semester}
      </option>
     ))}
    </select>

    <button onClick={assign} className="bg-black text-white px-4 py-2 rounded">
     Assign Course
    </button>

   </div>
  </Layout>
 );
}
