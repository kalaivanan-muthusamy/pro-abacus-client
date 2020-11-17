import React, { useRef, useState } from "react";
import { Container, Row, Card, CardBody, Col, Button, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { getErrorMsg } from "../../helpers/apiRequest";
import { postRequest } from "./../../helpers/apiRequest";
import toastr from "toastr";
import { useHistory } from "react-router-dom";

function SendNotifications(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const errorRef = useRef(null);
  const history = useHistory();

  async function sendNotifications(event, notificationDetails) {
    try {
      event?.preventDefault();
      setLoading(true);
      const { error } = await postRequest("notifications", {
        to: notificationDetails.to,
        message: notificationDetails.message,
      });
      if (error) {
        setLoading(false);
        setErrorMsg(getErrorMsg(error, "Couldn't send the notification now"));
        errorRef?.current?.focus();
        return;
      }
      toastr.info("Notification has been sent successfully");
      history.push(`/dashboard`);
    } catch (err) {
      setErrorMsg("Couldn't send the notification now");
      errorRef?.current?.focus();
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Send Notifications" />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {loading && (
                    <div className="spinner-overlay">
                      <div className="spinner" />
                    </div>
                  )}
                  <AvForm
                    className="form-horizontal"
                    onValidSubmit={(e, v) => {
                      sendNotifications(e, v);
                    }}
                  >
                    <div className="form-group row">
                      <label htmlFor="to" className="col-md-2 col-form-label">
                        To
                      </label>
                      <div className="col-md-10 pt-2">
                        <AvField
                          defaultValue="ALL"
                          name="to"
                          type="select"
                          className="form-control"
                          validate={{ required: { value: true } }}
                          id="to"
                        >
                          <option value="ALL">All</option>
                          <option value="STUDENTS">Students</option>
                          <option value="TEACHERS">Teachers</option>
                        </AvField>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="message"
                        className="col-md-2 col-form-label"
                      >
                        Message
                      </label>
                      <div className="col-md-10 pt-2">
                        <AvField
                          required="required"
                          name="message"
                          id="message"
                          type="textarea"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-0">
                      <div className="col-12" ref={errorRef} tabIndex="-1">
                        {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-10 pt-2">
                        <Button color="primary" className="mt-3" type="submit">
                          Send Notification
                        </Button>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default SendNotifications;
