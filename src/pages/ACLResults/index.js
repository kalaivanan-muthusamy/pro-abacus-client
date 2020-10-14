import React from "react";
import { Container, Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import ExamResults from "../../components/Exam/ExamResults";

function ACLResults(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("ACL Results")} />
          <Row>
            <Col sm="12">
              <ExamResults examType="ACL" />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(ACLResults);
