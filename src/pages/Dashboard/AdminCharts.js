import React from "react";
import { Row, Col } from "reactstrap";
import SubscriptionTrendChart from "../../components/AdminDashboard/SubscriptionTrendChart";
import StudentsJoiningChart from "./../../components/AdminDashboard/StudentsJoiningChart";
import TeachersJoiningChart from "./../../components/AdminDashboard/TeachersJoiningChart";
import ExamChart from "./../../components/AdminDashboard/ExamChart";
import { EXAM_TYPES } from "./../../contants";

function AdminCharts() {
  return (
    <React.Fragment>
      <Row>
        <Col sm="12" md="6">
          <StudentsJoiningChart />
        </Col>
        <Col sm="12" md="6">
          <SubscriptionTrendChart
            role="STUDENT"
            title="Students Subscription Trend"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <TeachersJoiningChart />
        </Col>
        <Col sm="12" md="6">
          <SubscriptionTrendChart
            role="TEACHER"
            title="Teachers Subscription Trend"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <ExamChart examName={"Self Test"} examType={EXAM_TYPES.SELF_TEST} />
        </Col>
        <Col sm="12" md="6">
          <ExamChart examName={"Assessment"} examType={EXAM_TYPES.ASSESSMENT} />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="6">
          <ExamChart examName={"WCL"} examType={EXAM_TYPES.WCL} />
        </Col>
        <Col sm="12" md="6">
          <ExamChart examName={"ACL"} examType={EXAM_TYPES.ACL} />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default AdminCharts;
