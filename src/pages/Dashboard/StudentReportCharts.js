import React from "react";
import ExamStats from "../../components/Dashboard/ExamStats";
import { EXAM_TYPES } from "./../../contants";

function StudentReportCharts() {
  return (
    <React.Fragment>
      <ExamStats name="ACL" examType={EXAM_TYPES.ACL} />
      <ExamStats name="WCL" examType={EXAM_TYPES.WCL} />
      <ExamStats name="Assessments" examType={EXAM_TYPES.ASSESSMENT} />
      <ExamStats name="Self Test" examType={EXAM_TYPES.SELF_TEST} />
    </React.Fragment>
  );
}
export default StudentReportCharts;
