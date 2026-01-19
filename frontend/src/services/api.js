import axios from "axios";

// Create axios instance with default configuration
const api = axios.create({
 baseURL: "http://localhost:5050/api",
 timeout: 30000,
 headers: {
  "Content-Type": "application/json"
 }
});

// Request interceptor to add auth token
api.interceptors.request.use(
 (config) => {
  const token = localStorage.getItem("token");
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

// Response interceptor for error handling
api.interceptors.response.use(
 (response) => response,
 (error) => {
  // Handle specific error cases
  if (error.response) {
   // Server responded with error
   const { status, data } = error.response;
   
   if (status === 401) {
    // Unauthorized - redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
   } else if (status === 403) {
    console.error("Access forbidden");
   } else if (status === 404) {
    console.error("Resource not found");
   } else if (status >= 500) {
    console.error("Server error:", data.message || "Internal Server Error");
   }
  } else if (error.request) {
   // Request made but no response
   console.error("Network error - please check your connection");
  }
  
  return Promise.reject(error);
 }
);

// API endpoints
export const adminAPI = {
 // Students
 getStudents: () => api.get("/admin-manage/students"),
 getStudent: (id) => api.get(`/admin-manage/students/${id}`),
 addStudent: (data) => api.post("/admin-manage/students/add", data),
 updateStudent: (id, data) => api.put(`/admin-manage/students/${id}`, data),
 deleteStudent: (id) => api.delete(`/admin-manage/students/${id}`),
 getStudentsByDept: (dept) => api.get(`/admin-manage/students/department/${dept}`),
 
 // Faculty
 getFaculty: () => api.get("/admin-manage/faculty"),
 getFacultyMember: (id) => api.get(`/admin-manage/faculty/${id}`),
 addFaculty: (data) => api.post("/admin-manage/faculty/add", data),
 updateFaculty: (id, data) => api.put(`/admin-manage/faculty/${id}`, data),
 deleteFaculty: (id) => api.delete(`/admin-manage/faculty/${id}`),
 getFacultyByDept: (dept) => api.get(`/admin-manage/faculty/department/${dept}`),
 
 // Courses
 getCourses: () => api.get("/admin-courses"),
 getCourse: (id) => api.get(`/admin-courses/${id}`),
 addCourse: (data) => api.post("/admin-courses/add", data),
 updateCourse: (id, data) => api.put(`/admin-courses/${id}`, data),
 deleteCourse: (id) => api.delete(`/admin-courses/${id}`),
 getCoursesByDept: (dept) => api.get(`/admin-courses/department/${dept}`),
 getAllFaculty: () => api.get("/admin-courses/faculty/all"),
 assignCourse: (data) => api.post("/admin-courses/assign", data),
 getFacultyCourses: (facultyId) => api.get(`/admin-courses/faculty/courses/${facultyId}`),
 removeFacultyAssignment: (id) => api.delete(`/admin-courses/faculty/assign/${id}`)
};

export const authAPI = {
 login: (email, password) => api.post("/auth/login", { email, password }),
 register: (data) => api.post("/auth/register", data),
 logout: () => api.post("/auth/logout")
};

export const studentAPI = {
 getProfile: () => api.get("/student/profile"),
 updateProfile: (data) => api.put("/student/profile", data),
 getMarks: () => api.get("/student/marks"),
 getAttendance: () => api.get("/student/attendance"),
 getFees: () => api.get("/student/fees"),
 getBacklogs: () => api.get("/student/backlogs"),
 getDisciplinary: () => api.get("/student/disciplinary"),
 getTimetable: () => api.get("/student/timetable"),
 getResults: () => api.get("/student/results")
};

export const facultyAPI = {
 getProfile: () => api.get("/faculty/profile"),
 updateProfile: (data) => api.put("/faculty/profile", data),
 getCourses: () => api.get("/faculty/courses"),
 getAttendance: () => api.get("/faculty/attendance"),
 getMarks: () => api.get("/faculty/marks"),
 getAnalytics: () => api.get("/faculty/analytics"),
 getTimetable: () => api.get("/faculty/timetable"),
 addMarks: (data) => api.post("/faculty/marks/add", data),
 markAttendance: (data) => api.post("/faculty/attendance/mark", data)
};

export default api;

