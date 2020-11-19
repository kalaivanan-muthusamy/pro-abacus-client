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
  Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import PricingCard from "./PricingCard";
import { postRequest } from "./../../helpers/apiRequest";
import { MDBDataTable } from "mdbreact";
import moment from "moment-timezone";
import SuccessModal from "./SuccessModal";

const columns = [
  {
    label: "S.No",
    field: "sno",
  },
  {
    label: "Subscription Date",
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
    label: "Plan Name",
    field: "planName",
  },
  {
    label: "Amount",
    field: "amount",
  },
  {
    label: "Payment Status",
    field: "paymentStatus",
  },
  {
    label: "Payment Id",
    field: "paymentId",
  },
];

function Subscriptions() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [subscriptionPlans, setSubscriptionPlans] = useState(null);
  const [subscriptionHistories, setSubscriptionHistories] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    getSubscriptionHistories();
    getSubscriptionPlans();
  }, []);

  async function getSubscriptionPlans() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("pricing-plans", {
        planType: "SUBSCRIPTION",
      });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the subscription plan details")
        );
        setLoading(false);
        return;
      }
      setSubscriptionPlans(res);
    } catch (err) {
      setErrorMsg(
        getErrorMsg(err, "Couldn't get the subscription plan details")
      );
    }
    setLoading(false);
  }

  async function getSubscriptionHistories() {
    setLoading(true);
    try {
      const { error, res } = await getRequest(
        "pricing-plans/subscription-history"
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
            </span>{" "}
            {subscription?.transactionDetails?.paymentAmount}
          </span>
        ),
        paymentStatus: subscription?.transactionDetails?.paymentStatus,
        paymentId:
          subscription?.transactionDetails?.transactionDetails
            ?.razorpayPaymentId,
      }));
      setActiveSubscription(getActiveSubscription(subscriptions));
      setSubscriptionHistories(subscriptions);
    } catch (err) {
      setErrorMsg(
        getErrorMsg(err, "Couldn't get the subscription history details")
      );
    }
    setLoading(false);
  }

  function getActiveSubscription(subscriptions) {
    const s = subscriptions.sort((a, b) => {
      const aDate = moment.tz(a?.toDate, "Asia/Calcutta").valueOf();
      const bDate = moment.tz(b?.toDate, "Asia/Calcutta").valueOf();
      if (aDate > bDate) return 1;
      else if (aDate < bDate) return -1;
      else 0;
    });
    return s?.[0];
  }

  async function onInitiate(pricingDetails) {
    setLoading(true);
    try {
      const { res, error } = await postRequest(
        "pricing-plans/initiate-payment",
        {
          pricingPlanId: pricingDetails._id,
        }
      );
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't initiate the payment"));
        setLoading(false);
        return;
      }
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        name: "PRO ABACUS",
        description: "Test Your Abacus Skills Online",
        order_id: res.orderId,
        notes: {
          transactionId: res.transactionId,
        },
        handler: async (response) => {
          try {
            const captureResponse = await postRequest(
              "pricing-plans/complete-payment",
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                paymentStatus: "COMPLETED",
                transactionId: res.transactionId,
              }
            );
            setShowSuccessModal(true);
          } catch (err) {
            console.log(err);
          }
        },
        theme: {
          color: "#556ee6",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't initiate the payment"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Subscriptions" />
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
                        <span>Current Subscriptions</span>
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
                        <span>Subscription History</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="p-3">
                      {subscriptionPlans?.length > 0 && !activeSubscription && (
                        <Alert
                          color="danger"
                          className="alert-dismissible fade show"
                          role="alert"
                        >
                          <i className="mdi mdi-alert-outline mr-2"></i>You
                          don't have any subscription currently. Choose a plan
                          from below for the subscription
                        </Alert>
                      )}
                      <Row>
                        <Col sm="12">
                          <Row className="justify-content-center">
                            <Col lg={6}>
                              <div className="text-center mb-5 mt-3">
                                <h4>Choose your plan</h4>
                                <p className="text-muted">
                                  We made our subscription plans much simpler,
                                  Please choose the one that suites your need
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            {subscriptionPlans?.map((pricingPlan) => (
                              <PricingCard
                                activeSubscription={activeSubscription}
                                onInitiate={onInitiate}
                                pricing={pricingPlan}
                              />
                            ))}
                          </Row>
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
      {showSuccessModal && <SuccessModal />}
    </React.Fragment>
  );
}

export default Subscriptions;
