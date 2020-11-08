import React from "react";
import ExamStats from "../../components/Dashboard/ExamStats";
import { EXAM_TYPES } from "./../../contants";

function TeacherReportCharts() {
  return (
    <React.Fragment>
      <ExamStats name="Self Test" examType={EXAM_TYPES.SELF_TEST} />
    </React.Fragment>
  );
}
export default TeacherReportCharts;
