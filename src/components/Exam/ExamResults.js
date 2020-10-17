import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { withNamespaces } from "react-i18next";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { getFormattedDuration } from "./../../helpers/common";
import { MDBDataTable } from "mdbreact";

const columns = [
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Total Sums",
    field: "totalQuestions",
  },
  {
    label: "Answered",
    field: "answeredQuestions",
  },
  {
    label: "Correct",
    field: "correctAnswers",
  },
  {
    label: "Incorrect",
    field: "inCorrectAnswers",
  },
  {
    label: "Score",
    field: "scoredMarks",
  },
  {
    label: "Accuracy",
    field: "accuracy",
  },
  {
    label: "Speed",
    field: "speed",
  },
  {
    label: "Duration (MM:SS)",
    field: "timeTaken",
  },
  {
    label: "Percentile",
    field: "percentile",
  },
  {
    label: "Rank",
    field: "rank",
  },
];

function ExamResults({ examType }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedLimit, setSelectedLimit] = useState(20);
  const [exams, setExams] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    getCompletedExam();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      getResults();
    }
  }, [selectedExam, selectedLimit]);

  async function getCompletedExam() {
    try {
      setLoading(true);
      const { error, res: allExams } = await getRequest("exams/completed", {
        examType,
      });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the completed exam details")
        );
        setLoading(false);
        return;
      }
      setExams(allExams);
      if (allExams?.length > 0) setSelectedExam(allExams[0]._id);
    } catch (err) {
      console.error(err);
      setErrorMsg(getErrorMsg(err, "Couldn't get the completed exam details"));
    }
    setLoading(false);
  }

  async function getResults() {
    try {
      setLoading(true);
      const { error, res } = await getRequest("exams/results", {
        examId: selectedExam,
        limit: selectedLimit,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam results"));
        setLoading(false);
        return;
      }
      const allResults = res?.map?.((result) => ({
        ...result,
        name: result?.studentDetails?.name,
        percentile: result?.percentile ?? "N/A",
        rank: result?.rank ?? "N/A",
        accuracy: result?.accuracy + "%",
        speed: result?.speed + "/minute",
        timeTaken: getFormattedDuration(result?.timeTaken),
      }));
      setResults(allResults);
    } catch (err) {
      console.error(err);
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam results"));
    }
    setLoading(false);
  }

  function onSelectChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    if (key === "limit") setSelectedLimit(value);
    if (key === "exam") setSelectedExam(value);
  }

  return (
    <Card>
      <CardBody>
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        )}
        {exams?.length == 0 && (
          <div className="text-center mb-5 mt-5">
            <div>
              <i className="fa font-size-24 mb-4 fa-exclamation-triangle" />
            </div>
            No results available
          </div>
        )}
        {exams?.length > 0 && (
          <React.Fragment>
            <Row>
              <Col>
                <div className="float-left mb-3 mr-3">
                  <div className="input-group input-group-sm">
                    <select
                      name="exam"
                      onChange={onSelectChange}
                      className="custom-select custom-select-sm"
                    >
                      {exams?.map?.((exam) => (
                        <option
                          selected={
                            selectedExam === exam._id ? "selected" : null
                          }
                          value={exam._id}
                        >
                          {exam.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="float-left mb-3">
                  <div className="input-group input-group-sm">
                    <select
                      name="limit"
                      onChange={onSelectChange}
                      className="custom-select custom-select-sm"
                    >
                      <option value="ALL">All Students</option>
                      <option value="10">Top 10 Students</option>
                      <option selected value="20">
                        Top 20 Students
                      </option>
                      <option value="100">Top 100 Students</option>
                    </select>
                  </div>
                </div>
              </Col>
            </Row>

            <MDBDataTable
              barReverse
              responsive
              striped
              bordered
              noBottomColumns
              data={{
                columns,
                rows: results || [],
              }}
            />
          </React.Fragment>
        )}
      </CardBody>
    </Card>
  );
}

export default withNamespaces()(ExamResults);
