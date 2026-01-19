import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Profile() {
  const [student, setStudent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/students/${user.id}`);
        setStudent(res.data);
      } catch (err) {
        console.log("Profile fetch error:", err);
        // Use local storage user data as fallback
        setStudent(user);
      }
    };
    fetchProfile();
  }, [user.id]);

  if (!student) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {student.name?.charAt(0) || "S"}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="text-gray-500">Student</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-sm">Roll Number</label>
              <p className="font-semibold">{student.roll || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <p className="font-semibold">{student.email}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Mobile</label>
              <p className="font-semibold">{student.mobile || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Department</label>
              <p className="font-semibold">{student.department || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Semester</label>
              <p className="font-semibold">{student.semester || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Admission Year</label>
              <p className="font-semibold">{student.admission_year || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Date of Birth</label>
              <p className="font-semibold">{student.dob || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Gender</label>
              <p className="font-semibold">{student.gender || "N/A"}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-bold mb-4">Parent Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-500 text-sm">Father's Name</label>
                <p className="font-semibold">{student.father_name || "N/A"}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Father's Mobile</label>
                <p className="font-semibold">{student.father_mobile || "N/A"}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Mother's Name</label>
                <p className="font-semibold">{student.mother_name || "N/A"}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Mother's Mobile</label>
                <p className="font-semibold">{student.mother_mobile || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <label className="text-gray-500 text-sm">Address</label>
            <p className="font-semibold">{student.address || "N/A"}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

