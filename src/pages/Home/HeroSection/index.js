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
                  Why Do You Need Abacus?
                </h1>
                <p className="text-white font-size-16">
                  Advancement of science has taken Artificial intelligence to
                  next level, but hampered our own human intelligence. Most of
                  the time we use to pick up our mobiles for doing simple
                  additions and multiplications. Aren’t You? . But if you ask
                  us, Is this the only reason for Learning Abacus? Answer is
                  “NO”.
                </p>
                <p className="text-white font-size-16">
                  Learning Abacus improves Concentrations, Analytical Thinking
                  and develops self confidence among children. Also it improves
                  your problem solving ability, thinking Speed and helps in
                  brain developments. It Increase Memory power and visualisation
                  skills. If you are interested in abacus and wanted a platform
                  to practice and compete with other smart brains from all
                  around the world, then PROABACUS.COM is right choice for you.
                </p>

                <div className="text-white font-size-16">
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
