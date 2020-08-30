import React, { Component } from "react";
import { Card, CardBody, CardTitle, Media, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

class WCLNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="pb-5">
              WCL Star of the week: 12-10-2020
            </CardTitle>
            <div className="text-center">
              <div className="avatar-md profile-user-wid mb-2 mx-auto">
                <img
                  src={avatar4}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">Ramya Krishnan</h5>
              <p className="text-muted mb-1 text-truncate">Student Id: 2635</p>
              <p className="text-muted mb-0 text-truncate">Level 2</p>
            </div>
            <Row className="pl-3 text-center">
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-primary mr-1"></i> Rank
                  </p>
                  <h5>1</h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-secondary mr-1"></i> Total
                    Sum
                  </p>
                  <h5>120</h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-success mr-1"></i>
                    Avg.Accuracy
                  </p>
                  <h5>18</h5>
                </div>
              </Col>
              <Col xs="6">
                <div className="mt-4">
                  <p className="mb-2 text-truncate">
                    <i className="mdi mdi-circle text-danger mr-1"></i>Avg.Speed
                  </p>
                  <h5>90</h5>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default WCLNotifications;
