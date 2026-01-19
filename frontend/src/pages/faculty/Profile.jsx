import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function FacultyProfile() {
  const [faculty, setFaculty] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/faculty/${user.id}`);
        setFaculty(res.data);
      } catch (err) {
        console.log("Profile fetch error:", err);
        // Use local storage user data as fallback
        setFaculty(user);
      }
    };
    fetchProfile();
  }, [user.id]);

  if (!faculty) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {faculty.name?.charAt(0) || "F"}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold">{faculty.name}</h3>
              <p className="text-gray-500">Faculty Member</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-sm">Employee ID</label>
              <p className="font-semibold">{faculty.employee_id || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <p className="font-semibold">{faculty.email}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Mobile</label>
              <p className="font-semibold">{faculty.mobile || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Department</label>
              <p className="font-semibold">{faculty.department || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Date of Birth</label>
              <p className="font-semibold">{faculty.dob || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Gender</label>
              <p className="font-semibold">{faculty.gender || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Qualification</label>
              <p className="font-semibold">{faculty.qualification || "N/A"}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Experience</label>
              <p className="font-semibold">{faculty.experience ? `${faculty.experience} years` : "N/A"}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <label className="text-gray-500 text-sm">Address</label>
            <p className="font-semibold">{faculty.address || "N/A"}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

