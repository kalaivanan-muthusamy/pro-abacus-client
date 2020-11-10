import React from "react";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from './AdminDashboard';

const Dashboard = (props) => {
  return (
    <React.Fragment>
      {localStorage.getItem("role") === "STUDENT" && <StudentDashboard />}
      {localStorage.getItem("role") === "TEACHER" && <TeacherDashboard />}
      {localStorage.getItem("role") === "ADMIN" && <AdminDashboard />}
    </React.Fragment>
  );
};

export default Dashboard;
