import React, { useRef, useState } from "react";
import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap";
import { withRouter, Link, useParams } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import logo from "../../assets/images/pa-icon-light.png";
import { getErrorMsg, postRequest } from "../../helpers/apiRequest";

const ForgetPasswordPage = (props) => {
  const { role } = useParams();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef();

  async function handleValidSubmit(event, values) {
    try {
      setLoading(true);
      const { error } = await postRequest(`${role}s/forgot-password-request`, {
        email: values.email,
      });
      if (error) {
        setLoading(false);
        setErrorMsg(
          getErrorMsg(error, "Couldn't initiate forgot password request")
        );
        notificationRef?.current?.focus();
      } else {
        setLoading(false);
        setSuccessMsg(
          "Reset password link has been sent successfully to the email"
        );
        notificationRef?.current?.focus();
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(
        getErrorMsg(err, "Couldn't initiate forgot password request")
      );
      notificationRef?.current?.focus();
    }
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                {loading && (
                  <div className="spinner-overlay">
                    <div className="spinner" />
                  </div>
                )}
                <div className="bg-soft-primary">
                  <Row>
                    <Col>
                      <div className="p-4">
                        <h5 className="">Forgot Password</h5>
                        <p>Start mastering your skills in Abacus</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle">
                        <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="80"
                        />
                      </span>
                    </div>
                  </div>
                  <div tabIndex="-1" ref={notificationRef}>
                    {successMsg && <Alert color="success">{successMsg}</Alert>}
                    {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal mt-2"
                      onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                    >
                      <div className="form-group">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>
                      <Row className="form-group">
                        <Col className="text-right">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-2 text-center">
                <p>
                  Go back to{" "}
                  <Link
                    to={`/login/${role}`}
                    className="font-weight-medium text-primary"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ForgetPasswordPage);
