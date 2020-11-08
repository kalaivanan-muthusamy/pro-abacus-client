import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import AreaLineChart from "./../../components/Charts/AreaLineChart";

function TeacherTrendChart(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [joiningTrends, setJoiningTrends] = useState(null);

  useEffect(() => {
    getJoiningTrend();
  }, []);

  async function getJoiningTrend() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("teachers/student-joining-trend");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam details"));
        setLoading(false);
        return;
      }
      setJoiningTrends(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam details"));
    }
    setLoading(false);
  }

  return (
    <Row>
      <Col>
        <Card className="overflow-hidden pb-4">
          <CardBody>
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
      </Col>
    </Row>
  );
}

export default TeacherTrendChart;
