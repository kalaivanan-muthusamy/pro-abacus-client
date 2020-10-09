import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { getRequest } from "../../helpers/apiRequest";
import ReactApexChart from "react-apexcharts";
import RadialChart from "./../../components/Charts/RadiulBar";

const donutOptions = {
  noData: {
    text: "No data available",
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: 0,
    style: {
      color: "#ddd",
      fontSize: "14px",
    },
  },
  labels: ["Correct Answers", "Incorrect Answers"],
  colors: ["#34c38f", "#f46a6a"],
  legend: { show: false },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
      },
    },
  },
};

function StudentReportCharts() {
  const [loading, setLoading] = useState(false);
  const [examReports, setExamReports] = useState(null);

  useEffect(() => {
    getExamReports();
  }, []);

  async function getExamReports() {
    setLoading(true);
    const { res, error } = await getRequest("exams/reports");
    if (error) console.log("error");
    setExamReports(res);
    setLoading(false);
  }

  function getExamAnswerStatus(exams) {
    if (exams?.length > 0) {
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      exams.map((exam) => {
        const answers = exam?.answers || [];
        answers?.map?.((answer) => {
          if (answer.isCorrectAnswer) ++correctAnswers;
          else ++incorrectAnswers;
        });
      });
      return [correctAnswers, incorrectAnswers];
    }
    return [];
  }

  return (
    <React.Fragment>
      {/* ACL */}
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <Row>
            <Col>
              <CardTitle className="mb-4 float-left">ACL</CardTitle>
              <div className="float-right">
                <div className="input-group input-group-sm">
                  <select className="custom-select custom-select-sm">
                    <option defaultValue>All</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <Row>
              <Col sm="12" md="6">
                <ReactApexChart
                  options={donutOptions}
                  series={getExamAnswerStatus(examReports?.ACLExams?.exams)}
                  type="donut"
                  height={200}
                />
              </Col>
              <Col sm="12" md="6">
                <RadialChart
                  height={300}
                  labels={["Speed"]}
                  valueFormatter={(val) => val + " / hr"}
                  series={[examReports?.ACLExams?.avgSpeed || 0]}
                />
              </Col>
            </Row>
            <Row className="pl-3 text-center">
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary mr-1"></i>
                    Avg.Accuracy
                  </p>
                  <h5>{examReports?.ACLExams?.avgAccuracy}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success mr-1"></i>
                    Avg.Duration
                  </p>
                  <h5>{examReports?.ACLExams?.avgDuration}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>{examReports?.ACLExams?.avgSpeed}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      {/* WCL */}
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <Row>
            <Col>
              <CardTitle className="mb-4 float-left">WCL</CardTitle>
              <div className="float-right">
                <div className="input-group input-group-sm">
                  <select className="custom-select custom-select-sm">
                    <option defaultValue>All</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <Row>
              <Col sm="12" md="6">
                <ReactApexChart
                  options={donutOptions}
                  series={getExamAnswerStatus(examReports?.WCLExams?.exams)}
                  type="donut"
                  height={200}
                />
              </Col>
              <Col sm="12" md="6">
                <RadialChart
                  height={300}
                  labels={["Speed"]}
                  valueFormatter={(val) => val + " / hr"}
                  series={[examReports?.WCLExams?.avgSpeed || 0]}
                />
              </Col>
            </Row>
            <Row className="pl-3 text-center">
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary mr-1"></i>
                    Avg.Accuracy
                  </p>
                  <h5>{examReports?.WCLExams?.avgAccuracy}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success mr-1"></i>
                    Avg.Duration
                  </p>
                  <h5>{examReports?.WCLExams?.avgDuration}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>{examReports?.WCLExams?.avgSpeed}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      {/* Assessments */}
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <Row>
            <Col>
              <CardTitle className="mb-4 float-left">Assessments</CardTitle>
              <div className="float-right">
                <div className="input-group input-group-sm">
                  <select className="custom-select custom-select-sm">
                    <option defaultValue>All</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <Row>
              <Col sm="12" md="6">
                <ReactApexChart
                  options={donutOptions}
                  series={getExamAnswerStatus(
                    examReports?.AssessmentExams?.exams
                  )}
                  type="donut"
                  height={200}
                />
              </Col>
              <Col sm="12" md="6">
                <RadialChart
                  height={300}
                  labels={["Speed"]}
                  valueFormatter={(val) => val + " / hr"}
                  series={[examReports?.AssessmentExams?.avgSpeed || 0]}
                />
              </Col>
            </Row>
            <Row className="pl-3 text-center">
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary mr-1"></i>
                    Avg.Accuracy
                  </p>
                  <h5>{examReports?.AssessmentExams?.avgAccuracy}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success mr-1"></i>
                    Avg.Duration
                  </p>
                  <h5>{examReports?.AssessmentExams?.avgDuration}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>{examReports?.AssessmentExams?.avgSpeed}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      {/* Self Test */}
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <Row>
            <Col>
              <CardTitle className="mb-4 float-left">Self Test</CardTitle>
              <div className="float-right">
                <div className="input-group input-group-sm">
                  <select className="custom-select custom-select-sm">
                    <option defaultValue>All</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <Row>
              <Col sm="12" md="6">
                <ReactApexChart
                  options={donutOptions}
                  series={getExamAnswerStatus(
                    examReports?.SelfTestExams?.exams
                  )}
                  type="donut"
                  height={200}
                />
              </Col>
              <Col sm="12" md="6">
                <RadialChart
                  height={300}
                  labels={["Speed"]}
                  valueFormatter={(val) => val + " / hr"}
                  series={[examReports?.SelfTestExams?.avgSpeed || 0]}
                />
              </Col>
            </Row>
            <Row className="pl-3 text-center">
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary mr-1"></i>
                    Avg.Accuracy
                  </p>
                  <h5>{examReports?.SelfTestExams?.avgAccuracy}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success mr-1"></i>
                    Avg.Duration
                  </p>
                  <h5>{examReports?.SelfTestExams?.avgDuration}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>{examReports?.SelfTestExams?.avgSpeed}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}
export default StudentReportCharts;
