import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = (props) => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col>{new Date().getFullYear()} © Pro Abacus.</Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
