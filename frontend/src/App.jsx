import { Routes, Route } from "react-router-dom";
import Landing from "./pages/auth/Landing";
import CollegeLogin from "./pages/auth/CollegeLogin";

import StudentDashboard from "./pages/student/Dashboard";
import FacultyDashboard from "./pages/faculty/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Marks from "./pages/student/Marks";
import Backlogs from "./pages/student/Backlogs";
import Fees from "./pages/student/Fees";
import Profile from "./pages/student/Profile";
import Disciplinary from "./pages/student/Disciplinary";
import FacultyAttendance from "./pages/faculty/Attendance";
import FacultyMarks from "./pages/faculty/Marks";
import Analytics from "./pages/faculty/Analytics";
import FacultyProfile from "./pages/faculty/Profile";
import FacultyCourses from "./pages/faculty/Courses";
import Approval from "./pages/admin/Approval";
import Reports from "./pages/admin/Reports";
import Timetable from "./pages/admin/Timetable";
import FacultyTimetable from "./pages/faculty/Timetable";
import StudentTimetable from "./pages/student/Timetable";
import StudentAttendance from "./pages/student/Attendence";
import AddStudent from "./pages/admin/AddStudent";
import AddFaculty from "./pages/admin/AddFaculty";
import AddCourse from "./pages/admin/AddCourse";
import AssignCourse from "./pages/admin/AssignCourse";
import DepartmentStudents from "./pages/admin/DepartmentStudents";
import DepartmentFaculty from "./pages/admin/DepartmentFaculty";
import Students from "./pages/admin/Students";

export default function App() {
 return (
  <Routes>
   <Route path="/" element={<Landing />} />
   <Route path="/login" element={<CollegeLogin />} />

   {/* STUDENT ROUTES */}
   <Route path="/student" element={
    <ProtectedRoute role="student">
     <StudentDashboard />
    </ProtectedRoute>
   } />
   
   <Route path="/student/marks" element={
    <ProtectedRoute role="student">
     <Marks />
    </ProtectedRoute>
   } />
   
   <Route path="/student/backlogs" element={
    <ProtectedRoute role="student">
     <Backlogs />
    </ProtectedRoute>
   } />
   
   <Route path="/student/attendance" element={
    <ProtectedRoute role="student">
     <StudentAttendance />
    </ProtectedRoute>
   } />
   
   <Route path="/student/fees" element={
    <ProtectedRoute role="student">
     <Fees />
    </ProtectedRoute>
   } />
   
   <Route path="/student/profile" element={
    <ProtectedRoute role="student">
     <Profile />
    </ProtectedRoute>
   } />
   
   <Route path="/student/disciplinary" element={
    <ProtectedRoute role="student">
     <Disciplinary />
    </ProtectedRoute>
   } />
   
   <Route path="/student/timetable" element={
    <ProtectedRoute role="student">
     <StudentTimetable />
    </ProtectedRoute>
   } />

   {/* FACULTY ROUTES */}
   <Route path="/faculty" element={
    <ProtectedRoute role="faculty">
     <FacultyDashboard />
    </ProtectedRoute>
   } />
   
   <Route path="/faculty/attendance" element={
    <ProtectedRoute role="faculty">
     <FacultyAttendance />
    </ProtectedRoute>
   } />
   
   <Route path="/faculty/marks" element={
    <ProtectedRoute role="faculty">
     <FacultyMarks />
    </ProtectedRoute>
   } />
   
   <Route path="/faculty/analytics" element={
    <ProtectedRoute role="faculty">
     <Analytics />
    </ProtectedRoute>
   } />
   
   <Route path="/faculty/profile" element={
    <ProtectedRoute role="faculty">
     <FacultyProfile />
    </ProtectedRoute>
   } />
   
   <Route path="/faculty/courses" element={
    <ProtectedRoute role="faculty">
     <FacultyCourses />
    </ProtectedRoute>
   } />
   
   <Route path="/faculty/timetable" element={
    <ProtectedRoute role="faculty">
     <FacultyTimetable />
    </ProtectedRoute>
   } />

   {/* ADMIN ROUTES */}
   <Route path="/admin" element={
    <ProtectedRoute role="admin">
     <AdminDashboard />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/approval" element={
    <ProtectedRoute role="admin">
     <Approval />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/reports" element={
    <ProtectedRoute role="admin">
     <Reports />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/timetable" element={
    <ProtectedRoute role="admin">
     <Timetable />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/students" element={
    <ProtectedRoute role="admin">
     <Students />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/students/add" element={
    <ProtectedRoute role="admin">
     <AddStudent />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/faculty/add" element={
    <ProtectedRoute role="admin">
     <AddFaculty />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/courses/add" element={
    <ProtectedRoute role="admin">
     <AddCourse />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/courses/assign" element={
    <ProtectedRoute role="admin">
     <AssignCourse />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/students/department" element={
    <ProtectedRoute role="admin">
     <DepartmentStudents />
    </ProtectedRoute>
   } />
   
   <Route path="/admin/faculty/department" element={
    <ProtectedRoute role="admin">
     <DepartmentFaculty />
    </ProtectedRoute>
   } />
  </Routes>
 );
}
