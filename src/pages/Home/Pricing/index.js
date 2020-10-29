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

  const pricings = [
    {
      id: 1,
      title: "Starter",
      description: "Neque quis est",
      icon: "bx-walk",
      price: "19",
      duration: "Per month",
      link: "",
      features: [
        { title: "Free Live Support" },
        { title: "Unlimited User" },
        { title: "No Time Tracking" },
        { title: "Free Setup" },
      ],
    },
    {
      id: 2,
      title: "Professional",
      description: "Quis autem iure",
      icon: "bx-run",
      price: "29",
      duration: "Per month",
      link: "",
      features: [
        { title: "Free Live Support" },
        { title: "Unlimited User" },
        { title: "No Time Tracking" },
        { title: "Free Setup" },
      ],
    },
    {
      id: 3,
      title: "Enterprise",
      description: "Sed ut neque unde",
      icon: "bx-cycling",
      price: "39",
      duration: "Per month",
      link: "",
      features: [
        { title: "Free Live Support" },
        { title: "Unlimited User" },
        { title: "No Time Tracking" },
        { title: "Free Setup" },
      ],
    },
    {
      id: 4,
      title: "Unlimited",
      description: "Itaque earum hic",
      icon: "bx-car",
      price: "49",
      duration: "Per month",
      link: "",
      features: [
        { title: "Free Live Support" },
        { title: "Unlimited User" },
        { title: "No Time Tracking" },
        { title: "Free Setup" },
      ],
    },
  ];
  return (
    <React.Fragment>
      <section className="section pt-4" id="pricing">
        <Container>
          <Row className="justify-content-center pt-5" id="pricing">
            <Col lg={6}>
              <div className="text-center mb-5">
                <h4>Choose your Pricing plan</h4>
                <p className="text-muted">
                  To achieve this, it would be necessary to have uniform
                  grammar, pronunciation and more common words If several
                  languages coalesce
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {pricingPlans?.map((pricing, index) => (
              <CardPricing pricing={pricing} index={index} key={"_pricing_" + index} />
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default Pricing;
