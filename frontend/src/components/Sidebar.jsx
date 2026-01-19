import { Link } from "react-router-dom";

export default function Sidebar() {
 const role = localStorage.getItem("role");

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
   ["Courses", "/faculty/courses"],
   ["Marks Entry", "/faculty/marks"],
   ["Attendance", "/faculty/attendance"],
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

 return (
  <div className="sidebar">
   <h2>College ERP</h2>
   {menus[role]?.map(([name, path]) => (
    <Link key={name} to={path}>{name}</Link>
   ))}
  </div>
 );
}
