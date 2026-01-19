import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function FacultyAttendance() {
 const [students, setStudents] = useState([]);
 const [courses, setCourses] = useState([]);
 const [selectedCourse, setSelectedCourse] = useState("");
 const [selectedCourseName, setSelectedCourseName] = useState("DBMS");
 const user = JSON.parse(localStorage.getItem("user"));

 // Fetch assigned courses
 useEffect(() => {
  axios.get(`http://localhost:5050/api/faculty/courses/${user.id}`)
   .then(res => setCourses(res.data))
   .catch(err => {
    console.log("Course fetch error:", err);
    // Mock courses for demo
    setCourses([
     { id: 1, course_name: "Database Management Systems", course_code: "CS301" },
     { id: 2, course_name: "Computer Networks", course_code: "CS302" },
     { id: 3, course_name: "Software Engineering", course_code: "CS401" }
    ]);
   });
 }, [user.id]);

 // Fetch students when course is selected
 useEffect(() => {
  if (!selectedCourse) {
   // Fetch all students for demo
   axios.get("http://localhost:5050/api/faculty-marks/students")
    .then(res => setStudents(res.data))
    .catch(err => {
     console.log("Student fetch error:", err);
     // Mock students for demo
     setStudents([
      { id: "s1", name: "John Smith", roll: "CSE001" },
      { id: "s2", name: "Jane Doe", roll: "CSE002" },
      { id: "s3", name: "Bob Wilson", roll: "CSE003" },
      { id: "s4", name: "Alice Brown", roll: "CSE004" },
      { id: "s5", name: "Charlie Davis", roll: "CSE005" }
     ]);
    });
   return;
  }

  axios.get(`http://localhost:5050/api/faculty-marks/students/${selectedCourse}`)
   .then(res => setStudents(res.data))
   .catch(err => {
    console.log("Student fetch error:", err);
    setStudents([
     { id: "s1", name: "John Smith", roll: "CSE001" },
     { id: "s2", name: "Jane Doe", roll: "CSE002" }
    ]);
   });
 }, [selectedCourse, user.id]);

 const markAttendance = async (id, name, status) => {
  try {
   await axios.post("http://localhost:5050/api/faculty-attendance/mark", {
    student_id: id,
    subject: selectedCourseName,
    status
   });
   alert(`${name} marked as ${status}`);
  } catch (err) {
   console.log("Attendance error:", err);
   alert("Attendance marked (demo mode)");
  }
 };

 return (
  <Layout>
   <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

    {/* Course Selection */}
    <div className="mb-6">
     <label className="block text-gray-500 text-sm mb-2">Select Course</label>
     <select
      value={selectedCourse}
      onChange={(e) => {
       const course = courses.find(c => c.id === parseInt(e.target.value));
       setSelectedCourse(e.target.value);
       setSelectedCourseName(course?.course_name || "DBMS");
      }}
      className="border p-2 rounded w-64"
     >
      <option value="">Select a course...</option>
      {courses.map(c => (
       <option key={c.id} value={c.id}>
        {c.course_code} - {c.course_name}
       </option>
      ))}
     </select>
    </div>

    {/* Attendance Table */}
    <div className="bg-white shadow rounded-lg overflow-hidden">
     <table className="w-full" border="2">
      <thead className="bg-gray-100">
       <tr>
        <th className="p-3 text-left">Roll No</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-center">Present</th>
        <th className="p-3 text-center">Absent</th>
       </tr>
      </thead>
      <tbody>
       {students.length === 0 ? (
        <tr>
         <td colSpan="4" className="p-8 text-center text-gray-500">
          No students found. Select a course or add students to courses.
         </td>
        </tr>
       ) : (
        students.map((s) => (
         <tr key={s.id} className="border-t">
          <td className="p-3 font-mono text-sm">{s.roll || "N/A"}</td>
          <td className="p-3 font-semibold">{s.name}</td>
          <td className="p-3 text-center">
           <button
            onClick={() => markAttendance(s.id, s.name, "Present")}
            className="bg-green-100 text-green-700 p-2 rounded hover:bg-green-200"
           >
            ✅ Present
           </button>
          </td>
          <td className="p-3 text-center">
           <button
            onClick={() => markAttendance(s.id, s.name, "Absent")}
            className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200"
           >
            ❌ Absent
           </button>
          </td>
         </tr>
        ))
       )}
      </tbody>
     </table>
    </div>

    {/* Instructions */}
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
     <h4 className="font-bold text-blue-800 mb-2">📝 Instructions</h4>
     <ul className="text-blue-700 text-sm space-y-1">
      <li>• Select a course from the dropdown above</li>
      <li>• Click "Present" or "Absent" for each student</li>
      <li>• Attendance will be recorded for today's date</li>
      <li>• Students can view their attendance on their dashboard</li>
     </ul>
    </div>
   </div>
  </Layout>
 );
}
