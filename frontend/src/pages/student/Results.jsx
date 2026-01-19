import { useEffect, useState } from "react";
import axios from "axios";

export default function Results() {
 const user = JSON.parse(localStorage.getItem("user"));
 const [results, setResults] = useState([]);

 useEffect(() => {
  const load = async () => {
   const res = await axios.get(
    `http://localhost:5050/api/results/sgpa/${user.id}/6`
   );
   setResults(res.data);
  };
  load();
 }, []);

 return (
  <div className="p-6">
   <h2 className="text-2xl font-bold mb-4">Semester Result</h2>
   <h3 className="mb-4">SGPA: {results.sgpa}</h3>
   <a
 href={`http://localhost:5050/api/pdf/marksheet/${user.id}/6`}
 className="bg-blue-600 text-white px-4 py-2 rounded"
>
 Download Semester Marksheet
</a>

  </div>
 );
}
