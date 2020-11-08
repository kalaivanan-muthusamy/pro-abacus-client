import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Media, Button } from "reactstrap";

const pricingIcons = ["bx-walk", "bx-run", "bx-cycling", "bx-car"];

const colors = ["#00A891", "#0291B8", "#D9126B", "#FFE200"];

const CardPricing = ({ index, pricing }) => {
  return (
    <React.Fragment>
      <Col xl="3" md="6">
        <Card className="plan-box">
          <CardBody className="p-4">
            <Media>
              <Media body>
                <h4 style={{ color: colors[index] }}>{pricing?.name}</h4>
                <p className="text-muted">for {pricing?.validity} days</p>
              </Media>
              <div className="ml-3">
                <i
                  style={{ color: colors[index] }}
                  className={"bx " + pricingIcons[index] + " h1"}
                ></i>
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
              <Link
                to="/register"
                style={{ color: "#FFF", background: colors[index] }}
                className="btn waves-effect waves-light"
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
