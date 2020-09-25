import React from "react";
import { Container, Row, Card, CardBody, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import ExamConfigurations from "../../components/Exam/ExamConfigurations";

function Assessment(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Assessment")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <ExamConfigurations examType="ASSESSMENT" />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(Assessment);
