import React, { useState, useRef } from "react";

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link, useHistory, useParams } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser, apiError } from "../../store/actions";

// import images
import logo from "../../assets/images/logo.png";
import { postRequest, getErrorMsg } from "./../../helpers/apiRequest";

const Login = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef(null);
  const history = useHistory();
  const { role } = useParams();

  async function handleValidSubmit(event, values) {
    try {
      setLoading(true);
      const { error, res } = await postRequest("auth", {
        email: values.email,
        password: values.password,
        role: role.toUpperCase(),
      });
      if (error) {
        setLoading(false);
        return setErrorMsg(getErrorMsg(error, "Unable to login at the moment"));
      }
      localStorage.setItem("role", res?.role);
      localStorage.setItem("name", res?.name);
      localStorage.setItem("email", res?.email);
      localStorage.setItem("accessToken", res?.accessToken);
      history.push("/dashboard");
    } catch (err) {
      setLoading(false);
      setErrorMsg("Unable to login at the moment");
    }
  }

  return (
    <React.Fragment>
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
                        <h5 className="">Login</h5>
                        <p>Start mastering your skill in Abacus</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="80"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v);
                      }}
                    >
                      {props.error && props.error ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="form-group">
                        <AvField
                          name="email"
                          label="Email"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type="password"
                          required
                          placeholder="Enter password"
                        />
                      </div>

                      <div tabIndex="-1" ref={notificationRef}>
                        {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link
                          to={`/forgot-password/${role}`}
                          className="text-muted"
                        >
                          <i className="mdi mdi-lock mr-1"></i> Forgot your
                          password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="font-weight-medium text-primary"
                  >
                    Signup now
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStatetoProps, { loginUser, apiError })(Login)
);
