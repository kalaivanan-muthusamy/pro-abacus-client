import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import AreaLineChart from "./../../components/Charts/AreaLineChart";

function SubscriptionTrendChart({ role, title }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [joiningTrends, setJoiningTrends] = useState(null);

  useEffect(() => {
    getSubscriptionTrendChart();
  }, []);

  async function getSubscriptionTrendChart() {
    setLoading(true);
    try {
      const {
        error,
        res,
      } = await getRequest("pricing-plans/subscription-trend", { role });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the subscription joining trend")
        );
        setLoading(false);
        return;
      }
      setJoiningTrends(res);
    } catch (err) {
      setErrorMsg(
        getErrorMsg(err, "Couldn't get the subscription joining trend")
      );
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
          <CardTitle className="mb-4 float-left">{title}</CardTitle>
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

export default SubscriptionTrendChart;
