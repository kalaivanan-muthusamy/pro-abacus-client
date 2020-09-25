import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  Button,
  Alert,
  FormGroup,
  Label,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import classnames from "classnames";
import NewLevelModal from "./NewLevelModal";
import { getErrorMsg, getRequest, putRequest } from "../../helpers/apiRequest";
import { SPLITUP_CATEGORY } from "./../../contants";
import { AvForm, AvField } from "availity-reactstrap-validation";
import toastr from "toastr";

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

function Levels(props) {
  const [activeLevelIndex, setActiveLevelIndex] = useState("level_0");
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [splitUps, setSplitUps] = useState({
    enabled: {
      [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]: true,
      [SPLITUP_CATEGORY.MULTIPLICATION]: true,
      [SPLITUP_CATEGORY.DIVISION]: true,
    },
    [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]: [],
    [SPLITUP_CATEGORY.MULTIPLICATION]: [],
    [SPLITUP_CATEGORY.DIVISION]: [],
  });
  const [showNewLevelDialog, setShowNewLevelDialog] = useState(false);

  useEffect(() => {
    getAllLevels({});
  }, []);

  async function getAllLevels({ defaultIndex = 0 }) {
    setLoading(true);
    try {
      const { error, res } = await getRequest("levels");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get all the levels"));
        setLoading(false);
        return;
      }
      setLevels(res);
      setSplitUps({
        ...splitUps,
        enabled: {
          [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]:
            res[defaultIndex].splitUps[
              SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION
            ]?.length > 0 || false,
          [SPLITUP_CATEGORY.MULTIPLICATION]:
            res[defaultIndex].splitUps[SPLITUP_CATEGORY.MULTIPLICATION]
              ?.length > 0 || false,
          [SPLITUP_CATEGORY.DIVISION]:
            res[defaultIndex].splitUps[SPLITUP_CATEGORY.DIVISION]?.length > 0 ||
            false,
        },
        ...res[defaultIndex].splitUps,
      });
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

  async function onSave(event, formInputs) {
    try {
      // event.preventDefault();
      setLoading(true);
      const updatedSplitUps = {};
      const enabledSplitUps = splitUps.enabled;
      Object.keys(enabledSplitUps).map((category) => {
        if (enabledSplitUps[category]) {
          updatedSplitUps[category] = splitUps[category];
        }
      });
      const index = activeLevelIndex.split("_")[1];
      const { error } = await putRequest("levels", {
        levelId: levels[index]._id,
        name: formInputs["name_" + index],
        splitUps: JSON.stringify(updatedSplitUps),
      });
      if (error) {
        setLoading(false);
        toastr.error("Couldn't update the level");
        return;
      }
      toastr.info("Level config updated successfully");
      await getAllLevels({ defaultIndex: index });
    } catch (err) {
      console.log("ERR", err);
      toastr.error("Couldn't update the level");
    }
    setLoading(false);
  }

  async function onTabChange(index) {
    setActiveLevelIndex("level_" + index);
    const updatedSplitUps = { ...splitUps };
    updatedSplitUps[SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION] = [];
    updatedSplitUps[SPLITUP_CATEGORY.MULTIPLICATION] = [];
    updatedSplitUps[SPLITUP_CATEGORY.DIVISION] = [];
    setSplitUps({
      ...updatedSplitUps,
      enabled: {
        [SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]:
          levels[index].splitUps[SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION]
            ?.length > 0 || false,
        [SPLITUP_CATEGORY.MULTIPLICATION]:
          levels[index].splitUps[SPLITUP_CATEGORY.MULTIPLICATION]?.length > 0 ||
          false,
        [SPLITUP_CATEGORY.DIVISION]:
          levels[index].splitUps[SPLITUP_CATEGORY.DIVISION]?.length > 0 ||
          false,
      },
      ...levels[index].splitUps,
    });
  }

  async function onNewLevelModalClose({ refresh }) {
    setShowNewLevelDialog(false);
    if (refresh) {
      await getAllLevels();
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Levels")} />
          <Row>
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner" />
              </div>
            )}
            <div>{errorMsg && <Alert color="danger">{errorMsg}</Alert>}</div>
            <Col sm="12">
              <div className="levels-tabs">
                <Row>
                  <Col lg="2">
                    <Nav className="flex-column" pills>
                      <NavItem>
                        <NavLink>
                          <p
                            onClick={() => setShowNewLevelDialog(true)}
                            className="font-weight-bold mb-2 mt-2 text-primary"
                          >
                            + New Level
                          </p>
                        </NavLink>
                        {levels?.map((level, index) => (
                          <NavLink
                            className={classnames({
                              active: activeLevelIndex === "level_" + index,
                            })}
                            onClick={() => {
                              onTabChange(index);
                            }}
                          >
                            <p className="font-weight-bold mb-0">
                              {level.name}
                            </p>
                          </NavLink>
                        ))}
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col lg="10">
                    <Card>
                      <CardBody>
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            onSave(e, v);
                          }}
                        >
                          <TabContent activeTab={activeLevelIndex}>
                            {levels?.map((level, index) => (
                              <TabPane key={index} tabId={"level_" + index}>
                                <div>
                                  <FormGroup className="mb-4">
                                    <Label htmlFor="name">Level Name</Label>
                                    <AvField
                                      id={"level_name_" + index}
                                      name={"name_" + index}
                                      placeholder="Level name"
                                      type="text"
                                      value={level?.name}
                                      errorMessage="Level name is required"
                                      className="form-control"
                                      validate={{
                                        required: { value: true },
                                      }}
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
                                            onChange={() =>
                                              onCheckboxChange(key)
                                            }
                                            checked={splitUps?.enabled?.[key]}
                                          />
                                          <label
                                            onClick={() =>
                                              onCheckboxChange(key)
                                            }
                                            className="custom-control-label"
                                          >
                                            {category.name}
                                          </label>
                                        </div>

                                        {splitUps?.enabled?.[key] && (
                                          <div className="table-responsive">
                                            <table className="table table-dark table-bordered  table-hover">
                                              <thead>
                                                <tr>
                                                  <th>
                                                    {category.columns[0].label}
                                                  </th>
                                                  <th>
                                                    {category.columns[1].label}
                                                  </th>
                                                  <th>
                                                    {category.columns[2].label}
                                                  </th>
                                                  <th>
                                                    {category.columns[3].label}
                                                  </th>
                                                  <th>Action</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {splitUps?.[key]?.map(
                                                  (obj, index) => {
                                                    return (
                                                      <tr key={index}>
                                                        <td>
                                                          <AvField
                                                            required="required"
                                                            name={
                                                              category
                                                                .columns[0]
                                                                .name +
                                                              "_" +
                                                              index
                                                            }
                                                            type="text"
                                                            min={
                                                              category
                                                                .columns[0]
                                                                .minimum
                                                            }
                                                            max={
                                                              category
                                                                .columns[0]
                                                                .maximum
                                                            }
                                                            onChange={(e) =>
                                                              onSplitUpInputChange(
                                                                e,
                                                                index,
                                                                key
                                                              )
                                                            }
                                                            className="form-control"
                                                            value={
                                                              obj?.[
                                                                category
                                                                  .columns[0]
                                                                  .name
                                                              ]
                                                            }
                                                            validate={{
                                                              max: {
                                                                value:
                                                                  category
                                                                    .columns[0]
                                                                    .maximum,
                                                                errorMessage: `Maximum value must be ${category.columns[0].maximum}`,
                                                              },
                                                              min: {
                                                                value:
                                                                  category
                                                                    .columns[0]
                                                                    .minimum,
                                                                errorMessage: `Minimum value must be ${category.columns[0].minimum}`,
                                                              },
                                                            }}
                                                          />
                                                        </td>
                                                        <td>
                                                          <AvField
                                                            required="required"
                                                            name={
                                                              category
                                                                .columns[1]
                                                                .name +
                                                              "_" +
                                                              index
                                                            }
                                                            type="text"
                                                            min={
                                                              category
                                                                .columns[1]
                                                                .minimum
                                                            }
                                                            max={
                                                              category
                                                                .columns[1]
                                                                .maximum
                                                            }
                                                            onChange={(e) =>
                                                              onSplitUpInputChange(
                                                                e,
                                                                index,
                                                                key
                                                              )
                                                            }
                                                            className="form-control"
                                                            value={
                                                              obj?.[
                                                                category
                                                                  .columns[1]
                                                                  .name
                                                              ]
                                                            }
                                                            validate={{
                                                              max: {
                                                                value:
                                                                  category
                                                                    .columns[1]
                                                                    .maximum,
                                                                errorMessage: `Maximum value must be ${category.columns[1].maximum}`,
                                                              },
                                                              min: {
                                                                value:
                                                                  category
                                                                    .columns[1]
                                                                    .minimum,
                                                                errorMessage: `Minimum value must be ${category.columns[1].minimum}`,
                                                              },
                                                            }}
                                                          />
                                                        </td>
                                                        <td>
                                                          <AvField
                                                            required="required"
                                                            name={
                                                              category
                                                                .columns[2]
                                                                .name +
                                                              "_" +
                                                              index
                                                            }
                                                            type="text"
                                                            min={
                                                              category
                                                                .columns[2]
                                                                .minimum
                                                            }
                                                            max={
                                                              category
                                                                .columns[2]
                                                                .maximum
                                                            }
                                                            onChange={(e) =>
                                                              onSplitUpInputChange(
                                                                e,
                                                                index,
                                                                key
                                                              )
                                                            }
                                                            className="form-control"
                                                            value={
                                                              obj?.[
                                                                category
                                                                  .columns[2]
                                                                  .name
                                                              ]
                                                            }
                                                            validate={{
                                                              max: {
                                                                value:
                                                                  category
                                                                    .columns[2]
                                                                    .maximum,
                                                                errorMessage: `Maximum value must be ${category.columns[2].maximum}`,
                                                              },
                                                              min: {
                                                                value:
                                                                  category
                                                                    .columns[2]
                                                                    .minimum,
                                                                errorMessage: `Minimum value must be ${category.columns[2].minimum}`,
                                                              },
                                                            }}
                                                          />
                                                        </td>
                                                        <td>
                                                          <AvField
                                                            required="required"
                                                            name={
                                                              category
                                                                .columns[3]
                                                                .name +
                                                              "_" +
                                                              index
                                                            }
                                                            type="text"
                                                            min={
                                                              category
                                                                .columns[3]
                                                                .minimum
                                                            }
                                                            max={
                                                              category
                                                                .columns[3]
                                                                .maximum
                                                            }
                                                            onChange={(e) =>
                                                              onSplitUpInputChange(
                                                                e,
                                                                index,
                                                                key
                                                              )
                                                            }
                                                            className="form-control"
                                                            value={
                                                              obj?.[
                                                                category
                                                                  .columns[3]
                                                                  .name
                                                              ]
                                                            }
                                                            validate={{
                                                              max: {
                                                                value:
                                                                  category
                                                                    .columns[3]
                                                                    .maximum,
                                                                errorMessage: `Maximum value must be ${category.columns[3].maximum}`,
                                                              },
                                                              min: {
                                                                value:
                                                                  category
                                                                    .columns[3]
                                                                    .minimum,
                                                                errorMessage: `Minimum value must be ${category.columns[3].minimum}`,
                                                              },
                                                            }}
                                                          />
                                                        </td>
                                                        <td>
                                                          <Button
                                                            size="sm"
                                                            onClick={() =>
                                                              onRemove(
                                                                index,
                                                                obj,
                                                                key
                                                              )
                                                            }
                                                          >
                                                            Remove
                                                          </Button>
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                )}
                                                <tr>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td></td>
                                                  <td>
                                                    <Button
                                                      size="sm"
                                                      onClick={() =>
                                                        addRow(key)
                                                      }
                                                    >
                                                      Add Row
                                                    </Button>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        )}
                                      </React.Fragment>
                                    );
                                  })}
                                  <button
                                    type="submit"
                                    className="btn btn-primary waves-effect waves-light"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </TabPane>
                            ))}
                          </TabContent>
                        </AvForm>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {showNewLevelDialog && <NewLevelModal onClose={onNewLevelModalClose} />}
    </React.Fragment>
  );
}

export default withNamespaces()(Levels);
