import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { withNamespaces } from "react-i18next";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";

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
      setResults(res);
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

  function getFormattedDuration(seconds) {
    const minutes = parseInt(seconds / 60).toLocaleString("en-Us", {
      minimumIntegerDigits: 2,
    });
    const remainingSeconds = parseInt(seconds % 60).toLocaleString("en-Us", {
      minimumIntegerDigits: 2,
    });
    return `${minutes}:${remainingSeconds}`;
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
                        <option selected={selectedExam === exam._id ? 'selected' : null } value={exam._id}>
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

            <Table className="table-centered table-nowrap table-hover w-100">
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ width: "70px" }}>
                    #
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Total Sums</th>
                  <th scope="col">Correct</th>
                  <th scope="col">In Correct</th>
                  <th scope="col">Accuracy</th>
                  <th scope="col">Speed</th>
                  <th scope="col">Duration (MM:SS)</th>
                  <th scope="col">Percentile</th>
                  <th scope="col">Rank</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((result, i) => (
                  <tr key={"_user_" + i}>
                    <td>{i + 1}</td>
                    <td>
                      <span className=" mb-1">
                        {result?.studentDetails?.name}
                      </span>
                    </td>
                    <td>{result.totalQuestions}</td>
                    <td>{result.correctAnswers}</td>
                    <td>{result.inCorrectAnswers}</td>
                    <td>{result.accuracy}%</td>
                    <td>{result.speed}/minute</td>
                    <td>{getFormattedDuration(result.timeTaken)}</td>
                    <td>{result.percentile}</td>
                    <td>{result.rank}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        )}
      </CardBody>
    </Card>
  );
}

export default withNamespaces()(ExamResults);
