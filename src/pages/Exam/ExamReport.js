import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { classname } from "classnames";
import { SPLITUP_CATEGORY } from "./../../contants";

function ExamReport() {
  const [loading, setLoading] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [pageError, setPageError] = useState(null);
  const params = useParams();

  useEffect(() => {
    getExamReport();
  }, []);

  async function getExamReport() {
    try {
      setLoading(true);
      const { error, res } = await getRequest("exams/detailed-report", {
        examId: params.examId,
      });
      if (error) {
        setLoading(false);
        return setPageError(
          getErrorMsg(
            error,
            "Couldn't complete the exam. Please try again later!"
          )
        );
      }
      setExamResult(res);
    } catch (err) {
      setLoading(false);
      return setPageError(
        getErrorMsg(err, "Couldn't complete the exam. Please try again later!")
      );
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Exam Report" />
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
                        <Col>
                          <h5>Summary of the Exam</h5>
                          <table className="table table-bordered table-hover mt-4">
                            <thead>
                              <tr>
                                <th>Summary</th>
                                <th>Result</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Total Sums</td>
                                <td>{examResult?.totalQuestions}</td>
                              </tr>
                              <tr>
                                <td>Attempted Sums</td>
                                <td>{examResult?.answeredQuestions}</td>
                              </tr>
                              <tr>
                                <td>Correct Answers</td>
                                <td>{examResult?.correctAnswers}</td>
                              </tr>
                              <tr>
                                <td>Incorrect Answers</td>
                                <td>{examResult?.inCorrectAnswers}</td>
                              </tr>
                            </tbody>
                          </table>
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
                        <Col>
                          <h5>Detailed Report</h5>
                          <div className="table-responsive">
                            <table className="table table-bordered  table-hover mt-4">
                              <thead>
                                <tr>
                                  <th>Sum</th>
                                  <th>Your Answer</th>
                                  <th>Correct Answer</th>
                                  <th>Time Taken</th>
                                  <th>Marks Scored</th>
                                </tr>
                              </thead>
                              <tbody>
                                {examResult?.examDetails?.questions?.map(
                                  (question) => {
                                    const answerDetails = examResult?.answerDetails?.answers?.find(
                                      (answer) =>
                                        answer.questionId === question._id
                                    );
                                    return (
                                      <tr>
                                        <td className="exam-container">
                                          <div className="question-container font-size-18 mt-0">
                                            {question?.type ===
                                              SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION && (
                                              <div className={question?.type}>
                                                {question?.rowValues.map(
                                                  (value, index) => (
                                                    <div
                                                      key={index}
                                                      className="number"
                                                    >
                                                      {value}
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                            {question?.type ===
                                              SPLITUP_CATEGORY.MULTIPLICATION && (
                                              <div className={question?.type}>
                                                <div className="number">
                                                  {question?.rowValues?.[0]}
                                                </div>
                                                x
                                                <div className="number">
                                                  {question?.rowValues?.[1]}
                                                </div>
                                              </div>
                                            )}
                                            {question?.type ===
                                              SPLITUP_CATEGORY.DIVISION && (
                                              <div className={question?.type}>
                                                <div className="number">
                                                  {question?.rowValues?.[0]}
                                                </div>
                                                ÷
                                                <div className="number">
                                                  {question?.rowValues?.[1]}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </td>
                                        <td>
                                          {answerDetails?.givenAnswer ?? "-"}
                                          {answerDetails?.givenAnswer ? (
                                            answerDetails?.isCorrectAnswer ? (
                                              <i className="ml-1 text-success bx bx-check-circle" />
                                            ) : (
                                              <i className="ml-1 text-danger bx bx-x-circle" />
                                            )
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td>{question?.answer}</td>
                                        <td>
                                          {answerDetails?.timeTaken ?? "N/A"}
                                          {answerDetails?.timeTaken &&
                                            " Seconds"}
                                        </td>
                                        <td>
                                          {answerDetails?.isCorrectAnswer
                                            ? question?.mark
                                            : question?.negativeMark
                                            ? "- " + question.negativeMark
                                            : 0}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
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

export default ExamReport;
