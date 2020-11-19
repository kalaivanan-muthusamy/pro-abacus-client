import React from "react";
import { Container, Row, Col } from "reactstrap";
import { withNamespaces } from "react-i18next";
import StudentInfo from "./StudentInfo";
import StudentReportCharts from "./StudentReportCharts";
import AdminNotifications from "./AdminNotifications";
import WCLNotifications from "./WCLNotification";
import WCLReportTable from "./WCLReportTable";

function StudentDashboard(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col sm="12" xl="8">
              <StudentInfo />
              <StudentReportCharts />
            </Col>
            <Col sm="12" xl="4">
              <AdminNotifications />
              <WCLNotifications />
              <WCLReportTable />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(StudentDashboard);
