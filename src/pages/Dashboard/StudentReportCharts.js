import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { getRequest } from "../../helpers/apiRequest";
import ReactApexChart from "react-apexcharts";

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

const StudentReportCharts = (props) => {
  return (
    <React.Fragment>
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
                    <i className="mdi mdi-circle text-primary mr-1"></i> Total
                    Sum
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
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>90</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      {/* Self Test */}
      <Card>
        <CardBody>
          <Row>
            <Col>
              <CardTitle className="mb-4 float-left">Self Test</CardTitle>
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
                    <i className="mdi mdi-circle text-primary mr-1"></i> Total
                    Sum
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
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>90</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      {/* Practices */}
      <Card>
        <CardBody>
          <Row>
            <Col>
              <CardTitle className="mb-4 float-left">Practices</CardTitle>
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
                    <i className="mdi mdi-circle text-primary mr-1"></i> Total
                    Sum
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
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>90</h5>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default StudentReportCharts;
