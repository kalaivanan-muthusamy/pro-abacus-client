import React, { useRef, useState } from "react";
import { Container, Row, Card, CardBody, Col, Alert, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import { useEffect } from "react";
import { getErrorMsg, getRequest, putRequest } from "../../helpers/apiRequest";
import { AvForm, AvField } from "availity-reactstrap-validation";
import toastr from "toastr";
import { ROLES } from "../../contants";

function Profile(props) {
  const [profileDetails, setProfileDetails] = useState(null);
  const [levels, setLevels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [role] = useState(localStorage.getItem("role"));
  const errorRef = useRef();
  const profileImageRef = useRef();

  useEffect(() => {
    getProfileDetails();
    getAllLevels();
  }, []);

  function getPath() {
    let path;
    if (role === ROLES.STUDENT) {
      path = "students";
    } else if (role === ROLES.TEACHER) {
      path = "teachers";
    } else if (role === ROLES.ADMIN) {
      path = "admins";
    }
    return path;
  }

  async function getProfileDetails() {
    try {
      setLoading(true);
      const { error, res } = await getRequest(getPath());
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the profile details"));
        setLoading(false);
        return;
      }
      setProfileDetails(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the profile details"));
    }
    setLoading(false);
  }

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

  async function updateProfileDetails(event, formInputs) {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", formInputs?.name);
      formData.append("email", formInputs?.email);
      if (formInputs?.gender) formData.append("gender", formInputs?.gender);
      if (formInputs?.age) formData.append("age", formInputs?.age);
      if (formInputs?.newPassword)
        formData.append("password", formInputs?.newPassword);
      if (formInputs?.levelId) formData.append("levelId", formInputs?.levelId);
      if (role === ROLES.TEACHER)
        formData.append("centerName", formInputs?.centerName);
      profileImageRef?.current?.files?.length > 0 &&
        formData.append("profileImage", profileImageRef?.current?.files?.[0]);
      const { error } = await putRequest(getPath(), formData);
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't update the profile details"));
        errorRef?.current?.focus();
        setLoading(false);
        return;
      }
      toastr.info("Profile details updated successfully");
    } catch (err) {
      errorRef?.current?.focus();
      setErrorMsg(getErrorMsg(err, "Couldn't update the profile details"));
    }
    setLoading(false);
  }

  function confirmPasswordValidation(value, context) {
    if (context?.newPassword === context?.confirmPassword) return true;
    return "Confirm password must be same as new password";
  }

  function updateFileName() {
    setFileName(profileImageRef?.current?.files?.[0]?.name || "Choose File");
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Profile")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {loading && (
                    <div className="spinner-overlay">
                      <div className="spinner" />
                    </div>
                  )}

                  <div ref={errorRef} tabIndex="-1">
                    {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                  </div>

                  {profileDetails && (
                    <AvForm
                      onValidSubmit={updateProfileDetails}
                      className="needs-validation"
                    >
                      <AvField
                        grid={{ xs: 10 }}
                        label="Name"
                        name="name"
                        type="name"
                        value={profileDetails?.name}
                        required
                      />
                      {role === ROLES.TEACHER && (
                        <AvField
                          grid={{ xs: 10 }}
                          label="Center Name"
                          name="centerName"
                          type="text"
                          value={profileDetails?.centerName}
                          required
                        />
                      )}
                      <AvField
                        grid={{ xs: 10 }}
                        label="Email Address"
                        name="email"
                        type="email"
                        value={profileDetails?.email}
                        required
                      />
                      {role !== ROLES.ADMIN && (
                        <React.Fragment>
                          <AvField
                            grid={{ xs: 10 }}
                            defaultValue={profileDetails?.gender}
                            selected={profileDetails?.gender}
                            required
                            type="select"
                            name="gender"
                            label="Gender"
                          >
                            <option>Male</option>
                            <option>Female</option>
                          </AvField>
                          <AvField
                            grid={{ xs: 10 }}
                            label="Age"
                            name="age"
                            type="age"
                            value={profileDetails?.age}
                            required
                          />
                        </React.Fragment>
                      )}
                      <AvField
                        grid={{ xs: 10 }}
                        label="New Password"
                        name="newPassword"
                        type="password"
                        helpMessage="Leave it blank to use old password"
                      />
                      <AvField
                        grid={{ xs: 10 }}
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        validate={{
                          myValidation: confirmPasswordValidation,
                          match: { value: "newPassword" },
                        }}
                        helpMessage="Leave it blank to use old password"
                      />
                      <div className="form-group row">
                        <label for="profileImage" class="col-2 col-form-label">
                          Profile Image
                        </label>
                        <div className="col-md-10">
                          <div className="custom-file">
                            <input
                              ref={profileImageRef}
                              id="profileImage"
                              name="profileImage"
                              className="custom-file-input"
                              type="file"
                              onChange={updateFileName}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="profileImage"
                            >
                              {fileName}
                            </label>
                          </div>
                          <small class="form-text text-muted">
                            Max file size: 1MB
                          </small>
                        </div>
                      </div>
                      {role === ROLES.STUDENT && (
                        <React.Fragment>
                          <AvField
                            grid={{ xs: 10 }}
                            defaultValue={profileDetails?.levelId}
                            selected={profileDetails?.levelId}
                            required
                            type="select"
                            name="levelId"
                            label="Levels"
                            helpMessage={
                              <span className="text-warning">
                                * To upgrade to next level, you must complete 2+
                                WCL Exams with 50+ Percentile score
                              </span>
                            }
                          >
                            {levels?.map?.((level) => (
                              <option value={level._id}>{level.name}</option>
                            ))}
                          </AvField>
                        </React.Fragment>
                      )}
                      <div className="form-group row">
                        <div className="col-md-10 pt-2">
                          <Button
                            color="primary"
                            className="mt-3"
                            type="submit"
                          >
                            Update Profile
                          </Button>
                        </div>
                      </div>
                    </AvForm>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default withNamespaces()(Profile);
