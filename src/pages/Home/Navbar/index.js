import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Images
import logodark from "../../../assets/images/logo-full-dark.png";
import logolight from "../../../assets/images/logo-full.png";

const navItems = [
  { id: 1, idnm: "home", navheading: "Home" },
  { id: 2, idnm: "about", navheading: "About" },
  { id: 3, idnm: "pricing", navheading: "Pricing" },
  // { id: 3, idnm: "gallery", navheading: "Gallery" },
  // { id: 4, idnm: "team", navheading: "Join Us" },
  // { id: 5, idnm: "news", navheading: "Contact" },
];

const Navbar_Page = (props) => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
  let TargetId = navItems.map((item) => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <Navbar
        expand="lg"
        fixed="top"
        className={"navigation sticky " + props.navClass}
      >
        <Container>
          <NavbarBrand className="navbar-logo" href="/">
            {props.imglight !== true ? (
              <img
                src={logodark}
                alt=""
                height="35"
                className="logo logo-dark"
              />
            ) : (
              <img
                src={logolight}
                alt=""
                height="35"
                className="logo logo-light"
              />
            )}
          </NavbarBrand>

          <NavbarToggler
            className="p-0"
            onClick={() => {
              setisOpenMenu();
            }}
          >
            <i className="fa fa-fw fa-bars"></i>
          </NavbarToggler>

          <Collapse id="topnav-menu-content" isOpen={isOpenMenu} navbar>
            <ScrollspyNav
              scrollTargetIds={TargetId}
              scrollDuration="1500"
              headerBackground="true"
              activeNavClass="active"
              className="navbar-collapse"
            >
              <Nav className="ml-auto navbar-nav" id="topnav-menu">
                {navItems.map((item, key) => (
                  <NavItem
                    key={key}
                    className={item.navheading === "Home" ? "active" : ""}
                  >
                    <NavLink href={"#" + item.idnm}> {item.navheading}</NavLink>
                  </NavItem>
                ))}
              </Nav>
            </ScrollspyNav>
            {localStorage.getItem("role") ? (
              <Link to="/dashboard" className="btn btn-primary w-xs mr-2">
                Dashboard
              </Link>
            ) : (
              <div className="ml-lg-2">
                <Link
                  to="/login/student"
                  className="btn btn-primary w-xs mr-2"
                >
                  Student Login
                </Link>
                <Link to="/login/teacher" className="btn btn-primary w-xs">
                  Teacher Login
                </Link>
              </div>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default Navbar_Page;
