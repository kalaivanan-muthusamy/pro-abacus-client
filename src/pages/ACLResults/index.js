import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";

const users = [
  {
    first_name: "Esmaria",
    centerName: "Kozey, Moen and Littel",
    totalSums: 11,
    correct: 35,
    inCorrect: 20,
    accuracy: 18,
    speed: 2,
    avgTimePerSum: 43,
    rank: 18,
    points: 3,
  },
  {
    first_name: "Bambie",
    centerName: "Fay-Schroeder",
    totalSums: 76,
    correct: 9,
    inCorrect: 26,
    accuracy: 15,
    speed: 27,
    avgTimePerSum: 13,
    rank: 15,
    points: 40,
  },
  {
    first_name: "Alix",
    centerName: "Sipes, Hegmann and Kovacek",
    totalSums: 97,
    correct: 34,
    inCorrect: 31,
    accuracy: 37,
    speed: 17,
    avgTimePerSum: 29,
    rank: 23,
    points: 21,
  },
  {
    first_name: "Koo",
    centerName: "Ritchie, Reinger and Huels",
    totalSums: 40,
    correct: 11,
    inCorrect: 42,
    accuracy: 34,
    speed: 45,
    avgTimePerSum: 30,
    rank: 46,
    points: 39,
  },
  {
    first_name: "Hilton",
    centerName: "Krajcik-Heller",
    totalSums: 71,
    correct: 32,
    inCorrect: 30,
    accuracy: 29,
    speed: 7,
    avgTimePerSum: 44,
    rank: 28,
    points: 43,
  },
  {
    first_name: "Trisha",
    centerName: "Prosacco LLC",
    totalSums: 29,
    correct: 37,
    inCorrect: 24,
    accuracy: 24,
    speed: 37,
    avgTimePerSum: 39,
    rank: 13,
    points: 46,
  },
  {
    first_name: "Quinn",
    centerName: "Thiel-Cole",
    totalSums: 43,
    correct: 49,
    inCorrect: 47,
    accuracy: 35,
    speed: 20,
    avgTimePerSum: 4,
    rank: 49,
    points: 37,
  },
  {
    first_name: "Clotilda",
    centerName: "Mraz, Kerluke and Crooks",
    totalSums: 26,
    correct: 27,
    inCorrect: 19,
    accuracy: 37,
    speed: 5,
    avgTimePerSum: 32,
    rank: 16,
    points: 18,
  },
  {
    first_name: "Pincus",
    centerName: "Kuhlman, Bartoletti and Ziemann",
    totalSums: 25,
    correct: 34,
    inCorrect: 2,
    accuracy: 43,
    speed: 29,
    avgTimePerSum: 48,
    rank: 42,
    points: 29,
  },
  {
    first_name: "Andrus",
    centerName: "Murazik and Sons",
    totalSums: 4,
    correct: 29,
    inCorrect: 46,
    accuracy: 31,
    speed: 25,
    avgTimePerSum: 6,
    rank: 49,
    points: 25,
  },
  {
    first_name: "Erasmus",
    centerName: "Tillman, Johnston and Tillman",
    totalSums: 32,
    correct: 8,
    inCorrect: 2,
    accuracy: 12,
    speed: 28,
    avgTimePerSum: 7,
    rank: 21,
    points: 32,
  },
  {
    first_name: "Coletta",
    centerName: "Medhurst Inc",
    totalSums: 21,
    correct: 30,
    inCorrect: 16,
    accuracy: 35,
    speed: 21,
    avgTimePerSum: 30,
    rank: 26,
    points: 45,
  },
  {
    first_name: "Olimpia",
    centerName: "Nader, Toy and Jerde",
    totalSums: 23,
    correct: 18,
    inCorrect: 13,
    accuracy: 26,
    speed: 50,
    avgTimePerSum: 4,
    rank: 43,
    points: 38,
  },
  {
    first_name: "Diego",
    centerName: "Lemke, Ebert and Padberg",
    totalSums: 22,
    correct: 5,
    inCorrect: 40,
    accuracy: 23,
    speed: 39,
    avgTimePerSum: 18,
    rank: 16,
    points: 34,
  },
  {
    first_name: "Kingsly",
    centerName: "Greenholt Group",
    totalSums: 79,
    correct: 49,
    inCorrect: 17,
    accuracy: 1,
    speed: 50,
    avgTimePerSum: 1,
    rank: 33,
    points: 50,
  },
  {
    first_name: "Rhianon",
    centerName: "Mohr Group",
    totalSums: 64,
    correct: 46,
    inCorrect: 33,
    accuracy: 27,
    speed: 16,
    avgTimePerSum: 11,
    rank: 49,
    points: 41,
  },
  {
    first_name: "Nickie",
    centerName: "Lubowitz, Muller and Koepp",
    totalSums: 78,
    correct: 29,
    inCorrect: 10,
    accuracy: 37,
    speed: 33,
    avgTimePerSum: 28,
    rank: 43,
    points: 6,
  },
  {
    first_name: "Sibilla",
    centerName: "Bradtke and Sons",
    totalSums: 8,
    correct: 28,
    inCorrect: 41,
    accuracy: 28,
    speed: 7,
    avgTimePerSum: 31,
    rank: 1,
    points: 10,
  },
  {
    first_name: "Cece",
    centerName: "Feeney LLC",
    totalSums: 34,
    correct: 32,
    inCorrect: 28,
    accuracy: 12,
    speed: 37,
    avgTimePerSum: 38,
    rank: 35,
    points: 9,
  },
  {
    first_name: "Brodie",
    centerName: "Beer Group",
    totalSums: 4,
    correct: 29,
    inCorrect: 38,
    accuracy: 13,
    speed: 11,
    avgTimePerSum: 49,
    rank: 5,
    points: 4,
  },
];
function ACLResults(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("ACL Results")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <div className="float-left mb-3 mr-3">
                        <div className="input-group input-group-sm">
                          <select className="custom-select custom-select-sm">
                            <option>Select ACL Date</option>
                            <option selected>ACL 2020</option>
                            <option value="1">ACL 2019</option>
                          </select>
                        </div>
                      </div>
                      <div className="float-left mb-3">
                        <div className="input-group input-group-sm">
                          <select className="custom-select custom-select-sm">
                            <option>All Students</option>
                            <option>Top 10 Students</option>
                            <option selected>Top 20 Students</option>
                            <option>Top 100 Students</option>
                          </select>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Table className="table-centered  table-responsive table-nowrap table-hover">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ width: "70px" }}>
                          #
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Center Name</th>
                        <th scope="col">Total Sums</th>
                        <th scope="col">Correct</th>
                        <th scope="col">In Correct</th>
                        <th scope="col">Accuracy</th>
                        <th scope="col">Speed</th>
                        <th scope="col">Avg Time/sum</th>
                        <th scope="col">Points</th>
                        <th scope="col">Rank</th>
                        <th scope="col">More Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr key={"_user_" + i}>
                          <td>{i + 1}</td>
                          <td>
                            <span className=" mb-1">{user.first_name}</span>
                          </td>
                          <td>{user.centerName}</td>
                          <td>{user.totalSums}</td>
                          <td>{user.correct}</td>
                          <td>{user.inCorrect}</td>
                          <td>{user.accuracy}</td>
                          <td>{user.speed}</td>
                          <td>{user.avgTimePerSum}</td>
                          <td>{user.points}</td>
                          <td>{user.rank}</td>
                          <td>
                            <span id={`moreInfo_` + i}>
                              <i className="bx bx-message-square-dots"></i>
                              <UncontrolledTooltip
                                placement="top"
                                target={`moreInfo_` + i}
                              >
                                More Info
                              </UncontrolledTooltip>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(ACLResults);
