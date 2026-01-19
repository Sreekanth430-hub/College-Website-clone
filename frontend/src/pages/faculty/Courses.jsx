import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function FacultyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/faculty/courses/${user.id}`);
        setCourses(res.data);
      } catch (err) {
        console.log("Courses fetch error:", err);
        // Mock data for demo
        setCourses([
          { id: 1, course_name: "Database Management Systems", course_code: "CS301", semester: 3, credits: 4, students: 60 },
          { id: 2, course_name: "Computer Networks", course_code: "CS302", semester: 4, credits: 3, students: 55 },
          { id: 3, course_name: "Software Engineering", course_code: "CS401", semester: 5, credits: 4, students: 58 },
        ]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [user.id]);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Courses</h2>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Total Courses</h3>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Total Students</h3>
            <p className="text-2xl font-bold">
              {courses.reduce((a, b) => a + (b.students || 0), 0)}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Total Credits</h3>
            <p className="text-2xl font-bold">
              {courses.reduce((a, b) => a + (b.credits || 0), 0)}
            </p>
          </div>
        </div>

        {/* Courses Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full" border="2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Course Code</th>
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3 text-left">Semester</th>
                  <th className="p-3 text-left">Credits</th>
                  <th className="p-3 text-left">Students</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-t">
                    <td className="p-3 font-mono text-sm">{course.course_code}</td>
                    <td className="p-3 font-semibold">{course.course_name}</td>
                    <td className="p-3">Semester {course.semester}</td>
                    <td className="p-3">{course.credits}</td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                        {course.students} students
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">
                        View Students
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Enter Marks
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

