import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";

//i18n
import { withNamespaces } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

import JoinClassModal from "./JoinClassModel";
import { ROLES } from "../../contants";

const Header = (props) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [showJoinClassModel, setShowJoinClassModel] = useState(false);
  const role = localStorage.getItem("role");

  function tToggle() {
    props.toggleLeftmenu(!props.leftMenu);
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile);
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile);
    }
  }

  function onJoinClassBtnClick() {
    setShowJoinClassModel(true);
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex justify-content-center align-items-center">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoLightPng} alt="" height="19" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>
            {localStorage.getItem("role") === "STUDENT" && (
              <Button
                onClick={onJoinClassBtnClick}
                color="light"
                outline
                className="waves-effect"
              >
                Join Your Class
              </Button>
            )}
            <Link to="/acl-results" className="pl-3 text-muted font-size-12">
              ACL Results
            </Link>
            <Link to="/wcl-results" className="pl-3 text-muted font-size-12">
              WCL Results
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {role !== ROLES.ADMIN && (
              <Button color="warning" outline className="waves-effect">
                Payment
              </Button>
            )}
            <ProfileMenu />
          </div>
        </div>
        {showJoinClassModel && (
          <JoinClassModal onClose={() => setShowJoinClassModel(false)} />
        )}
      </header>
    </React.Fragment>
  );
};
const mapStatetoProps = (state) => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withNamespaces()(Header));
