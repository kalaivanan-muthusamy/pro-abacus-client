import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import { Link } from "react-router-dom";

// import images
import logoImg from "../../assets/images/logo.png";
import {
  getErrorMsg,
  getRequest,
  postRequest,
} from "./../../helpers/apiRequest";
import { useRef } from "react";

const Register = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("STUDENT");
  const [levels, setLevels] = useState(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    getAllLevels();
  }, []);

  async function getAllLevels() {
    try {
      setLoading(true);
      const { error, res } = await getRequest("levels");
      if (error) {
        setLoading(false);
        return setErrorMsg(
          getErrorMsg(error, "Unable to get the levels for registration")
        );
      }
      setLevels(res);
    } catch (err) {
      setErrorMsg("Unable to get the levels for registration");
    }
    setLoading(false);
  }

  async function handleValidSubmit(event, values) {
    console.log(values);
    try {
      setLoading(true);
      setSuccessMsg(null);
      setErrorMsg(null);
      let error;
      delete values.role;
      delete values.confirmPassword;
      if (role === "STUDENT") {
        const { error: studentRegisterErr } = await postRequest(
          "students",
          values
        );
        error = studentRegisterErr;
      } else {
        const { error: teacherRegisterErr } = await postRequest(
          "teachers",
          values
        );
        error = teacherRegisterErr;
      }
      if (error) {
        setLoading(false);
        setErrorMsg(
          getErrorMsg(
            error,
            "Unable to register at the moment!. Kindly try again later"
          )
        );
        notificationRef?.current?.focus();
        return;
      }
      setSuccessMsg(
        <span>
          Registration successful. Kindly verify your email and{" "}
          <Link to={`/login/${role?.toLowerCase()}`}>Click here</Link> to login
        </span>
      );
      notificationRef?.current?.focus();
    } catch (err) {}
    setLoading(false);
  }

  function confirmPasswordValidation(value, context) {
    if (context?.password === context?.confirmPassword) return true;
    return "Confirm password must be same as new password";
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
                        <h5 className="">Register</h5>
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
                          src={logoImg}
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
                      <div tabIndex="-1" ref={notificationRef}>
                        {successMsg && (
                          <Alert color="success">{successMsg}</Alert>
                        )}
                        {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                      </div>

                      <div className="form-group">
                        <AvField
                          name="role"
                          label="Role"
                          className="form-control"
                          type="select"
                          onChange={(e) => setRole(e.target.value)}
                          required
                          defaultValue="STUDENT"
                        >
                          <option value="STUDENT">Student</option>
                          <option value="TEACHER">Teacher</option>
                        </AvField>
                      </div>

                      <div className="form-group">
                        <AvField
                          name="name"
                          label="Name"
                          className="form-control"
                          placeholder="Enter Name"
                          type="text"
                          required
                        />
                      </div>

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

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          validate={{
                            required: true,
                            myValidation: confirmPasswordValidation,
                            match: { value: "password" },
                          }}
                          placeholder="Confirm Password"
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          defaultValue="Male"
                          required
                          type="select"
                          name="gender"
                          label="Gender"
                          selected="Male"
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </AvField>
                      </div>

                      <div className="form-group">
                        <AvField
                          name="age"
                          label="Age"
                          className="form-control"
                          placeholder="Enter Age"
                          type="number"
                          required
                        />
                      </div>

                      {role === "STUDENT" && levels?.length > 0 && (
                        <div className="form-group">
                          <AvField
                            name="levelId"
                            label="Level"
                            className="form-control"
                            type="select"
                            required
                            defaultValue={levels?.[0]?._id}
                          >
                            {levels?.map?.((level) => (
                              <option value={level._id}>{level.name}</option>
                            ))}
                          </AvField>
                        </div>
                      )}

                      {role === "TEACHER" && (
                        <div className="form-group">
                          <AvField
                            name="centerName"
                            label="Center Name"
                            className="form-control"
                            placeholder="Center Name"
                            type="text"
                            required
                          />
                        </div>
                      )}

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link
                    to={`/login/${role.toLowerCase()}`}
                    className="font-weight-medium text-primary"
                  >
                    Login
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

export default Register;
