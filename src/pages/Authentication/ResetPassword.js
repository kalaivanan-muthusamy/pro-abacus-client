import React, { useRef, useState } from "react";
import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap";
import { withRouter, Link, useParams } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import iconLogoLight from "../../assets/images/pa-icon-light.png";
import { getErrorMsg, postRequest } from "../../helpers/apiRequest";

const ResetPassword = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef();
  const { role, email, hash } = useParams();

  function confirmPasswordValidation(value, context) {
    if (context?.password === context?.confirmPassword) return true;
    return "Confirm password must be same as new password";
  }

  async function handleValidSubmit(event, values) {
    try {
      setLoading(true);
      const { error } = await postRequest(`${role}s/reset-password`, {
        password: values.password,
        email: decodeURIComponent(email),
        hash,
      });
      if (error) {
        setLoading(false);
        setErrorMsg(getErrorMsg(error, "Couldn't reset the password!"));
        notificationRef?.current?.focus();
      } else {
        setLoading(false);
        setSuccessMsg(
          <span>
            Password has be reset successfully{" "}
            <Link to={`/login/${role}`}>Click Here</Link> to Login
          </span>
        );
        notificationRef?.current?.focus();
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(getErrorMsg(err, "Couldn't reset the password!"));
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
                        <h5 className="">Reset Password</h5>
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
                          src={iconLogoLight}
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
                  {!successMsg && (
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal mt-2"
                        onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                      >
                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Password"
                            className="form-control"
                            placeholder="Enter password"
                            type="password"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="confirmPassword"
                            label="Confirm Password"
                            className="form-control"
                            placeholder="Enter confirm password"
                            type="password"
                            validate={{
                              myValidation: confirmPasswordValidation,
                              match: { value: "password" },
                            }}
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
                  )}
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

export default withRouter(ResetPassword);
