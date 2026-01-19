import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Disciplinary() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/disciplinary/student/${user.id}`);
        setRecords(res.data);
      } catch (err) {
        console.log("Disciplinary fetch error:", err);
        // Mock data for demo
        setRecords([]);
      }
      setLoading(false);
    };
    fetchRecords();
  }, [user.id]);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Disciplinary Records</h2>

        {loading ? (
          <p>Loading...</p>
        ) : records.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Clean Record</h3>
            <p className="text-gray-500">No disciplinary records found. Keep up the good work!</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Incident Type</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Action Taken</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{record.date}</td>
                    <td className="p-3">
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                        {record.incident_type}
                      </span>
                    </td>
                    <td className="p-3">{record.description}</td>
                    <td className="p-3">{record.action_taken}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        record.status === "Resolved" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2">📚 College Guidelines</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Maintain at least 75% attendance in all subjects</li>
            <li>• Submit assignments before the deadline</li>
            <li>• Follow the dress code and college timings</li>
            <li>• Respect faculty and fellow students</li>
            <li>• Maintain academic integrity</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

