import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const AboutUs = (props) => {
  return (
    <React.Fragment>
      <section className="section pt-4 bg-white" id="about">
        <Container>
          <Row className="">
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">About us</div>
                <h4>Who is Pro Abacus?</h4>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col sm="12" lg="6">
              <div className="text-muted">
                <h4 className="mb-3">Our Journey</h4>
                <p>
                  ProAbacus.com was Launched in the year 2020 and its keep
                  growing in steady phase with all your support and wishes.Our
                  vision is to provide a reliable and technically advanced
                  platform, delicately for the Abacus students,teachers or
                  anyone who is very interested in taking their Abacus skills to
                  next levels.
                </p>
                <Row>
                  <Col sm="4">
                    <Card className="border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-check h2 text-success"></i>
                        </div>
                        <h5>Feature 1</h5>
                        <p className="text-muted mb-0">
                          At vero eos et accusamus et iusto blanditiis
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card className="border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-check h2 text-success"></i>
                        </div>
                        <h5>Feature 2</h5>
                        <p className="text-muted mb-0">
                          At vero eos et accusamus et iusto blanditiis
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col sm="4">
                    <Card className="border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-check h2 text-success"></i>
                        </div>
                        <h5>Feature 3</h5>
                        <p className="text-muted mb-0">
                          At vero eos et accusamus et iusto blanditiis
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col sm="12" lg="6">
              <div class="video-container">
                <iframe
                  src="https://www.youtube.com/embed/LRll8vJJXgM"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
