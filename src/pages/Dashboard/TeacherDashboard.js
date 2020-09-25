import React from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withNamespaces } from "react-i18next";
import StudentInfo from "./StudentInfo";
import StudentReportCharts from "./StudentReportCharts";
import AdminNotifications from "./AdminNotifications";
import ACLNotifications from "./ACLNotifications";
import WCLNotifications from "./WCLNotification";
import WCLReportTable from "./WCLReportTable";

function TeacherDashboard(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboard")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col sm="12" xl="8">
              <StudentInfo />
              <StudentReportCharts />
            </Col>
            <Col sm="12" xl="4">
              <AdminNotifications />
              <ACLNotifications />
              <WCLNotifications />
              <WCLReportTable />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(TeacherDashboard);
