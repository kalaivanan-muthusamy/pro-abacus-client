import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap";
import { getErrorMsg, getRequest } from "../../../helpers/apiRequest";
import classnames from "classnames";
import { SPLITUP_CATEGORY } from "./../../../contants";

function LevelDetails() {
  const [activeTabIndex, setActiveTabIndex] = useState("level_0");
  const [levels, setLevels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLevelDetails();
  }, []);

  async function getLevelDetails() {
    try {
      setLoading(true);
      const { res, err } = await getRequest("levels");
      if (err) {
        setLoading(false);
        return setErrorMsg(
          getErrorMsg(
            err,
            "Couldn't get the level details now!. Please try again later"
          )
        );
      }
      setLevels(res);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setErrorMsg(
        getErrorMsg(
          err,
          "Couldn't get the level details now!. Please try again later"
        )
      );
    }
  }

  function getTotalQuestions(splitUp) {
    const variations = Object.values(splitUp).flat(1);
    const totalQuestions = variations.reduce(
      (acc, cur) => acc + cur.questions,
      0
    );
    return totalQuestions ?? "-";
  }

  return (
    <React.Fragment>
      <section className="section pt-4" id="levelDetails">
        <Container>
          <Row className="">
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Levels</div>
                <h4>Levels for everyone</h4>
              </div>
            </Col>
          </Row>
          <div className="levels-tabs">
            <Row>
              <Col className="col-sm-12 col-md-3">
                <Nav className="flex-column" pills>
                  <NavItem>
                    {levels?.map((level, index) => (
                      <NavLink
                        key={index}
                        className={classnames({
                          active: activeTabIndex === "level_" + index,
                          "p-4": true,
                        })}
                        onClick={() => setActiveTabIndex("level_" + index)}
                      >
                        <p className="font-weight-bold mb-0">{level.name}</p>
                      </NavLink>
                    ))}
                  </NavItem>
                </Nav>
              </Col>
              <Col>
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTabIndex}>
                      {levels?.map((level, index) => (
                        <TabPane key={index} tabId={"level_" + index}>
                          <h5 className="mb-4">
                            <span className="text-secondary">Duration:</span>{" "}
                            <span>{level?.duration} Minutes</span>
                          </h5>
                          <h5 className="mb-4">
                            <span className="text-secondary">
                              Total Questions:
                            </span>{" "}
                            <span>{getTotalQuestions(level?.splitUps)}</span>
                          </h5>
                          <h5 className="mb-3 text-info">
                            Addition & Subtraction
                          </h5>
                          <Row className="mb-3">
                            <Col sm="12" md="6">
                              <table className="table table-bordered table-sm table-hover">
                                <thead>
                                  <tr>
                                    <td>Digits</td>
                                    <td>Rows</td>
                                    <td>Questions</td>
                                    <td>Marks</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {level?.splitUps[
                                    SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION
                                  ]?.map((splitUp) => (
                                    <tr>
                                      <td>{splitUp.digits}</td>
                                      <td>{splitUp.rows}</td>
                                      <td>{splitUp.questions}</td>
                                      <td>{splitUp.marks}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </Col>
                          </Row>
                          {level?.splitUps[SPLITUP_CATEGORY.MULTIPLICATION]
                            ?.length > 0 && (
                            <>
                              <h5 className="text-info mb-3">Multiplication</h5>

                              <Row className="mb-3">
                                <Col sm="12" md="6">
                                  <table className="table table-bordered table-sm table-hover">
                                    <thead>
                                      <tr>
                                        <td>Multiplicand Digits</td>
                                        <td>Multiplier Digits</td>
                                        <td>Questions</td>
                                        <td>Marks</td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {level?.splitUps[
                                        SPLITUP_CATEGORY.MULTIPLICATION
                                      ]?.map((splitUp) => (
                                        <tr>
                                          <td>{splitUp.multiplicandDigits}</td>
                                          <td>{splitUp.multiplierDigits}</td>
                                          <td>{splitUp.questions}</td>
                                          <td>{splitUp.marks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </Col>
                              </Row>
                            </>
                          )}
                          {level?.splitUps[SPLITUP_CATEGORY.DIVISION]?.length >
                            0 && (
                            <>
                              <h5 className="text-info mb-3">Division</h5>
                              <Row className="mb-4">
                                <Col sm="12" md="6">
                                  <table className="table table-bordered table-sm table-hover">
                                    <thead>
                                      <tr>
                                        <td>Dividend Digits</td>
                                        <td>Divisor Digits</td>
                                        <td>Questions</td>
                                        <td>Marks</td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {level?.splitUps[
                                        SPLITUP_CATEGORY.DIVISION
                                      ]?.map((splitUp) => (
                                        <tr>
                                          <td>{splitUp.dividendDigits}</td>
                                          <td>{splitUp.divisorDigits}</td>
                                          <td>{splitUp.questions}</td>
                                          <td>{splitUp.marks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </Col>
                              </Row>
                            </>
                          )}
                        </TabPane>
                      ))}
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default LevelDetails;
