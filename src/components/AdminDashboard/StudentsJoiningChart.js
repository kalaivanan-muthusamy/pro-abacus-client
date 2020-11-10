import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import AreaLineChart from "./../../components/Charts/AreaLineChart";

function StudentsJoiningChart(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [joiningTrends, setJoiningTrends] = useState(null);

  useEffect(() => {
    getStudentsJoiningTrend();
  }, []);

  async function getStudentsJoiningTrend() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("students/joining-trend");
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the students joining trend")
        );
        setLoading(false);
        return;
      }
      setJoiningTrends(res);
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
          <CardTitle className="mb-4 float-left">
            Students Joining Trend
          </CardTitle>
          <AreaLineChart
            labelName="Student Joined"
            data={joiningTrends?.values || []}
            labels={joiningTrends?.keys || []}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default StudentsJoiningChart;
