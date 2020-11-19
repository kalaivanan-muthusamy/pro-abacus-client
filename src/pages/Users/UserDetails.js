import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import { studentProperties, teacherProperties } from "./helpers/index";
import { useParams } from "react-router-dom";
import { getErrorMsg, getRequest, putRequest } from "../../helpers/apiRequest";
import { get } from "lodash";
import moment from "moment-timezone";
import { MDBDataTable } from "mdbreact";
import UpdateSubscriptionModal from "./UpdateSubscriptionModal";

const columns = [
  {
    label: "S.No",
    field: "sno",
  },
  {
    label: "Date",
    field: "subscriptionDate",
  },
  {
    label: "Validity From",
    field: "fromDate",
  },
  {
    label: "Validity To",
    field: "toDate",
  },
  {
    label: "Plan",
    field: "planName",
  },
  {
    label: "Amount",
    field: "amount",
  },
  {
    label: "Payment",
    field: "paymentStatus",
  },
  {
    label: "Payment Id",
    field: "paymentId",
  },
];

function UserDetails() {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [subscriptionHistories, setSubscriptionHistories] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const params = useParams();
  const userProperties =
    params?.role === "students" ? studentProperties : teacherProperties;

  useEffect(() => {
    getUserDetails();
    getSubscriptionHistories();
  }, []);

  async function getUserDetails() {
    setLoading(true);
    try {
      const { error, res } = await getRequest(
        `${params.role}/${params?.userId}`
      );
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the user details"));
        setLoading(false);
        return;
      }
      setUserDetails(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the user details"));
    }
    setLoading(false);
  }

  async function getSubscriptionHistories() {
    setLoading(true);
    try {
      const { error, res } = await getRequest(
        "pricing-plans/subscription-history",
        {
          userId: params?.userId,
        }
      );
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the subscription history details")
        );
        setLoading(false);
        return;
      }
      const subscriptions = res?.map?.((subscription, index) => ({
        ...subscription,
        sno: index + 1,
        subscriptionDate: moment
          .tz(subscription?.createdAt, "Asia/Calcutta")
          .format("DD MMM, YYYY HH:mm"),
        fromDate: moment
          .tz(subscription?.fromDate, "Asia/Calcutta")
          .format("DD MMM, YYYY HH:mm"),
        toDate: moment
          .tz(subscription?.toDate, "Asia/Calcutta")
          .format("DD MMM, YYYY HH:mm"),
        planName: subscription?.pricingPlanDetails?.name,
        amount: (
          <span>
            <span className="currency">
              {subscription?.transactionDetails?.currencySymbol}
            </span>
            {subscription?.transactionDetails?.paymentAmount}
          </span>
        ),
        paymentStatus: subscription?.transactionDetails?.paymentStatus,
        paymentId:
          subscription?.transactionDetails?.transactionDetails
            ?.razorpayPaymentId,
      }));
      setSubscriptionHistories(subscriptions);
    } catch (err) {
      setErrorMsg(
        getErrorMsg(err, "Couldn't get the subscription history details")
      );
    }
    setLoading(false);
  }

  function changeSubscriptionExpiry() {
    setShowExtendDialog(true);
  }

  function onSubscriptionModalClose({ refresh }) {
    setShowExtendDialog(false);
    if (refresh) {
      getUserDetails();
    }
  }

  async function onStatusChange(userDetails) {
    setLoading(true);
    try {
      const path = params?.role === "students" ? "students" : "teachers";
      const userIdKey = params?.role === "students" ? "studentId" : "teacherId";
      const { error } = await putRequest(path, {
        enabled: !userDetails?.enabled,
        [userIdKey]: userDetails._id,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the user details"));
        setLoading(false);
        return;
      }
      getUserDetails();
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the user details"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="User Details" />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
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
                        <span>Basic Details</span>
                      </NavLink>
                    </NavItem>
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
                        <span>
                          Subscription History
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="p-3">
                      <Row>
                        <Col sm="12">
                          <Table className="table mb-0 table-responsive table-bordered">
                            <tbody>
                              {userProperties?.map?.((property) => (
                                <tr>
                                  <th scope="row" style={{ width: "400px" }}>
                                    {property.label}
                                  </th>
                                  <td>
                                    {property.formatter?.(
                                      get(userDetails, property.key)
                                    ) ?? get(userDetails, property.key, "-")}
                                    {property.key ===
                                      "subscriptionDetails.expiryAt" && (
                                      <Button
                                        onClick={changeSubscriptionExpiry}
                                        size="sm"
                                        className="ml-2 "
                                      >
                                        <i className="fa fa-edit" />
                                      </Button>
                                    )}
                                    {property.key === "enabled" && (
                                      <>
                                        <span
                                          className={
                                            userDetails?.[property.key]
                                              ? "text-success"
                                              : "text-danger"
                                          }
                                        >
                                          {userDetails?.[property.key]
                                            ? "Enabled"
                                            : "Disabled"}
                                        </span>
                                        <Button
                                          onClick={() =>
                                            onStatusChange(userDetails)
                                          }
                                          size="sm"
                                          color={
                                            userDetails?.[property.key]
                                              ? "danger"
                                              : "success"
                                          }
                                          className="ml-2"
                                        >
                                          {userDetails?.[property.key]
                                            ? "Disable"
                                            : "Enable"}
                                        </Button>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                      <Row>
                        <Col sm="12">
                          <MDBDataTable
                            hover
                            barReverse
                            responsive
                            striped
                            bordered
                            noBottomColumns
                            data={{
                              columns,
                              rows: subscriptionHistories,
                            }}
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
      {showExtendDialog && (
        <UpdateSubscriptionModal
          userType={params.role}
          onClose={onSubscriptionModalClose}
          userDetails={userDetails}
        />
      )}
    </React.Fragment>
  );
}

export default UserDetails;
