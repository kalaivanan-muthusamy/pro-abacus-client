import React from "react";
import { Container } from "reactstrap";

//Import Components
import FooterLink from "./footer-link";

const Footer = (props) => {
  return (
    <React.Fragment>
      <footer className="landing-footer p-0">
        <Container>
          <hr className="footer-border" />
          <FooterLink />
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
