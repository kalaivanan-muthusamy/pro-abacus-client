import React, { Component } from "react";
import { Card, CardBody, CardTitle, Media } from "reactstrap";
import { Link } from "react-router-dom";

class AdminNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Admin Notifications</CardTitle>
            <ul className="verti-timeline list-unstyled">
              <li className="event-list">
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"></i>
                </div>
                <Media>
                  <div className="mr-3">
                    <p className="font-size-12 mb-0">
                      <b>22 Nov</b>
                    </p>
                    <div>Responded to need “Volunteer Activities</div>
                  </div>
                  <Media body></Media>
                </Media>
              </li>

              <li className="event-list">
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"></i>
                </div>
                <Media>
                  <div className="mr-3">
                    <p className="font-size-12 mb-0">
                      <b>22 Nov</b>
                    </p>
                    <div>Responded to need “Volunteer Activities</div>
                  </div>
                  <Media body></Media>
                </Media>
              </li>

              <li className="event-list">
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"></i>
                </div>
                <Media>
                  <div className="mr-3">
                    <p className="font-size-12 mb-0">
                      <b>22 Nov</b>
                    </p>
                    <div>Responded to need “Volunteer Activities</div>
                  </div>
                  <Media body></Media>
                </Media>
              </li>
            </ul>
            <div className="text-center mt-4">
              <Link
                to=""
                className="btn btn-primary waves-effect waves-light btn-sm"
              >
                View More <i className="mdi mdi-arrow-right ml-1"></i>
              </Link>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default AdminNotifications;
