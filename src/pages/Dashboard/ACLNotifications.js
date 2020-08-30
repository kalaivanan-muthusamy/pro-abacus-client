import React, { Component } from "react";
import { Card, CardBody, CardTitle, Media, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

class ACLNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">ACL 2020</CardTitle>
            <p className="text-warning">
              * You need to complete 2 Weekly Assessment for participating in
              ACL
            </p>
            <div className="text-center">
              <h4 className="text-primary mb-3">1 Day 1 Hr 20 Min</h4>
              <Link
                to=""
                className="btn btn-primary waves-effect waves-light btn-md"
              >
                Join Now
              </Link>
              <h6 className="mt-3">Date: 24-12-2020 @ 10 AM</h6>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle className="pb-5">ACL 2019 Winners</CardTitle>
            <Row>
              <Col lg="6">
                <div className="avatar-md profile-user-wid mb-2">
                  <img
                    src={avatar1}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">Divya Shankar</h5>
                <p className="text-muted mb-1 text-truncate">
                  Student Id: 27367
                </p>
                <p className="text-muted mb-0 text-truncate">Level 2</p>
              </Col>
              <Col lg="6">
                <div className="avatar-md profile-user-wid mb-2">
                  <img
                    src={avatar2}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">Rahul Prasad</h5>
                <p className="text-muted mb-1 text-truncate">
                  Student Id: 2132
                </p>
                <p className="text-muted mb-0 text-truncate">Level 2</p>
              </Col>
              <Col lg="6" className="mt-5">
                <div className="avatar-md profile-user-wid mb-2">
                  <img
                    src={avatar4}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">Ramya Krishnan</h5>
                <p className="text-muted mb-1 text-truncate">
                  Student Id: 2635
                </p>
                <p className="text-muted mb-0 text-truncate">Level 2</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default ACLNotifications;
