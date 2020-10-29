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
            <Col lg="6">
              <div className="text-white-50">
                <h1 className="text-white font-weight-semibold mb-3 hero-title">
                  Pro Abacus - Test Your Abacus Skills Online
                </h1>
                <p className="text-white font-size-14">
                  Our vision is to provide a reliable and technically advanced
                  platform, delicately for the Abacus students,teachers or
                  anyone who is very interested in taking their Abacus skills to
                  next levels.
                </p>
                <div className="text-white">
                  You can practice:
                  <ul>
                    <li>Addition</li>
                    <li>Subtraction</li>
                    <li>Multiplication</li>
                    <li>Division</li>
                  </ul>
                </div>

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
                  <ul className="feature-list pl-2">
                    <li>
                      <span className="bx bx-check-double text-success" />
                      Practice Abacus From Anywhere ,Anytime - its Completely
                      Online
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Unlimited Practice and Self Test
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Instant and Accurate Results
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" /> Track
                      and Improve your performance
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Collaborate with your Teacher and Friends
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />{" "}
                      Participate in weekly and Annual Champions Leagues*
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />
                      Win Medals, Certificates, Gifts ,Coupons
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />
                      Platform with Advanced Technology
                    </li>
                    <li>
                      <span className="bx bx-check-double text-success" />
                      Secured and Simple Subscription process
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HeroSection;
