import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import AreaLineChart from "./../../components/Charts/AreaLineChart";

function ExamChart({ examType, examName }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [examTrends, setExamTrends] = useState(null);

  useEffect(() => {
    getExamTrend();
  }, []);

  async function getExamTrend() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/trend", { examType });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the students joining trend")
        );
        setLoading(false);
        return;
      }
      setExamTrends(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the students joining trend"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Card className="overflow-hidden pb-4">
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <CardTitle className="mb-4">{examName} Participants Trend</CardTitle>
          <AreaLineChart
            labelName="Student Joined"
            data={examTrends?.values || []}
            labels={examTrends?.keys || []}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default ExamChart;
