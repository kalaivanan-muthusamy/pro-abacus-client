import React from "react";
import StudentDashboard from "./StudentDashboard";

const Dashboard = (props) => {
  return (
    <React.Fragment>
      {localStorage.getItem("role") === "STUDENT" && <StudentDashboard />}
    </React.Fragment>
  );
};

export default Dashboard;
