import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logoLightSvg from "../../assets/images/logo-light.svg";
import { withNamespaces } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

import JoinClassModal from "./JoinClassModel";
import { ROLES } from "../../contants";
import * as moment from "moment-timezone";

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

  function getSubscriptionInfo() {
    if (props?.profileDetails) {
      const expiryAt = props?.profileDetails?.subscriptionDetails?.expiryAt;
      if (!expiryAt)
        return (
          <span className="text-danger">
            <i className="fas fa-exclamation-circle pr-1" />
            Your don't have any subscriptions
          </span>
        );
      const currentDate = moment.tz("Asia/Calcutta");
      const days = parseInt(
        moment.tz(expiryAt, "Asia/Calcutta").diff(currentDate, "days", true)
      );
      if (days < 0) {
        return (
          <span className="text-danger">
            <i className="fas fa-exclamation-circle pr-1" />
            Your plan is expired
          </span>
        );
      } else if (days === 0) {
        return (
          <span className="text-warning">Your plan is expiring today</span>
        );
      } else if (days > 0 && days <= 10) {
        return (
          <span className="text-warning">
            Your plan is expiring in {days} days
          </span>
        );
      } else {
        return (
          <span className="text-muted">
            Your plan is expiring in {days} days
          </span>
        );
      }
    }
    return "";
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex justify-content-center align-items-center">
            <div className="navbar-brand-box d-none d-sm-none d-md-block d-lg-block d-xl-block">
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <div className="d-inline-flex align-items-center justify-content-center mt-5">
                    <img src={logoLightSvg} alt="" height="22" />
                    <span className="h3 m-0 ml-2 text-white">PRO ABACUS</span>
                  </div>
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
            <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
              {localStorage.getItem("role") === "STUDENT" && (
                <Button
                  onClick={onJoinClassBtnClick}
                  color="light"
                  className="waves-effect"
                >
                  {props?.profileDetails?.batchId
                    ? "Change Batch"
                    : "Join Batch"}
                </Button>
              )}
              <Link
                to="/acl-results"
                className="ml-2 text-primary btn btn-light font-size-12"
              >
                <i className="bx bx-trophy"></i> ACL Results
              </Link>
              <Link
                to="/wcl-results"
                className="ml-2 text-primary btn btn-light font-size-12"
              >
                <i className="bx bx-shield"></i> WCL Results
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {role !== ROLES.ADMIN && (
              <React.Fragment>
                <span className="mr-3 d-none d-sm-none d-md-block">
                  {getSubscriptionInfo()}
                </span>
                <small className="mr-3 d-block d-sm-block d-md-none">
                  {getSubscriptionInfo()}
                </small>

                <div className="mr-3 d-none d-sm-none d-md-block">
                  <Link
                    to="/subscriptions"
                    className="btn btn-outline-warning waves-effect"
                  >
                    Subscriptions
                  </Link>
                </div>

                <div className="d-block d-sm-block d-md-none">
                  <Link
                    to="/subscriptions"
                    className="btn btn-sm btn-outline-warning waves-effect"
                  >
                    Subscriptions
                  </Link>
                </div>
              </React.Fragment>
            )}
            <ProfileMenu
              profileDetails={props?.profileDetails}
              onJoinClassBtnClick={onJoinClassBtnClick}
            />
          </div>
        </div>
        {showJoinClassModel && (
          <JoinClassModal onClose={() => setShowJoinClassModel(false)} />
        )}
      </header>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
    profileDetails: state.Profile.profileDetails,
  };
};

export default connect(mapStateToProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withNamespaces()(Header));
