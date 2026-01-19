import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/fees/student/${user.id}`);
        setFees(res.data);
      } catch (err) {
        console.log("Fees fetch error:", err);
        // Mock data for demo
        setFees([
          { id: 1, type: "Tuition Fee", amount: 50000, status: "Paid", dueDate: "2024-01-15" },
          { id: 2, type: "Hostel Fee", amount: 30000, status: "Pending", dueDate: "2024-02-15" },
          { id: 3, type: "Library Fee", amount: 5000, status: "Paid", dueDate: "2024-01-20" },
          { id: 4, type: "Lab Fee", amount: 10000, status: "Paid", dueDate: "2024-01-25" },
        ]);
      }
      setLoading(false);
    };
    fetchFees();
  }, [user.id]);

  const totalPaid = fees.filter(f => f.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const totalPending = fees.filter(f => f.status === "Pending").reduce((a, b) => a + b.amount, 0);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Fees & Payment</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Total Paid</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Pending Amount</h3>
            <p className="text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-gray-500 text-sm">Total Fees</h3>
            <p className="text-2xl font-bold">₹{(totalPaid + totalPending).toLocaleString()}</p>
          </div>
        </div>

        {/* Fees Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full bg-white shadow rounded" border="2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Fee Type</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id} className="border-t">
                  <td className="p-3">{fee.type}</td>
                  <td className="p-3">₹{fee.amount.toLocaleString()}</td>
                  <td className="p-3">{fee.dueDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      fee.status === "Paid" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

