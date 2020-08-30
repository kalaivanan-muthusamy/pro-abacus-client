import React, { useState } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import classnames from "classnames";
import WCLPerformance from "./WCLPerformance";

const series = [
  { name: "series1", data: [31, 40, 36, 51, 49, 72, 69, 56, 68, 82, 68, 76] },
];

const options = {
  chart: {
    toolbar: "false",
    dropShadow: {
      enabled: !0,
      color: "#000",
      top: 18,
      left: 7,
      blur: 8,
      opacity: 0.2,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  colors: ["#556ee6"],
  stroke: {
    curve: "smooth",
    width: 3,
  },
};

const donutSeries = [56, 38, 26];
const donutOptions = {
  labels: ["Series A", "Series B", "Series C"],
  colors: ["#556ee6", "#34c38f", "#f46a6a"],
  legend: { show: !1 },
  plotOptions: {
    pie: {
      donut: {
        size: "70%",
      },
    },
  },
};

function MyPerformance(props) {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("My Performance")} />
          <Row>
            <Col sm="12">
              {/* Weekly Assessment */}
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className="mb-4 float-left">
                        Weekly Assessment
                      </CardTitle>
                      <div className="float-right">
                        <div className="input-group input-group-sm">
                          <select className="custom-select custom-select-sm">
                            <option defaultValue>All</option>
                            <option value="1">Addition & Subtraction</option>
                            <option value="2">Multiplication</option>
                            <option value="3">Division</option>
                          </select>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <Row>
                      <Col sm="12" md="8">
                        <ReactApexChart
                          series={series}
                          options={options}
                          type="line"
                          height={250}
                        />
                      </Col>
                      <Col sm="12" md="4">
                        <ReactApexChart
                          options={donutOptions}
                          series={donutSeries}
                          type="donut"
                          height={200}
                        />
                      </Col>
                    </Row>
                    <Row className="pl-3 text-center">
                      <Col xs="4">
                        <div className="mt-4">
                          <p className="mb-2 text-truncate">
                            <i className="mdi mdi-circle text-primary mr-1"></i>{" "}
                            Total Sum
                          </p>
                          <h5>120</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="mt-4">
                          <p className="mb-2 text-truncate">
                            <i className="mdi mdi-circle text-success mr-1"></i>
                            Avg.Accuracy
                          </p>
                          <h5>18</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="mt-4">
                          <p className="mb-2 text-truncate">
                            <i className="mdi mdi-circle text-danger mr-1"></i>
                            Avg.Speed
                          </p>
                          <h5>90</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Detailed Reports</CardTitle>
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
                        <span className="d-none d-sm-block">
                          WCL Performance
                        </span>
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
                        <span className="d-none d-sm-block">
                          ACL Performance
                        </span>
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
                        <span className="d-none d-sm-block">
                          Assessment Performance
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="p-3">
                      <Row>
                        <Col sm="12">
                          <CardText>
                            <WCLPerformance />
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                      <Row>
                        <Col sm="12">
                          <WCLPerformance />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                      <Row>
                        <Col sm="12">
                          <WCLPerformance />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4" className="p-3">
                      <Row>
                        <Col sm="12">
                          <WCLPerformance />
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

export default withNamespaces()(MyPerformance);
