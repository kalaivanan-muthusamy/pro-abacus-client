import React, { useEffect, useRef, useState } from "react";
import { Button, Alert, InputGroup } from "reactstrap";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastr from "toastr";
import {
  postRequest,
  getErrorMsg,
  getRequest,
} from "./../../helpers/apiRequest";
import { SPLITUP_CATEGORY, EXAM_TYPES } from "./../../contants";

const animatedComponents = makeAnimated();

const splitUpCategory = {
  [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]: {
    name: "Addition & Subtraction",
    columns: [
      {
        name: "digits",
        label: "Digits",
        minimum: 1,
        maximum: 10,
        default: 2,
      },
      {
        name: "rows",
        label: "Rows",
        minimum: 2,
        maximum: 10,
        default: 2,
      },
      {
        name: "questions",
        label: "Questions",
        default: 5,
        minimum: 1,
        maximum: 50,
      },
      {
        name: "marks",
        label: "Marks",
        default: 1,
        minimum: 1,
        maximum: 50,
      },
    ],
  },
  [SPLITUP_CATEGORY.MULTIPLICATION]: {
    name: "Multiplication",
    columns: [
      {
        name: "multiplicandDigits",
        label: "Multiplicand Digits",
        default: 2,
        minimum: 1,
        maximum: 10,
      },
      {
        name: "multiplierDigits",
        label: "Multiplier Digits",
        default: 2,
        minimum: 1,
        maximum: 10,
      },
      {
        name: "questions",
        label: "Questions",
        default: 5,
        minimum: 1,
        maximum: 50,
      },
      {
        name: "marks",
        label: "Marks",
        default: 1,
        minimum: 1,
        maximum: 50,
      },
    ],
  },
  [SPLITUP_CATEGORY.DIVISION]: {
    name: "Division",
    columns: [
      {
        name: "dividendDigits",
        label: "Dividend Digits",
        default: 2,
        minimum: 1,
        maximum: 10,
      },
      {
        name: "divisorDigits",
        label: "Divisor Digits",
        default: 2,
        minimum: 1,
        maximum: 10,
      },
      {
        name: "questions",
        label: "Questions",
        default: 5,
        minimum: 1,
        maximum: 50,
      },
      {
        name: "marks",
        label: "Marks",
        default: 1,
        minimum: 1,
        maximum: 50,
      },
    ],
  },
};

