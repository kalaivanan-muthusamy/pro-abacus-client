import React from "react";
import { Container, Row, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import ExamConfigurations from "../../components/Exam/ExamConfigurations";

function SelfTest(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Self Test")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <ExamConfigurations examType="SELF_TEST" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(SelfTest);
