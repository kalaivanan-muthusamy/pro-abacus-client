import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import moment from "moment";
import { getFormattedDuration } from "../../helpers/common";
import { Link } from "react-router-dom";

const columns = [
  {
    label: "Date",
    field: "date",
  },
  {
    label: "Total",
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
    width: 150
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
  {
    label: "Details",
    field: "fullDetails",
  },
];

const ExamReports = ({ examType }) => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getExamResults();
  }, []);

  async function getExamResults() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/results", {
        examType,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam details"));
        setLoading(false);
        return;
      }
      const allResults = res?.map?.((result) => ({
        ...result,
        percentile: result?.percentile ?? "N/A",
        rank: result?.rank ?? "N/A",
        accuracy: result?.accuracy + "%",
        speed: result?.speed + " sums/Min",
        timeTaken: getFormattedDuration(result?.timeTaken),
        date: moment(result?.examDetails?.examDate).format("DD-MMM-YYYY H:mm"),
        fullDetails: <Link to={`/exam/report/${result.examId}`}>View</Link>,
      }));
      setResults(allResults);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam details"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <MDBDataTable
        hover
        barReverse
        responsive
        striped
        bordered
        noBottomColumns
        data={{
          columns,
          rows: results,
        }}
      />
    </React.Fragment>
  );
};
export default ExamReports;
