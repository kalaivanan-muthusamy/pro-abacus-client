import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";

import defaultUserImg from "../../../assets/images/user.svg";
import { getCompleteAssetPath } from "../../../helpers/common";

const ProfileMenu = (props) => {
  const [menu, setMenu] = useState(false);
  const [userName, setUserName] = useState("Admin");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setUserName(localStorage.getItem("name"));
    }
  }, [props.success]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={
              props?.profileDetails?.profileImage
                ? getCompleteAssetPath(props?.profileDetails?.profileImage)
                : defaultUserImg
            }
            alt="Avatar"
          />
          <span className="d-none d-xl-inline-block ml-2 mr-1">{userName}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={() => history.push("/profile")}
            tag="a"
            href="#"
          >
            <i className="bx bx-user font-size-16 align-middle mr-1"></i>
            {props.t("Profile")}{" "}
          </DropdownItem>
          <div className="dropdown-divider"></div>

          {localStorage.getItem("role") === "STUDENT" && (
            <DropdownItem
              tag="a"
              href="#"
              onClick={props.onJoinClassBtnClick}
              className="dropdown-item pt-2 pb-2"
            >
              <i className="bx bx-credit-card-front font-size-16 align-middle mr-1"></i>
              {props?.profileDetails?.batchId ? "Change Batch" : "Join Batch"}
            </DropdownItem>
          )}
          <Link to="/acl-results" className="dropdown-item pt-2 pb-2">
            <i className="bx bx-trophy"></i> ACL Results
          </Link>
          <Link to="/wcl-results" className="dropdown-item pt-2 pb-2">
            <i className="bx bx-shield"></i> WCL Results
          </Link>
          <Link to="/logout" className="dropdown-item pt-2 pb-2">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { profileDetails } = state.Profile;
  return { profileDetails };
};

export default withRouter(
  connect(mapStateToProps, {})(withNamespaces()(ProfileMenu))
);
