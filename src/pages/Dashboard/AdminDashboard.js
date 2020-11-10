import React from "react";
import { Container, Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import AdminCharts from "./AdminCharts";

function AdminDashboard(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"Dashboard"} />
          <AdminCharts />
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AdminDashboard;
