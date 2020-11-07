import React from "react";
import { Col, Card, CardBody, Media, Button } from "reactstrap";

const PricingCard = ({ activeSubscription, pricing, onInitiate }) => {
  const isActivePlan = activeSubscription?.pricingPlanId === pricing._id;

  return (
    <React.Fragment>
      <Col xl="3" md="6">
        <Card className={`plan-box ${isActivePlan ? "active" : ""}`}>
          <CardBody className="p-4">
            <Media>
              <Media body>
                <h5>{pricing?.name}</h5>
                <p className="text-muted">for {pricing?.validity} days</p>
              </Media>
              <div className="ml-3">
                <i className={"bx " + pricing?.icon + " h1 text-primary"}></i>
              </div>
            </Media>
            <div className="py-4">
              <h2>
                <sup>
                  <small className="currency">{pricing?.currencySymbol}</small>
                </sup>{" "}
                {pricing?.discountedPrice}/{" "}
                <strike className="font-size-13">
                  <small className="currency">{pricing?.currencySymbol}</small>
                  {pricing?.basicPrice}
                </strike>
              </h2>
            </div>
            <div className="text-center plan-btn">
              <Button
                onClick={() => onInitiate(pricing)}
                color="primary"
                className="waves-effect waves-light"
              >
                {isActivePlan ? "Renew" : "Pay Now"}
              </Button>
            </div>
            <div className="text-center mt-3 text-primary">
              {isActivePlan ? "This is your current plan" : ""}
            </div>

            {/* <div className="plan-features mt-5">
              {pricing?.features.map((feature, key) => (
                <p key={"_feature_" + key}>
                  <i className="bx bx-checkbox-square text-primary mr-2"></i>{" "}
                  {feature.title}
                </p>
              ))}
            </div> */}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default PricingCard;
