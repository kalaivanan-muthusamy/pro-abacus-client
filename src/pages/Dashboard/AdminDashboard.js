import React from "react";
import { Container } from "reactstrap";
import AdminCharts from "./AdminCharts";

function AdminDashboard(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <AdminCharts />
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AdminDashboard;
