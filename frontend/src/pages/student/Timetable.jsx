import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function StudentTimetable() {
 const [loading, setLoading] = useState(true);
 const [timetable, setTimetable] = useState([]);
 const student = JSON.parse(localStorage.getItem("user"));

 const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
 ];

 useEffect(() => {
  const loadTimetable = async () => {
   try {
    const res = await axios.get(
     `http://localhost:5050/api/timetable/student/${student.semester}`
    );
    setTimetable(res.data);
   } catch (err) {
    console.log("Error loading timetable:", err);

    // Demo fallback
    setTimetable([
     { id: 1, day: "Monday", time: "09:00-10:00", subject: "Data Structures", faculty: "Dr. Smith", room: "Room 101" },
     { id: 2, day: "Monday", time: "10:00-11:00", subject: "Algorithms", faculty: "Dr. Johnson", room: "Room 102" },
     { id: 3, day: "Tuesday", time: "09:00-10:00", subject: "Database Systems", faculty: "Dr. Williams", room: "Room 103" },
     { id: 4, day: "Wednesday", time: "11:00-12:00", subject: "Operating Systems", faculty: "Dr. Brown", room: "Room 101" },
     { id: 5, day: "Thursday", time: "14:00-15:00", subject: "Machine Learning", faculty: "Dr. Miller", room: "Lab A" },
    ]);
   } finally {
    setLoading(false);
   }
  };

  loadTimetable();
 }, [student.semester]);

 const grouped = days.reduce((acc, d) => {
  acc[d] = timetable.filter(t => t.day === d);
  return acc;
 }, {});

 return (
  <Layout>
   <div className="student-timetable-page">

    <div className="page-header">
     <h2>My Class Timetable</h2>
     <p>
      Semester {student.semester} • {student.department}
     </p>
    </div>

    {loading ? (
     <p>Loading...</p>
    ) : (
     <>
      {/* Weekly Cards */}
      <div className="timetable-week-view">
       {days.map(day => (
        grouped[day].length > 0 && (
         <div key={day} className="day-card">
          <div className="day-header">
           <h3>{day}</h3>
          </div>

          <div className="day-content">
           {grouped[day]
            .sort((a, b) => a.time.localeCompare(b.time))
            .map(entry => (
             <div key={entry.id} className="timetable-entry">
              <div className="entry-time">{entry.time}</div>

              <div className="entry-details">
               <div className="entry-subject">{entry.subject}</div>
               <div className="entry-faculty">{entry.faculty}</div>
              </div>

              <div className="entry-room">📍 {entry.room}</div>
             </div>
            ))}
          </div>
         </div>
        )
       ))}
      </div>

      {/* Table View */}
      <div className="timetable-list-view">
       <h3>Detailed Schedule</h3>

       <table className="marks-table">
        <thead>
         <tr>
          <th>Day</th>
          <th>Time</th>
          <th>Subject</th>
          <th>Faculty</th>
          <th>Room</th>
         </tr>
        </thead>

        <tbody>
         {timetable.map(t => (
          <tr key={t.id}>
           <td>{t.day}</td>
           <td>{t.time}</td>
           <td>{t.subject}</td>
           <td>{t.faculty}</td>
           <td>{t.room}</td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>

      {timetable.length === 0 && (
       <div className="empty-state">
        <h3>No Timetable Available</h3>
       </div>
      )}
     </>
    )}
   </div>
  </Layout>
 );
}
