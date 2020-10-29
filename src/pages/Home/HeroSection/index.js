import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const HeroSection = (props) => {
  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary"></div>
        <Container>
          <Row className="align-items-center">
            <Col lg="5">
              <div className="text-white-50">
                <h1 className="text-white font-weight-semibold mb-3 hero-title">
                  Pro Abacus - Maths simplified
                </h1>
                <p className="font-size-14">
                  Our vision is to provide a reliable and technically advanced
                  platform, delicately for the Abacus students,teachers or
                  anyone who is very interested in taking their Abacus skills to
                  next levels.
                </p>

                <div className="button-items mt-4">
                  <Link
                    to="/register"
                    className="btn btn-success btn-auto mr-1"
                  >
                    Register with us
                  </Link>
                </div>
              </div>
            </Col>
            <Col lg="5" md="8" sm="10" className="ml-lg-auto">
              <Card className="overflow-hidden mb-0 mt-5 mt-lg-0">
                <CardHeader className="text-center">
                  <h5 className="mb-0">Pro Abacus - Features</h5>
                </CardHeader>
                <CardBody>
                  <ul className="feature-list">
                    <li>
                      <span className="bx bx-check-double text-success" />
                      Practice anytime, anywhere. Complete Online
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Unlimited Practice & Self Test
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Instant & Accurate Result
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Platform with Advanced Technology
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Review your performance
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Collaborate with your friends
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />
                      Participate in Weekly Champions League & Annual Champions
                      League
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <Row className="mt-5 mb-2">
          <Col sm="12" md="8">
            <Row>
              <Col className="text-left" lg="2" xs="6">
                <div>
                  <h4>1,200</h4>
                  <p>Students</p>
                </div>
              </Col>
              <Col className="text-left" lg="2" xs="6">
                <div>
                  <h4>2,300</h4>
                  <p>Centers</p>
                </div>
              </Col>
              <Col className="text-left" lg="2" xs="6">
                <div>
                  <h4>50,000</h4>
                  <p>Sums Solved</p>
                </div>
              </Col>
              <Col className="text-left" lg="2" xs="6">
                <div>
                  <h4>1,852</h4>
                  <p>Tests</p>
                </div>
              </Col>
              <Col>
                <Link to="/register" className="btn btn-success pl-4 pr-4 mr-1">
                  Register
                </Link>
              </Col>
            </Row>
          </Col>
          <Col>
            <div className="text-right">
              <span className="h5 mb-0 mr-3">Connect with Us: </span>
              <a
                className="font-size-24 pr-3 text-info"
                target="_blank"
                href="https://t.me/proabacus"
                data-toggle="tooltip"
                title="Telegram"
              >
                <i className="mdi mdi-telegram"></i>
              </a>
              <a
                className="font-size-24 pr-3 text-info"
                target="_blank"
                href="https://www.facebook.com/proabacusfbpage/"
                data-toggle="tooltip"
                title="Facebook"
              >
                <i className="mdi mdi-facebook"></i>
              </a>
              <a
                className="font-size-24 pr-3 text-info"
                target="_blank"
                href="https://youtu.be/LRll8vJJXgM"
                data-toggle="tooltip"
                title="Youtube"
              >
                <i className="mdi mdi-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr />
      </Container>
    </React.Fragment>
  );
};

export default HeroSection;
