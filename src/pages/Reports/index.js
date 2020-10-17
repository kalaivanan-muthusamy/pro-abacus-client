import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import classnames from "classnames";
import { EXAM_TYPES } from "../../contants";
import ExamReports from "./ExamReports";

function Reports(props) {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Reports")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Nav tabs className="nav-tabs-custom">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          setActiveTab("1");
                        }}
                      >
                        <span className="d-none d-sm-block">Self Test</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          setActiveTab("2");
                        }}
                      >
                        <span className="d-none d-sm-block">Assessment</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          setActiveTab("3");
                        }}
                      >
                        <span className="d-none d-sm-block">WCL</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          setActiveTab("4");
                        }}
                      >
                        <span className="d-none d-sm-block">ACL</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="p-3">
                      <Row>
                        <Col sm="12">
                          <CardText>
                            <ExamReports examType={EXAM_TYPES.SELF_TEST} />
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                      <Row>
                        <Col sm="12">
                          <ExamReports examType={EXAM_TYPES.ASSESSMENT} />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                      <Row>
                        <Col sm="12">
                          <ExamReports examType={EXAM_TYPES.WCL} />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4" className="p-3">
                      <Row>
                        <Col sm="12">
                          <ExamReports examType={EXAM_TYPES.ACL} />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(Reports);
