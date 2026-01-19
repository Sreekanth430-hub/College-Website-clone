import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/admin-manage/students");
        setStudents(res.data);
      } catch (err) {
        console.log("Students fetch error:", err);
        // Mock data for demo
        setStudents([
          { id: 1, name: "John Smith", roll: "CSE001", email: "john@cse.edu", mobile: "9876543210", department: "CSE", semester: 6 },
          { id: 2, name: "Jane Doe", roll: "CSE002", email: "jane@cse.edu", mobile: "9876543211", department: "CSE", semester: 6 },
          { id: 3, name: "Bob Wilson", roll: "ECE001", email: "bob@ece.edu", mobile: "9876543212", department: "ECE", semester: 4 },
          { id: 4, name: "Alice Brown", roll: "ECE002", email: "alice@ece.edu", mobile: "9876543213", department: "ECE", semester: 4 },
          { id: 5, name: "Charlie Davis", roll: "MECH001", email: "charlie@mech.edu", mobile: "9876543214", department: "MECH", semester: 2 },
        ]);
      }
      setLoading(false);
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.roll?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Students</h2>
          <input
            type="text"
            placeholder="Search students..."
            className="border p-2 rounded w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Total Students</h3>
            <p className="text-2xl font-bold">{students.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">CSE</h3>
            <p className="text-2xl font-bold">{students.filter(s => s.department === "CSE").length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">ECE</h3>
            <p className="text-2xl font-bold">{students.filter(s => s.department === "ECE").length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">MECH</h3>
            <p className="text-2xl font-bold">{students.filter(s => s.department === "MECH").length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">  
            <h3 className="text-gray-500 text-sm">CIVIL</h3>
            <p className="text-2xl font-bold">{students.filter(s => s.department === "CIVIL").length}</p>
          </div>
        </div>

        {/* Students Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full" border="2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Roll No</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Semester</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">{student.roll}</td>
                    <td className="p-3 font-semibold">{student.name}</td>
                    <td className="p-3 text-sm">{student.email}</td>
                    <td className="p-3 text-sm">{student.mobile}</td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                        {student.department}
                      </span>
                    </td>
                    <td className="p-3">Sem {student.semester}</td>
                    <td className="p-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm mr-3">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No students found
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

