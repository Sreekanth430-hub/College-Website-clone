import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

export default function FacultyTimetable() {
 const [loading, setLoading] = useState(true);
 const [timetable, setTimetable] = useState([]);
 const faculty = JSON.parse(localStorage.getItem("user"));

 const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

 useEffect(() => {
  const loadTimetable = async () => {
   try {
    const res = await axios.get(
     `http://localhost:5050/api/timetable/faculty/${faculty.email}`
    );
    setTimetable(res.data);
   } catch (err) {
    console.log("Error loading timetable:", err);
    // Mock data for demo
    setTimetable([
     { id: 1, day: "Monday", time: "09:00-10:00", subject: "Data Structures", department: "CSE", semester: 3, room: "Room 101" },
     { id: 2, day: "Monday", time: "10:00-11:00", subject: "Algorithms", department: "CSE", semester: 4, room: "Room 102" },
     { id: 3, day: "Tuesday", time: "09:00-10:00", subject: "Database Systems", department: "CSE", semester: 3, room: "Room 103" },
     { id: 4, day: "Tuesday", time: "11:00-12:00", subject: "Operating Systems", department: "CSE", semester: 4, room: "Room 101" },
     { id: 5, day: "Wednesday", time: "10:00-11:00", subject: "Computer Networks", department: "ECE", semester: 5, room: "Room 201" },
     { id: 6, day: "Thursday", time: "09:00-10:00", subject: "Data Structures", department: "CSE", semester: 3, room: "Lab A" },
     { id: 7, day: "Friday", time: "10:00-11:00", subject: "Algorithms", department: "CSE", semester: 4, room: "Room 105" },
    ]);
   } finally {
    setLoading(false);
   }
  };
  loadTimetable();
 }, [faculty.email]);

 const grouped = {};
 days.forEach(day => {
  grouped[day] = timetable.filter(t => t.day === day);
 });

 const totalClasses = timetable.length;
 const uniqueSubjects = [...new Set(timetable.map(t => t.subject))].length;
 const uniqueDepts = [...new Set(timetable.map(t => t.department))].length;

 if (loading) {
  return (
   <Layout>
    <div className="loading-container">
     <div className="loading-spinner"></div>
     <p className="loading-text">Loading timetable...</p>
    </div>
   </Layout>
  );
 }

 return (
  <Layout>
   <div className="faculty-timetable-page">
    {/* Welcome Header */}
    <div className="dashboard-welcome">
     <h2>My Timetable 👨‍🏫</h2>
     <p>{faculty.name} • {faculty.department} Department</p>
    </div>

    {/* Quick Stats */}
    <div className="stats-row">
     <div className="stat-card">
      <div className="stat-label">Total Classes</div>
      <div className="stat-value blue">{totalClasses}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Subjects</div>
      <div className="stat-value green">{uniqueSubjects}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Departments</div>
      <div className="stat-value purple">{uniqueDepts}</div>
     </div>
     <div className="stat-card">
      <div className="stat-label">Working Days</div>
      <div className="stat-value">{Object.values(grouped).filter(arr => arr.length > 0).length}</div>
     </div>
    </div>

    {/* Weekly View */}
    <div className="dashboard-section">
     <h3 className="dashboard-section-title">Weekly Schedule</h3>
     <div className="timetable-week-view">
      {days.map(day =>
       grouped[day]?.length > 0 && (
        <div key={day} className="day-card">
         <div className="day-header">
          <h3>{day}</h3>
          <span className="day-count">{grouped[day].length} classes</span>
         </div>
         <div className="day-content">
          {grouped[day]
           .sort((a, b) => a.time.localeCompare(b.time))
           .map(entry => (
            <div key={entry.id} className="timetable-entry faculty-entry">
             <div className="entry-time">{entry.time}</div>
             <div className="entry-details">
              <span className="entry-subject">{entry.subject}</span>
              <span className="entry-faculty">{entry.department} Sem {entry.semester}</span>
             </div>
             <div className="entry-room">
              <span className="room-icon">📍</span>
              {entry.room}
             </div>
            </div>
          ))}
         </div>
        </div>
       )
      )}
     </div>
    </div>

    {/* Full Schedule Table */}
    <div className="dashboard-card">
     <div className="dashboard-card-header">
      <h3><span>📋</span> Full Schedule</h3>
     </div>
     <div className="table-container">
      <table className="marks-table">
       <thead>
        <tr>
         <th>Day</th>
         <th>Time</th>
         <th>Subject</th>
         <th>Class</th>
         <th>Room</th>
        </tr>
       </thead>
       <tbody>
        {timetable
         .sort((a, b) => {
          const dayCompare = days.indexOf(a.day) - days.indexOf(b.day);
          if (dayCompare !== 0) return dayCompare;
          return a.time.localeCompare(b.time);
         })
         .map(t => (
          <tr key={t.id}>
           <td className="font-semibold">{t.day}</td>
           <td><span className="time-badge">{t.time}</span></td>
           <td className="font-semibold">{t.subject}</td>
           <td><span className="class-badge">{t.department} Sem {t.semester}</span></td>
           <td>{t.room}</td>
          </tr>
         ))}
       </tbody>
      </table>
     </div>

     {timetable.length === 0 && (
      <div className="empty-state">
       <div className="empty-state-icon">📅</div>
       <h3>No Timetable Assigned</h3>
       <p>You don't have any classes assigned yet.</p>
      </div>
     )}
    </div>
   </div>
  </Layout>
 );
}

