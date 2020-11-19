import React from "react";
import { Container, Row, Col } from "reactstrap";
import { withNamespaces } from "react-i18next";
import AdminNotifications from "./AdminNotifications";
import TeacherInfo from "./TeacherInfo";
import TeacherReportCharts from "./TeacherReportCharts";
import TeacherTrendChart from "./TeacherTrendCharts";
import ParticipantsReport from "./ParticipantsReport";

function TeacherDashboard(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col sm="12" xl="8">
              <TeacherInfo />
              <TeacherTrendChart />
              <TeacherReportCharts />
            </Col>
            <Col sm="12" xl="4">
              <AdminNotifications />
              <ParticipantsReport />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(TeacherDashboard);
