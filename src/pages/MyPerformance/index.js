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
