import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import classnames from "classnames";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { EXAM_TYPES } from "../../contants";
import GroupNotifications from "./GroupNotifications";

function Notifications(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    getAllNotifications();
  }, []);

  async function getAllNotifications() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("notifications");
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the notifications right now")
        );
        setLoading(false);
        return;
      }
      const allNotifications = res;
      const notifications = allNotifications?.filter(
        (n) => n.examType !== EXAM_TYPES.ACL
      );
      setNotifications(notifications);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the notifications right now"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Notifications")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {loading && (
                    <div className="spinner-overlay">
                      <div className="spinner" />
                    </div>
                  )}
                  <Nav tabs className="nav-tabs-custom">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          setActiveTab("1");
                        }}
                      >
                        <span className="d-none d-sm-block">All</span>
                      </NavLink>
                    </NavItem>
                    {localStorage.getItem("role") === "STUDENT" && (
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            setActiveTab("2");
                          }}
                        >
                          <span className="d-none d-sm-block">
                            Exam Notification
                          </span>
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          setActiveTab("3");
                        }}
                      >
                        <span className="d-none d-sm-block">
                          Batch Request Notification
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="p-3">
                      <Row>
                        <Col sm="12">
                          <GroupNotifications
                            onChange={getAllNotifications}
                            notifications={notifications}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                      <Row>
                        <Col sm="12">
                          <GroupNotifications
                            onChange={getAllNotifications}
                            notifications={notifications?.filter(
                              (n) => n.type === "EXAM_NOTIFICATION"
                            )}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                      <Row>
                        <Col sm="12">
                          <GroupNotifications
                            onChange={getAllNotifications}
                            notifications={notifications?.filter(
                              (n) => n.type === "BATCH_JOIN_NOTIFICATION"
                            )}
                          />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(Notifications);
