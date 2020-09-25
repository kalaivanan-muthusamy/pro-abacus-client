import React from "react";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = (props) => {
  return (
    <React.Fragment>
      {localStorage.getItem("role") === "STUDENT" && <StudentDashboard />}
      {localStorage.getItem("role") === "TEACHER" && <TeacherDashboard />}
    </React.Fragment>
  );
};

export default Dashboard;
