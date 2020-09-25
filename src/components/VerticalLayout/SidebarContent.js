import React, { useEffect } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";
import { ROLES } from "../../contants";

const SidebarContent = (props) => {
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  const role = localStorage.getItem("role");

  useEffect(() => {
    var pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li className="menu-title">{props.t("Menu")} </li>
          <li>
            <Link to="/dashboard" className="waves-effect">
              <i className="bx bx-home-circle"></i>
              <span>{props.t("Dashboards")}</span>
            </Link>
          </li>
          {(role === ROLES.TEACHER || role === ROLES.STUDENT) && (
            <React.Fragment>
              <li>
                <Link to="/my-performance" className="waves-effect">
                  <i className="bx bx-meteor"></i>
                  <span>{props.t("My Performance")}</span>
                </Link>
              </li>
              <li>
                <Link to="/practice" className="waves-effect">
                  <i className="bx bx-outline"></i>
                  <span>{props.t("Practice")}</span>
                </Link>
              </li>
              <li>
                <Link to="/self-test" className="waves-effect">
                  <i className="bx bx-message-alt-check"></i>
                  <span>{props.t("Self Test")}</span>
                </Link>
              </li>
            </React.Fragment>
          )}
          {role === ROLES.TEACHER && (
            <React.Fragment>
              <li>
                <Link to="/assessment" className="waves-effect">
                  <i className="bx bx-message-alt-detail"></i>
                  <span>{props.t("Assessment")}</span>
                </Link>
              </li>

              <li>
                <Link to="/batches" className="waves-effect">
                  <i className="bx bxs-user-detail"></i>
                  <span>{props.t("Batches")}</span>
                </Link>
              </li>
            </React.Fragment>
          )}
          {role === ROLES.ADMIN && (
            <React.Fragment>
              <li>
                <Link to="/levels" className="waves-effect">
                  <i className="bx bx-message-alt-detail"></i>
                  <span>{props.t("Levels")}</span>
                </Link>
              </li>

              <li>
                <Link to="/wcl" className="waves-effect">
                  <i className="bx bxs-user-detail"></i>
                  <span>{props.t("WCL")}</span>
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withNamespaces()(SidebarContent));
