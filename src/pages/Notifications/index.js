import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AdminNotifications from "./../Dashboard/AdminNotifications";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";

function Notifications(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Practice")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <AdminNotifications />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(Notifications);
