import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const WCLReportTable = (props) => {
  const transactions = [
    {
      id: "customCheck2",
      noOfCompetitions: 22,
      name: "Neal Matthews",
      points: "400",
    },
    {
      id: "customCheck3",
      noOfCompetitions: 10,
      name: "Jamal Burnett",
      points: "380",
    },
    {
      id: "customCheck4",
      noOfCompetitions: 26,
      name: "Juan Mitchell",
      points: "384",
    },
    {
      id: "customCheck5",
      noOfCompetitions: 23,
      name: "Barry Dick",
      points: "412",
    },
    {
      id: "customCheck6",
      noOfCompetitions: 10,
      name: "Ronald Taylor",
      points: "404",
    },
    {
      id: "customCheck7",
      name: "Jacob Hunter",
      noOfCompetitions: 69,
      points: "392",
    },
  ];

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">WCL Weekly Rank - Level 2</CardTitle>
          <div className="table-responsive">
            <table className="table table-centered table-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "20px" }}>#</th>
                  <th>Name</th>
                  <th>Competitions</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, key) => (
                  <tr key={"_tr_" + key}>
                    <td>{key + 1}</td>
                    <td>{transaction.name}</td>
                    <td>{transaction.noOfCompetitions}</td>
                    <td>{transaction.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default WCLReportTable;
