import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import RadialChart from "./../../components/Charts/RadiulBar";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";

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

function ExamStats({ name, examType = "WCL" }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [examReports, setExamReports] = useState(null);
  const [recentExams, setRecentExams] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    getRecentExams();
    getExamReports();
  }, []);

  useEffect(() => {
    if (selectedExam !== null) {
      console.log("selectedExam", selectedExam);
      getExamReports();
    }
  }, [selectedExam]);

  async function getRecentExams() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/recent-exams", {
        examType,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam details"));
        setLoading(false);
        return;
      }
      setRecentExams(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam details"));
    }
    setLoading(false);
  }

  async function getExamReports() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/report", {
        examType,
        examId: selectedExam === "All" ? undefined : selectedExam,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam reports"));
        setLoading(false);
        return;
      }
      setExamReports(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam reports"));
    }
    setLoading(false);
  }

  function getExamAnswerStatus(exams) {
    if (Array.isArray(exams)) {
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      exams.map((exam) => {
        correctAnswers += exam.correctAnswers;
        incorrectAnswers += exam.inCorrectAnswers;
      });
      console.log([correctAnswers, incorrectAnswers]);
      return [correctAnswers, incorrectAnswers];
    } else if (typeof exams === "object") {
      return [exams.correctAnswers, exams.inCorrectAnswers];
    }
    return [];
  }

  function onExamReportChange(event) {
    const value = event.target.value;
    setSelectedExam(value);
  }

  return (
    <Card>
      <CardBody>
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        )}

        <Row>
          <Col>
            <CardTitle className="mb-4 float-left">{name}</CardTitle>
            {recentExams?.length > 0 && (
              <div className="float-right">
                <div className="input-group input-group-sm">
                  <select
                    onChange={onExamReportChange}
                    className="custom-select custom-select-sm"
                  >
                    <option value="">All</option>
                    {recentExams?.map?.((exam) => (
                      <option value={exam.examDetails?._id}>
                        {exam.examDetails?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </Col>
        </Row>
        {recentExams?.length > 0 && (
          <div>
            <Row>
              <Col sm="12" md="6">
                <ReactApexChart
                  options={donutOptions}
                  series={getExamAnswerStatus(examReports?.exams)}
                  type="donut"
                  height={200}
                />
              </Col>
              <Col sm="12" md="6">
                <RadialChart
                  height={300}
                  labels={["Speed"]}
                  valueFormatter={(val) => val + " / hr"}
                  series={[
                    selectedExam
                      ? examReports?.speed ?? 0
                      : examReports?.avgSpeed ?? 0,
                  ]}
                />
              </Col>
            </Row>
            <Row className="pl-3 text-center">
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success mr-1"></i>
                    {selectedExam ? "Accuracy" : "Avg.Accuracy"}
                  </p>
                  <h5>{examReports?.avgAccuracy ?? examReports?.accuracy}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-secondary mr-1"></i>
                    {selectedExam ? "Duration" : "Avg.Duration"}
                  </p>
                  <h5>{examReports?.avgDuration ?? examReports?.duration}</h5>
                </div>
              </Col>
              <Col xs="4">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-info mr-1"></i>
                    {selectedExam ? "Speed" : "Avg.Speed"}
                  </p>
                  <h5>{examReports?.avgSpeed ?? examReports?.speed}</h5>
                </div>
              </Col>
            </Row>
          </div>
        )}
        {recentExams?.length === 0 && (
          <div className="text-center mb-3 mt-3">
            <div>
              <i className="bx bx-comment-error font-size-24 mb-2" />
            </div>
            No exams available for reporting
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default ExamStats;
