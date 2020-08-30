import React from "react";
import { MDBDataTable } from "mdbreact";

const data = {
  columns: [
    {
      label: "Date",
      field: "date",
    },
    {
      label: "Name",
      field: "name",
    },
    {
      label: "Result",
      field: "result",
    },
    {
      label: "Rank",
      field: "rank",
    },
    {
      label: "Score",
      field: "score",
    },
    {
      label: "Total",
      field: "total",
    },
    {
      label: "Solved",
      field: "solved",
    },
    {
      label: "Correct",
      field: "correct",
    },
    {
      label: "Incorrect",
      field: "inCorrect",
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
      label: "Avg Time",
      field: "avgTime",
    },
    {
      label: "Star Of the Week",
      field: "starOfTheWeek",
      pdfDownload: "Download PDF",
    },
    {
      label: "Download",
      field: "pdfDownload",
    },
  ],
  rows: [
    {
      date: "15-Nov-2019",
      name: "Gloriana Tackett",
      result: "FAIL",
      score: 93,
      total: 150,
      solved: 116,
      correct: 84,
      inCorrect: 140,
      avgTime: 50,
      accuracy: 57,
      speed: 73,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "16-Dec-2019",
      name: "Yanaton Dugood",
      result: "PASS",
      score: 81,
      total: 150,
      solved: 102,
      correct: 84,
      inCorrect: 127,
      avgTime: 51,
      accuracy: 55,
      speed: 58,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "19-Nov-2019",
      name: "Elisa Damrell",
      result: "PASS",
      score: 99,
      total: 150,
      solved: 75,
      correct: 150,
      inCorrect: 138,
      avgTime: 97,
      accuracy: 100,
      speed: 89,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "15-Mar-2020",
      name: "Thia De Ruggero",
      result: "FAIL",
      score: 70,
      total: 150,
      solved: 139,
      correct: 75,
      inCorrect: 57,
      avgTime: 19,
      accuracy: 84,
      speed: 76,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "03-Sep-2019",
      name: "Lenna Lokier",
      result: "FAIL",
      score: 85,
      total: 150,
      solved: 108,
      correct: 86,
      inCorrect: 149,
      avgTime: 27,
      accuracy: 11,
      speed: 44,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "10-Nov-2019",
      name: "Andie Kobiera",
      result: "FAIL",
      score: 33,
      total: 150,
      solved: 79,
      correct: 106,
      inCorrect: 52,
      avgTime: 80,
      accuracy: 32,
      speed: 82,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "15-Nov-2019",
      name: "Cchaddie Chucks",
      result: "PASS",
      score: 88,
      total: 150,
      solved: 63,
      correct: 98,
      inCorrect: 121,
      avgTime: 21,
      accuracy: 62,
      speed: 86,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "01-Jul-2020",
      name: "Cal Swanton",
      result: "FAIL",
      score: 81,
      total: 150,
      solved: 80,
      correct: 77,
      inCorrect: 106,
      avgTime: 71,
      accuracy: 52,
      speed: 57,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "26-Jul-2020",
      name: "Bartram Scrigmour",
      result: "FAIL",
      score: 47,
      total: 150,
      solved: 81,
      correct: 96,
      inCorrect: 79,
      avgTime: 24,
      accuracy: 33,
      speed: 11,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "10-May-2020",
      name: "Jervis Izkovitch",
      result: "PASS",
      score: 79,
      total: 150,
      solved: 115,
      correct: 133,
      inCorrect: 143,
      avgTime: 51,
      accuracy: 91,
      speed: 17,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "31-Mar-2020",
      name: "Birdie Shillam",
      result: "PASS",
      score: 38,
      total: 150,
      solved: 135,
      correct: 106,
      inCorrect: 115,
      avgTime: 68,
      accuracy: 87,
      speed: 79,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "15-Aug-2020",
      name: "Elsa Dukes",
      result: "PASS",
      score: 76,
      total: 150,
      solved: 106,
      correct: 119,
      inCorrect: 102,
      avgTime: 23,
      accuracy: 93,
      speed: 24,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "21-Feb-2020",
      name: "Mella Pargetter",
      result: "PASS",
      score: 76,
      total: 150,
      solved: 52,
      correct: 132,
      inCorrect: 85,
      avgTime: 74,
      accuracy: 43,
      speed: 80,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "18-Nov-2019",
      name: "Robenia Luppitt",
      result: "FAIL",
      score: 43,
      total: 150,
      solved: 101,
      correct: 116,
      inCorrect: 73,
      avgTime: 98,
      accuracy: 97,
      speed: 40,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "29-Feb-2020",
      name: "Julissa Graham",
      result: "FAIL",
      score: 73,
      total: 150,
      solved: 121,
      correct: 93,
      inCorrect: 69,
      avgTime: 59,
      accuracy: 73,
      speed: 64,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "27-Oct-2019",
      name: "Florrie Birdwhistle",
      result: "PASS",
      score: 80,
      total: 150,
      solved: 95,
      correct: 106,
      inCorrect: 135,
      avgTime: 57,
      accuracy: 21,
      speed: 82,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "15-Dec-2019",
      name: "Oneida Loram",
      result: "PASS",
      score: 44,
      total: 150,
      solved: 104,
      correct: 83,
      inCorrect: 87,
      avgTime: 35,
      accuracy: 78,
      speed: 29,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
    {
      date: "12-Dec-2019",
      name: "Sim Punton",
      result: "PASS",
      score: 48,
      total: 150,
      solved: 123,
      correct: 54,
      inCorrect: 133,
      avgTime: 69,
      accuracy: 95,
      speed: 61,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "10-May-2020",
      name: "Margarethe Getsham",
      result: "FAIL",
      score: 94,
      total: 150,
      solved: 91,
      correct: 68,
      inCorrect: 100,
      avgTime: 23,
      accuracy: 24,
      speed: 81,
      starOfTheWeek: "Yes",
      pdfDownload: "Download PDF",
    },
    {
      date: "12-Aug-2020",
      name: "Jerrie Libbe",
      result: "PASS",
      score: 40,
      total: 150,
      solved: 92,
      correct: 147,
      inCorrect: 113,
      avgTime: 21,
      accuracy: 97,
      speed: 76,
      starOfTheWeek: "No",
      pdfDownload: "Download PDF",
    },
  ],
};

const WCLPerformance = (props) => {
  return (
    <React.Fragment>
      <MDBDataTable responsive striped bordered data={data} />
    </React.Fragment>
  );
};
export default WCLPerformance;
