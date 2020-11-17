import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import { getErrorMsg, getRequest } from "../../../helpers/apiRequest";

//Import Pricing Cards
import CardPricing from "./CardPricing";

const Pricing = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pricingPlans, setPricingPlans] = useState(null);

  useEffect(() => {
    getPricing();
  }, []);

  async function getPricing() {
    try {
      setLoading(true);
      const { res, err } = await getRequest("pricing-plans", {
        planType: "SUBSCRIPTION",
      });
      if (err) {
        setLoading(false);
        console.error(err);
        return setErrorMsg(
          getErrorMsg(
            err,
            "Couldn't get the pricing details now!. Please try again later"
          )
        );
      }
      setPricingPlans(res);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setErrorMsg(
        getErrorMsg(
          err,
          "Couldn't get the pricing details now!. Please try again later"
        )
      );
    }
  }

  return (
    <React.Fragment>
      <section className="section pt-4" id="pricing">
        <Container>
          <Row className="justify-content-center pt-5" id="pricing">
            <Col lg={6}>
              <div className="text-center mb-5">
                <h4>Choose your Pricing plan</h4>
                <p className="text-muted">
                  We made our subscription plans much simpler, Please choose the
                  one that suites your need
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {pricingPlans?.map((pricing, index) => (
              <CardPricing
                pricing={pricing}
                index={index}
                key={"_pricing_" + index}
              />
            ))}
          </Row>
          <Row>
            <p className="text-muted">
              <b>No Refund Policy</b>: As per the nature of our business model,
              Once the order/transaction/subscriptions is Completed, The Payment
              amount cant be cancelled or refunded.
            </p>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default Pricing;
