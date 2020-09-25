import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";

function CompletedExamReport(props) {
  const [loading, setLoading] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [pageError, setPageErrorMsg] = useState(null);

  useEffect(() => {
    getExamResult();
  }, []);

  async function getExamResult() {
    try {
      setLoading(true);
      const { res, error } = await getRequest("exams/result", {
        examId: window.location.pathname.split("/").pop(),
      });
      if (error) {
        setPageErrorMsg(
          getErrorMsg(error, "Couldn't get the exam result now!.")
        );
        setLoading(false);
        return;
      }
      setExamResult(res);
    } catch (err) {}
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Exam")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {loading && (
                    <div className="spinner-overlay">
                      <div className="spinner" />
                    </div>
                  )}
                  {!pageError && (
                    <React.Fragment>
                      <Row>
                        <Col className="text-center">
                          <div className="text-center mb-5 mt-5">
                            <div>
                              <i className="fa text-success font-size-24 mb-4 fa-check-circle" />
                            </div>
                            You have successfully completed the Exam
                          </div>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col>
                          <h5>Summary of the Exam</h5>
                          <table className="table table-dark table-bordered  table-hover mt-4">
                            <thead>
                              <tr>
                                <th>Summary</th>
                                <th>Result</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Total Sums</td>
                                <td>{examResult?.questions?.length}</td>
                              </tr>
                              <tr>
                                <td>Attempted Sums</td>
                                <td>{examResult?.answers?.length}</td>
                              </tr>
                              <tr>
                                <td>Correct Answers</td>
                                <td>
                                  {
                                    examResult?.answers?.filter(
                                      (a) => a.isCorrectAnswer
                                    )?.length
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Incorrect Answers</td>
                                <td>
                                  {
                                    examResult?.answers?.filter(
                                      (a) => !a.isCorrectAnswer
                                    )?.length
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="text-center">
                            <Link to="/dashboard">Jump to Dashboard</Link>
                          </div>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                  {pageError && (
                    <div className="text-center mb-5 mt-5">
                      <div>
                        <i className="fa font-size-24 mb-4 fa-exclamation-triangle" />
                      </div>
                      {pageError}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(CompletedExamReport);
