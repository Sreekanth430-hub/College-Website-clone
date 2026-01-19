import { useEffect, useState } from "react";
import axios from "axios";

export default function Approval() {
 const [pending, setPending] = useState([]);

 const load = async () => {
  const res = await axios.get("http://localhost:5050/api/admin-approval/pending");
  setPending(res.data);
 };

 useEffect(() => { load(); }, []);

 const approve = async (id) => {
  await axios.post(`http://localhost:5050/api/admin-approval/approve/${id}`);
  load();
 };

 return (
  <div className="p-6">
   <h2 className="text-2xl font-bold mb-6">Pending Results Approval</h2>

   <table className="w-full bg-white shadow rounded">
    <thead>
     <tr className="bg-gray-100">
      <th>Student ID</th>
      <th>Subject</th>
      <th>Semester</th>
      <th>Total</th>
      <th>Grade</th>
      <th>Action</th>
     </tr>
    </thead>
    <tbody>
     {pending.map(p => (
      <tr key={p.id} className="border-t">
       <td className="p-3">{p.student_id}</td>
       <td>{p.subject}</td>
       <td>{p.semester}</td>
       <td>{p.total}</td>
       <td>{p.grade}</td>
       <td>
        <button
         onClick={() => approve(p.id)}
         className="bg-green-600 text-white px-3 py-1 rounded"
        >
         Approve
        </button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
}
