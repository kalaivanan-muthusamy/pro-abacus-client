import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  InputGroup,
  Button,
  Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import { AvForm, AvField } from "availity-reactstrap-validation";
import DatePicker from "react-datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { postRequest } from "./../../helpers/apiRequest";
import toastr from "toastr";
import { useHistory } from "react-router-dom";

const animatedComponents = makeAnimated();

function WCL(props) {
  const [loading, setLoading] = useState(false);
  const [examDetails, setExamDetails] = useState({
    examDate: new Date(),
  });
  const [levelsOption, setLevelsOption] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const errorRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    getAllLevels();
  }, []);

  async function getAllLevels() {
    try {
      const { error, res } = await getRequest("levels");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the exam levels"));
        setLoading(false);
        return;
      }
      const levelsTemp = res.map((level) => ({
        label: level.name,
        value: level._id,
      }));
      setLevelsOption(levelsTemp);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the exam levels"));
    }
  }

  function onInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setExamDetails({
      ...examDetails,
      [name]: value,
    });
  }

  function onDateInputChange(name, value) {
    setExamDetails({
      ...examDetails,
      [name]: value,
    });
  }

  function onMultiSelectChange(name, values) {
    setExamDetails({
      ...examDetails,
      [name]: values,
    });
  }

  async function createWCL(event) {
    try {
      event?.preventDefault();
      setLoading(true);
      const { error } = await postRequest("exams", {
        ...examDetails,
        levelIds: examDetails.levelIds?.map((level) => level.value).join(","),
        examDate: examDetails.examDate?.toISOString(),
        examType: "WCL",
      });
      if (error) {
        setLoading(false);
        setErrorMsg(getErrorMsg(error, "Couldn't schedule the WCL now"));
        errorRef?.current?.focus();
        return;
      }

      toastr.info("WCL has been scheduled successfully");
      history.push(`/dashboard`);
    } catch (err) {
      setErrorMsg("Couldn't schedule the WCL now");
      errorRef?.current?.focus();
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("WCL")} />
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
                      createWCL(e, v);
                    }}
                  >
                    <div className="form-group row">
                      <label htmlFor="name" className="col-md-2 col-form-label">
                        Name
                      </label>
                      <div className="col-md-10 pt-2">
                        <AvField
                          required="required"
                          name="name"
                          id="name"
                          //   value={examDetails.name}
                          type="text"
                          onChange={onInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="description"
                        className="col-md-2 col-form-label"
                      >
                        Description
                      </label>
                      <div className="col-md-10 pt-2">
                        <AvField
                          required="required"
                          name="description"
                          id="description"
                          type="textarea"
                          value={examDetails.description}
                          onChange={onInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="examDate"
                        className="col-md-2 col-form-label"
                      >
                        Assessment Date
                      </label>
                      <div className="col-md-10 pt-2">
                        <InputGroup>
                          <DatePicker
                            showTimeSelect
                            onChange={(value) =>
                              onDateInputChange("examDate", value)
                            }
                            className="form-control"
                            minDate={new Date()}
                            selected={examDetails?.examDate || new Date()}
                            dateFormat="MMM d, yyyy h:mm aa"
                          />
                        </InputGroup>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="levels"
                        className="col-md-2 col-form-label"
                      >
                        Levels
                      </label>
                      <div className="col-md-10 pt-2 templating-select  select2-container">
                        <Select
                          value={examDetails?.levels}
                          isMulti={true}
                          onChange={(value) => {
                            onMultiSelectChange("levelIds", value);
                          }}
                          options={levelsOption}
                          classNamePrefix="select2-selection"
                          closeMenuOnSelect={false}
                          components={animatedComponents}
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
                          Schedule WCL
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

export default withNamespaces()(WCL);
