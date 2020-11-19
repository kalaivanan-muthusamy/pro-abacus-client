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
  Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import classnames from "classnames";
import SubscriptionModel from "./SubscriptionModel";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import ExamPlanModel from "./ExamPlanModel";

function Plans() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [showNewPlanModel, setShowNewPlanModel] = useState(false);
  const [showExamPlanModel, setShowExamPlanModel] = useState(false);
  const [activePlanDetails, setActivePlanDetails] = useState(null);
  const [pricingPlans, setPricingPlans] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getAllPricingPlans();
  }, []);

  async function getAllPricingPlans() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("pricing-plans");
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the notifications right now")
        );
        setLoading(false);
        return;
      }
      setPricingPlans(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the notifications right now"));
    }
    setLoading(false);
  }

  function onPlanModelClose({ refresh }) {
    setActivePlanDetails(null);
    setShowNewPlanModel(false);
    setShowExamPlanModel(false);
    if (refresh) {
      getAllPricingPlans();
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Plans" />
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
                        <span>Subscription Plans</span>
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
                        <span>Exam Price Plans</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="p-3">
                      <Row>
                        <Col sm="12" className="text-right">
                          <Button
                            onClick={() => setShowNewPlanModel(true)}
                            size="sm"
                            color="primary"
                            outline
                            className="mb-2"
                          >
                            Add Subscription Plan
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12">
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>Plan Name</th>
                                  <th>Validity</th>
                                  <th>Basic Price</th>
                                  <th>Discounted Price</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pricingPlans
                                  ?.filter?.(
                                    (p) => p.planType === "SUBSCRIPTION"
                                  )
                                  .map((plan, index) => (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{plan?.name}</td>
                                      <td>{plan?.validity}</td>
                                      <td>
                                        <span className="currency">
                                          {plan?.currencySymbol}
                                        </span>
                                        {plan?.basicPrice}
                                      </td>
                                      <td>
                                        <span className="currency">
                                          {plan?.currencySymbol}
                                        </span>
                                        {plan?.discountedPrice}
                                      </td>
                                      <td>
                                        <Button
                                          onClick={() => {
                                            setActivePlanDetails(plan);
                                            setShowNewPlanModel(true);
                                          }}
                                          size="sm"
                                        >
                                          Edit
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                      <Row>
                        <Col sm="12" className="text-right">
                          <Button
                            onClick={() => setShowExamPlanModel(true)}
                            size="sm"
                            color="primary"
                            outline
                            className="mb-2"
                          >
                            Add Exam Price Plan
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="12">
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                              <thead>
                                <tr>
                                  <th>S.No</th>
                                  <th>Plan Name</th>
                                  <th>Exam Type</th>
                                  <th>Basic Price</th>
                                  <th>Discounted Price</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pricingPlans
                                  ?.filter?.((p) => p.planType === "EXAM_PLAN")
                                  .map((plan, index) => (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{plan?.name}</td>
                                      <td>{plan?.examType}</td>
                                      <td>
                                        <span className="currency">
                                          {plan?.currencySymbol}
                                        </span>
                                        {plan?.basicPrice}
                                      </td>
                                      <td>
                                        <span className="currency">
                                          {plan?.currencySymbol}
                                        </span>
                                        {plan?.discountedPrice}
                                      </td>
                                      <td>
                                        <Button
                                          onClick={() => {
                                            setActivePlanDetails(plan);
                                            setShowExamPlanModel(true);
                                          }}
                                          size="sm"
                                        >
                                          Edit
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
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
      {showNewPlanModel && (
        <SubscriptionModel
          planDetails={activePlanDetails}
          onClose={onPlanModelClose}
        />
      )}
      {showExamPlanModel && (
        <ExamPlanModel
          planDetails={activePlanDetails}
          onClose={onPlanModelClose}
        />
      )}
    </React.Fragment>
  );
}

export default Plans;
