import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "reactstrap";
import { CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { MDBDataTable } from "mdbreact";
import { batchStudentsColumns } from "./helpers/index";
import { useEffect } from "react";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { useParams } from "react-router-dom";
import { postRequest, deleteRequest } from "./../../helpers/apiRequest";

function BatchStudents() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState(null);
  const params = useParams();

  useEffect(() => {
    getBatchStudents();
  }, []);

  async function getBatchStudents() {
    try {
      setLoading(true);
      const { error, res } = await getRequest("batches/students", {
        batchId: params?.batchId,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the student list"));
        setLoading(false);
        return;
      }
      setStudents(updateRowValues(res));
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the student list"));
    }
    setLoading(false);
  }

  async function onRemove(studentId) {
    try {
      setLoading(true);
      const { error } = await deleteRequest("batches/students", {
        studentId,
        batchId: params?.batchId,
      });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't remove the student from batch")
        );
        setLoading(false);
        return;
      }
      getBatchStudents();
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't remove the student from batch"));
    }
    setLoading(false);
  }

  function updateRowValues(studentsTmp) {
    const students = studentsTmp.map((student, index) => {
      return {
        ...student,
        sno: index + 1,
        level: student?.levelDetails?.name ?? "-",
        action: (
          <React.Fragment>
            <Button
              onClick={() => onRemove(student._id)}
              color="danger"
              size="sm"
            >
              Remove from Batch
            </Button>
          </React.Fragment>
        ),
      };
    });
    return students;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Batch Students" />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {loading && (
                    <div className="spinner-overlay">
                      <div className="spinner" />
                    </div>
                  )}
                  <div>
                    {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                  </div>
                  <Row>
                    <Col>
                      <MDBDataTable
                        hover
                        barReverse
                        responsive
                        striped
                        bordered
                        noBottomColumns
                        data={{
                          rows: students || [],
                          columns: batchStudentsColumns,
                        }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default BatchStudents;
