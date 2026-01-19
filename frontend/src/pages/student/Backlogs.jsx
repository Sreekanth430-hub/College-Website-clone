import { useEffect, useState } from "react";
import axios from "axios";

export default function Backlogs() {
 const [backlogs, setBacklogs] = useState([]);
 const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  axios
   .get(`http://localhost:5050/api/backlogs/student/${user.id}`)
   .then(res => setBacklogs(res.data))
   .catch(err => console.log(err));
 }, []);

 return (
  <div className="p-6">
   <h2 className="text-2xl font-bold mb-6">Backlog Subjects</h2>

   {backlogs.length === 0 ? (
    <p className="text-green-600 font-semibold">No Backlogs 🎉</p>
   ) : (
    <table className="w-full bg-white shadow rounded">
     <thead>
      <tr className="bg-gray-100">
       <th className="p-3 text-left">Subject</th>
       <th className="p-3 text-left">Semester</th>
       <th className="p-3 text-left">Status</th>
      </tr>
     </thead>
     <tbody>
      {backlogs.map((b, i) => (
       <tr key={i} className="border-t">
        <td className="p-3">{b.subject}</td>
        <td className="p-3">{b.semester}</td>
        <td className="p-3 text-red-600">{b.status}</td>
       </tr>
      ))}
     </tbody>
    </table>
   )}
  </div>
 );
}