function ExamConfigurations({ examType }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [splitUps, setSplitUps] = useState({
    enabled: {
      [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]: true,
    },
    [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]: [
      {
        digits: 2,
        rows: 3,
        questions: 5,
        marks: 1,
      },
    ],
    [SPLITUP_CATEGORY.MULTIPLICATION]: [
      {
        multiplicandDigits: 2,
        multiplierDigits: 3,
        questions: 5,
        marks: 1,
      },
    ],
    [SPLITUP_CATEGORY.DIVISION]: [
      {
        dividendDigits: 2,
        divisorDigits: 3,
        questions: 5,
        marks: 1,
      },
    ],
  });
  const [examDetails, setExamDetails] = useState({
    examDate: new Date(),
  });
  const [batchesOptions, setBatchesOptions] = useState(null);
  const errorRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (examType === "ASSESSMENT") {
      getBatches();
    }
  }, []);

  async function getBatches() {
    try {
      const { error, res } = await getRequest("batches");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't create a new batch now"));
        setLoading(false);
        return;
      }
      const batchesTemp = res.map((batch) => ({
        label: batch.name,
        value: batch._id,
      }));
      setBatchesOptions(batchesTemp);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Unable to get the batches"));
    }
  }

  function onCheckboxChange(key) {
    const currentState = splitUps?.enabled?.[key];
    setSplitUps({
      ...splitUps,
      enabled: {
        ...splitUps.enabled,
        [key]: !currentState,
      },
    });
  }

  function onRemove(index, obj, key) {
    const newSplitUps = [...splitUps[key]];
    newSplitUps.splice(index, 1);
    setSplitUps({
      ...splitUps,
      [key]: newSplitUps,
    });
  }

  function addRow(key) {
    const splitUpColumns = splitUpCategory[key].columns;
    const newSplitUps = [...splitUps[key]];
    newSplitUps.push({
      [splitUpColumns[0].name]: splitUpColumns[0].default,
      [splitUpColumns[1].name]: splitUpColumns[1].default,
      [splitUpColumns[2].name]: splitUpColumns[2].default,
    });
    setSplitUps({
      ...splitUps,
      [key]: newSplitUps,
    });
  }

  async function startTest(event) {
    try {
      event?.preventDefault();
      setLoading(true);
      const updatedSplitUps = {};
      const enabledSplitUps = splitUps.enabled;
      Object.keys(enabledSplitUps).map((category) => {
        if (enabledSplitUps[category]) {
          updatedSplitUps[category] = splitUps[category];
        }
      });
      const { res, error } = await postRequest("exams", {
        ...examDetails,
        batchIds: examDetails.batchIds?.map((batch) => batch.value).join(","),
        examDate: examDetails.examDate?.toISOString(),
        examType,
        splitUps: JSON.stringify(updatedSplitUps),
        duration: examDetails.duration,
      });
      if (error) {
        setLoading(false);
        setErrorMsg(getErrorMsg(error, "Couldn't start the exam now"));
        errorRef?.current?.focus();
        return;
      }
      if (examType === EXAM_TYPES.ASSESSMENT) {
        toastr.info("Assessment has be scheduled successfully");
        history.push(`/dashboard`);
      } else {
        history.push(`/exam/start/${res._id}`);
      }
    } catch (err) {
      setErrorMsg("Couldn't start the exam now");
      errorRef?.current?.focus();
    }
    setLoading(false);
  }

  function onSplitUpInputChange(event, index, key) {
    const name = event.target.name.split("_")?.[0];
    const value = parseInt(event.target.value) || "";
    const newSplitUps = [...splitUps[key]];
    newSplitUps[index][name] = value;
    setSplitUps({
      ...splitUps,
      [key]: newSplitUps,
    });
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

  return (
    <div>
      <AvForm
        className="form-horizontal"
        onValidSubmit={(e, v) => {
          startTest(e, v);
        }}
      >
        {loading && (
          <div className="spinner-overlay">
            <div className="spinner" />
          </div>
        )}

        {examType === "ASSESSMENT" && (
          <div>
            <div className="form-group row">
              <label htmlFor="name" className="col-md-2 col-form-label">
                Name
              </label>
              <div className="col-md-10 pt-2">
                <AvField
                  required="required"
                  name="name"
                  id="name"
                  value={examDetails.name}
                  type="text"
                  onChange={onInputChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="description" className="col-md-2 col-form-label">
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
              <label htmlFor="examDate" className="col-md-2 col-form-label">
                Assessment Date
              </label>
              <div className="col-md-10 pt-2">
                <InputGroup>
                  <DatePicker
                    showTimeSelect
                    onChange={(value) => onDateInputChange("examDate", value)}
                    className="form-control"
                    minDate={new Date()}
                    selected={examDetails?.examDate || new Date()}
                    dateFormat="MMM d, yyyy h:mm aa"
                  />
                </InputGroup>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="batch" className="col-md-2 col-form-label">
                Batch
              </label>
              <div className="col-md-10 pt-2 templating-select  select2-container">
                <Select
                  value={examDetails?.batch}
                  isMulti={true}
                  onChange={(value) => {
                    onMultiSelectChange("batchIds", value);
                  }}
                  options={batchesOptions}
                  classNamePrefix="select2-selection"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-group row">
          <label htmlFor="splitups" className="col-md-2 col-form-label">
            Splitups
          </label>

          <div className="col-md-8 pt-2">
            {Object.keys(splitUpCategory).map((key) => {
              const category = splitUpCategory[key];
              return (
                <React.Fragment>
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={key}
                      onChange={() => onCheckboxChange(key)}
                      checked={splitUps?.enabled?.[key]}
                    />
                    <label
                      onClick={() => onCheckboxChange(key)}
                      className="custom-control-label"
                    >
                      {category.name}
                    </label>
                  </div>

                  {splitUps?.enabled?.[key] && (
                    <div className="row">
                      <div className="col-sm-12 col-md-8">
                        <div className="table-responsive">
                          <table className="table table-bordered table-sm table-hover">
                            <thead>
                              <tr>
                                <th>{category.columns[0].label}</th>
                                <th>{category.columns[1].label}</th>
                                <th>{category.columns[2].label}</th>
                                {examType === "ASSESSMENT" && (
                                  <th>{category.columns[3].label}</th>
                                )}
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {splitUps[key].map((obj, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <AvField
                                        required="required"
                                        name={
                                          category.columns[0].name + "_" + index
                                        }
                                        type="text"
                                        min={category.columns[0].minimum}
                                        max={category.columns[0].maximum}
                                        onChange={(e) =>
                                          onSplitUpInputChange(e, index, key)
                                        }
                                        className="form-control-sm"
                                        value={obj?.[category.columns[0].name]}
                                        validate={{
                                          max: {
                                            value: category.columns[0].maximum,
                                            errorMessage: `Maximum value must be ${category.columns[0].maximum}`,
                                          },
                                          min: {
                                            value: category.columns[0].minimum,
                                            errorMessage: `Minimum value must be ${category.columns[0].minimum}`,
                                          },
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <AvField
                                        required="required"
                                        name={
                                          category.columns[1].name + "_" + index
                                        }
                                        type="text"
                                        min={category.columns[1].minimum}
                                        max={category.columns[1].maximum}
                                        onChange={(e) =>
                                          onSplitUpInputChange(e, index, key)
                                        }
                                        className="form-control-sm"
                                        value={obj?.[category.columns[1].name]}
                                        validate={{
                                          max: {
                                            value: category.columns[1].maximum,
                                            errorMessage: `Maximum value must be ${category.columns[1].maximum}`,
                                          },
                                          min: {
                                            value: category.columns[1].minimum,
                                            errorMessage: `Minimum value must be ${category.columns[1].minimum}`,
                                          },
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <AvField
                                        required="required"
                                        name={
                                          category.columns[2].name + "_" + index
                                        }
                                        type="text"
                                        min={category.columns[2].minimum}
                                        max={category.columns[2].maximum}
                                        onChange={(e) =>
                                          onSplitUpInputChange(e, index, key)
                                        }
                                        className="form-control-sm"
                                        value={obj?.[category.columns[2].name]}
                                        validate={{
                                          max: {
                                            value: category.columns[2].maximum,
                                            errorMessage: `Maximum value must be ${category.columns[2].maximum}`,
                                          },
                                          min: {
                                            value: category.columns[2].minimum,
                                            errorMessage: `Minimum value must be ${category.columns[2].minimum}`,
                                          },
                                        }}
                                      />
                                    </td>
                                    {examType === "ASSESSMENT" && (
                                      <td>
                                        <AvField
                                          required="required"
                                          name={
                                            category.columns[3].name +
                                            "_" +
                                            index
                                          }
                                          type="text"
                                          min={category.columns[3].minimum}
                                          max={category.columns[3].maximum}
                                          onChange={(e) =>
                                            onSplitUpInputChange(e, index, key)
                                          }
                                          className="form-control-sm"
                                          value={
                                            obj?.[category.columns[3].name]
                                          }
                                          validate={{
                                            max: {
                                              value:
                                                category.columns[3].maximum,
                                              errorMessage: `Maximum value must be ${category.columns[3].maximum}`,
                                            },
                                            min: {
                                              value:
                                                category.columns[3].minimum,
                                              errorMessage: `Minimum value must be ${category.columns[3].minimum}`,
                                            },
                                          }}
                                        />
                                      </td>
                                    )}
                                    <td>
                                      <Button
                                        color="danger"
                                        size="sm"
                                        onClick={() =>
                                          onRemove(index, obj, key)
                                        }
                                      >
                                        <i className="bx bx-trash" />
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                {examType === "ASSESSMENT" && <td></td>}
                                <td>
                                  <Button size="sm" onClick={() => addRow(key)}>
                                    <i className="bx bx-plus" />
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {(examType === "SELF_TEST" || examType === "ASSESSMENT") && (
          <div className="form-group row">
            <label htmlFor="duration" className="col-md-2 col-form-label">
              Duration <small>(in minutes)</small>
            </label>
            <div className="col-md-10 pt-2">
              <AvField
                className="form-control"
                type="number"
                id="duration"
                name="duration"
                placeholder="Enter duration in minutes"
                value={examDetails?.["duration"]}
                onChange={(e) => onInputChange(e)}
                validate={{
                  required: true,
                  min: {
                    value: 5,
                    errorMessage: "Minimum value must be 5",
                  },
                  max: {
                    value: 180,
                    errorMessage: "Maximum value must be 180",
                  },
                }}
              />
            </div>
          </div>
        )}

        <div ref={errorRef} tabIndex="-1">
          {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button color="primary" className="mt-3" type="submit">
              {examType === "ASSESSMENT" ? "Create Assessment" : "Start Exam"}
            </Button>
          </div>
        </div>
      </AvForm>
    </div>
  );
}

export default withNamespaces()(ExamConfigurations);
