import React, { useEffect, useState } from "react";
import { Alert, Button, FormGroup, Label, Modal } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import AvField from "availity-reactstrap-validation/lib/AvField";
import {
  getErrorMsg,
  getRequest,
  postRequest,
} from "./../../helpers/apiRequest";
import toastr from "toastr";
import { SPLITUP_CATEGORY } from "./../../contants";
import { classname } from "classnames";

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
        maximum: 10,
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
        maximum: 10,
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
        maximum: 10,
      },
    ],
  },
};

function NewLevelModal({ onClose, batchId }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);
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

  useEffect(() => {
    getAllLevels();
  }, []);

  async function getAllLevels() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("levels");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get all the levels"));
        setLoading(false);
        return;
      }
      setLevels(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get all the levels"));
    }
    setLoading(false);
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
      [splitUpColumns[3].name]: splitUpColumns[3].default,
    });
    setSplitUps({
      ...splitUps,
      [key]: newSplitUps,
    });
  }

  async function addNewLevel(event, levelInputs) {
    setLoading(true);
    try {
      const updatedSplitUps = {};
      const enabledSplitUps = splitUps.enabled;
      Object.keys(enabledSplitUps).map((category) => {
        if (enabledSplitUps[category]) {
          updatedSplitUps[category] = splitUps[category];
        }
      });
      const { error } = await postRequest("levels", {
        name: levelInputs.name,
        duration: levelInputs.duration,
        orderValue: levelInputs.orderValue,
        splitUps: JSON.stringify(updatedSplitUps),
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't add new level"));
        setLoading(false);
        return;
      }
      toastr.info("New level added successfully");
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't add new level"));
      setLoading(false);
    }
  }

  return (
    <Modal size="lg" isOpen>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <AvForm onValidSubmit={addNewLevel} className="needs-validation">
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Add New Level
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <FormGroup>
            <Label htmlFor="name">Level Name</Label>
            <AvField
              name="name"
              placeholder="Level name"
              type="text"
              errorMessage="Level name is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="duration">Order Value</Label>
            <AvField
              name="orderValue"
              placeholder="Order Value"
              type="text"
              errorMessage="Order value is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="orderValue"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="duration">Duration</Label>
            <AvField
              name="duration"
              placeholder="Duration"
              type="text"
              errorMessage="Duration is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="duration"
            />
          </FormGroup>
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
                    <div className="col-sm-12 col-md-10">
                      <div className="table-responsive">
                        <table className="table table-bordered table-sm table-hover">
                          <thead>
                            <tr>
                              <th>{category.columns[0].label}</th>
                              <th>{category.columns[1].label}</th>
                              <th>{category.columns[2].label}</th>
                              <th>{category.columns[3].label}</th>
                              <th style={{ minWidth: "100px" }}>Action</th>
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
                                  <td>
                                    <AvField
                                      required="required"
                                      name={
                                        category.columns[3].name + "_" + index
                                      }
                                      type="text"
                                      min={category.columns[3].minimum}
                                      max={category.columns[3].maximum}
                                      onChange={(e) =>
                                        onSplitUpInputChange(e, index, key)
                                      }
                                      className="form-control-sm"
                                      value={obj?.[category.columns[3].name]}
                                      validate={{
                                        max: {
                                          value: category.columns[3].maximum,
                                          errorMessage: `Maximum value must be ${category.columns[3].maximum}`,
                                        },
                                        min: {
                                          value: category.columns[3].minimum,
                                          errorMessage: `Minimum value must be ${category.columns[3].minimum}`,
                                        },
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Button
                                      color="danger"
                                      size="sm"
                                      onClick={() => onRemove(index, obj, key)}
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
                              <td></td>
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
          <div>{errorMsg && <Alert color="danger">{errorMsg}</Alert>}</div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary waves-effect"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary waves-effect waves-light"
          >
            Add New Level
          </button>
        </div>
      </AvForm>
    </Modal>
  );
}

export default NewLevelModal;
