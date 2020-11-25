import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

const FooterLink = (props) => {
  return (
    <React.Fragment>
      <Row className="pb-3 pt-4">
        <Col
          sm="12"
          md="6"
          lg="6"
          className="text-center text-sm-center text-md-left"
        >
          <p className="mb-2">{new Date().getFullYear()} © Pro Abacus</p>
          <p>
            Our vision is to provide a reliable and technically advanced
            platform, delicately for the students, teachers or any one who is
            very interested in taking their Abacus skills to next levels.
          </p>
        </Col>
        <Col
          sm="12"
          md="6"
          lg="6"
          className="text-center text-sm-center text-md-right"
        >
          <div className="mb-0">
            <div className="mb-4 h4 text-white">Connect with Us</div>
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
    </React.Fragment>
  );
};

export default FooterLink;
