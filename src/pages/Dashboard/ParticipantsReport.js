import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";

export default function ParticipantsReport() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [aclReports, setACLReports] = useState(null);
  const [wclReports, setWCLReports] = useState(null);

  useEffect(() => {
    getJoiningTrend();
  }, []);

  async function getJoiningTrend() {
    setLoading(true);
    try {
      const { error, res } = await getRequest(
        "teachers/student-participants-report"
      );
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam details"));
        setLoading(false);
        return;
      }
      const reports = res;
      setWCLReports(reports?.WCLReports || []);
      setACLReports(reports?.ACLReports || []);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam details"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <CardTitle className="mb-4">WCL Participants</CardTitle>
          {wclReports?.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Participants</th>
                  <th>WCL Star</th>
                </tr>
              </thead>
              <tbody>
                {wclReports?.map((report) => (
                  <tr>
                    <td>{report?.examName}</td>
                    <td>{report?.participated}</td>
                    <td>{report?.won}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mb-3 mt-3">
              <div>
                <i className="bx bx-comment-error font-size-24 mb-2" />
              </div>
              No students participated in WCL
            </div>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <CardTitle className="mb-4">ACL Participants</CardTitle>
          {aclReports?.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Participants</th>
                  <th>WCL Star</th>
                </tr>
              </thead>
              <tbody>
                {aclReports?.map((report) => (
                  <tr>
                    <td>{report?.examName}</td>
                    <td>{report?.participated}</td>
                    <td>{report?.won}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center mb-3 mt-3">
              <div>
                <i className="bx bx-comment-error font-size-24 mb-2" />
              </div>
              No students participated in ACL
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}
