import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Media, Button } from "reactstrap";

const pricingIcons = ["bx-walk", "bx-run", "bx-cycling", "bx-car"];

const CardPricing = ({ index, pricing }) => {
  return (
    <React.Fragment>
      <Col xl="3" md="6">
        <Card className="plan-box bg-white">
          <CardBody className="p-4">
            <Media>
              <Media body>
                <h5>{pricing?.name}</h5>
                <p className="text-muted">for {pricing?.validity} days</p>
              </Media>
              <div className="ml-3">
                <i
                  className={"bx " + pricingIcons[index] + " h1 text-primary"}
                ></i>
              </div>
            </Media>
            <div className="py-4">
              <h2>
                <sup>
                  <small>{pricing?.currencySymbol}</small>
                </sup>{" "}
                {pricing?.discountedPrice}/{" "}
                <strike className="font-size-13">
                  <small>{pricing?.currencySymbol}</small>
                  {pricing?.basicPrice}
                </strike>
              </h2>
            </div>
            <div className="text-center plan-btn">
              <Link
                to="/register"
                className="btn btn-primary btn-sm waves-effect waves-light"
              >
                Register
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default CardPricing;
