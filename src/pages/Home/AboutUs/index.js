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
                <p>
                  ProAbacus.com was launched in the year 2020 and its keep
                  growing in steady phase with all your support and wishes.Our
                  vision is to provide a reliable and technically advanced
                  platform, delicately for the students, teachers or any one who
                  is very interested in taking their Abacus skills to next
                  levels.
                </p>
                <Row className="mt-5">
                  <Col className="text-left" lg="3" xs="6">
                    <div>
                      <h4>1,200</h4>
                      <p>Students</p>
                    </div>
                  </Col>
                  <Col className="text-left" lg="3" xs="6">
                    <div>
                      <h4>2,300</h4>
                      <p>Centers</p>
                    </div>
                  </Col>
                  <Col className="text-left" lg="3" xs="6">
                    <div>
                      <h4>50,000</h4>
                      <p>Sums Solved</p>
                    </div>
                  </Col>
                  <Col className="text-left" lg="3" xs="6">
                    <div>
                      <h4>1,852</h4>
                      <p>Tests</p>
                    </div>
                  </Col>
                </Row>
                <hr />
              </div>
              <Row>
                <Col>
                  <p className="text-muted">
                    <b>Payment related queries</b>: payments@proabacus.com
                  </p>
                  <p className="text-muted">
                    <b>Any other queries</b>: support@proabacus.com
                  </p>
                </Col>
                <Col>
                  <div className="text-center">
                    <span className="h4 mb-0 mr-3">Connect with Us: </span>{" "}
                    <br />
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
            </Col>
            <Col sm="12" lg="6">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/LRll8vJJXgM"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
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
