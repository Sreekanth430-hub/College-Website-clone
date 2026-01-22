import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
 const role = localStorage.getItem("role");
 const user = JSON.parse(localStorage.getItem("user") || "{}");
 const [facultyCourses, setFacultyCourses] = useState([]);

 useEffect(() => {
  const fetchCourses = async () => {
   if (role === "faculty" && user.id) {
    try {
     const res = await axios.get(`http://localhost:5050/api/faculty/courses/${user.id}`);
     setFacultyCourses(res.data);
    } catch (err) {
     console.log("Sidebar Course Fetch Error:", err);
    }
   }
  };
  fetchCourses();
 }, [role, user.id]);

 const menus = {
  student: [
   ["Dashboard", "/student"],
   ["Marks", "/student/marks"],
   ["Attendance", "/student/attendance"],
   ["Fees", "/student/fees"],
   ["Profile", "/student/profile"],
   ["Backlogs", "/student/backlogs"],
   ["Disciplinary", "/student/disciplinary"],
   ["Timetable", "/student/timetable"]
  ],
  faculty: [
   ["Dashboard", "/faculty"],
   ["Profile", "/faculty/profile"],
   ["Attendance", "/faculty/attendance"],
   ["Marks Entry", "/faculty/marks"],
   ["Timetable", "/faculty/timetable"],
   ["Analytics", "/faculty/analytics"]
  ],
  admin: [
   ["Dashboard", "/admin"],
   ["Students", "/admin/students"],
   ["Add Student", "/admin/students/add"],
   ["Add Faculty", "/admin/faculty/add"],
   ["Add Course", "/admin/courses/add"],
   ["Assign Courses", "/admin/courses/assign"],
   ["Department Students", "/admin/students/department"],
   ["Department Faculty", "/admin/faculty/department"],
   ["Timetable", "/admin/timetable"],
   ["Approval", "/admin/approval"],
   ["Reports", "/admin/reports"]
  ]
 };

 // For faculty, add assigned courses dynamically
 const getMenuItems = () => {
  const items = [...menus[role]];
  
  if (role === "faculty" && facultyCourses.length > 0) {
   items.push(["", ""]); // Separator
   items.push(["My Courses", "/faculty/courses"]);
   facultyCourses.forEach(course => {
    items.push([course.course_code, `/faculty/courses?course=${course.id}`]);
   });
  }
  
  return items;
 };

 return (
  <div className="sidebar">
   <h2>College ERP</h2>
   {getMenuItems().map(([name, path], index) => {
    if (!name && !path) {
     // Render separator
     return <div key={`separator-${index}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", margin: "10px 10px" }}></div>;
    }
    return <Link key={name} to={path}>{name}</Link>;
   })}
  </div>
 );
}
