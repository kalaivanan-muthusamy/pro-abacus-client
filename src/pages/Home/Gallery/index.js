import React from "react";
import { Container, Row, Col } from "reactstrap";

//Import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";

const Gallery = (props) => {
  return (
    <React.Fragment>
      <section className="section bg-white" id="gallery">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Gallery</div>
                <h4>Moments we pass through</h4>
              </div>
            </Col>
          </Row>

          <Col lg="12">
            <div className="hori-timeline">
              <div
                className="owl-carousel owl-theme  navs-carousel events"
                id="timeline-carousel"
              >
                <Row>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar2} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar3} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar8} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar1} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar6} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar7} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar4} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="item">
                      <div className="card text-center team-box mb-0">
                        <div className="card-body">
                          <div>
                            <img src={avatar5} alt="" className="rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Gallery;
