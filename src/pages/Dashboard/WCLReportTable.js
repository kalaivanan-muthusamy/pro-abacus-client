import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";

const WCLReportTable = (props) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getRecentWCLResult();
  }, []);

  async function getRecentWCLResult() {
    try {
      setLoading(true);
      const { error, res: allExams } = await getRequest(
        "exams/recent-wcl-report"
      );
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the completed exam reports")
        );
        setLoading(false);
        return;
      }
      setResults(allExams);
    } catch (err) {
      console.error(err);
      setErrorMsg(getErrorMsg(err, "Couldn't get the completed exam reports"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">
            WCL Report: {results?.[0]?.examDetails?.name}
          </CardTitle>
          {results?.length > 0 && (
            <div className="table-responsive">
              <table className="table table-centered table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th style={{ width: "20px" }}>#</th>
                    <th>Name</th>
                    <th>Percentile</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {results?.map?.((result, key) => (
                    <tr key={"_tr_" + key}>
                      <td>{key + 1}</td>
                      <td>{result?.studentDetails?.name}</td>
                      <td>{result.percentile}</td>
                      <td>{result.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {(!results || results?.length === 0) && (
            <div className="text-center mb-3 mt-0">
              <div>
                <i className="bx bx-comment-error font-size-24 mb-2" />
              </div>
              No info available
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default WCLReportTable;
