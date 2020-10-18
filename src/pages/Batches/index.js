import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "reactstrap";
import { CardBody } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import BatchModal from "./BatchModal";
import { MDBDataTable } from "mdbreact";
import { batchColumns } from "./helpers/index";
import { useEffect } from "react";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import InviteToBatchModal from "./InviteToBatchModal";
import { Link } from "react-router-dom";

function Batches(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batchModal, setBatchModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [batches, setBatches] = useState(null);

  useEffect(() => {
    getBatches();
  }, []);

  async function getBatches() {
    try {
      const { error, res } = await getRequest("batches");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't create a new batch now"));
        setLoading(false);
        return;
      }
      setBatches(updateRowValues(res));
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Unable to get the batches"));
    }
  }

  function onBatchModalClose({ refresh }) {
    setBatchModal(false);
    if (refresh) {
      getBatches();
    }
  }

  function updateRowValues(batchesTemp) {
    const batches = batchesTemp.map((batch, index) => {
      return {
        ...batch,
        sno: index + 1,
        action: (
          <React.Fragment>
            <a
              href="#"
              title="Edit Batch"
              className="text-info mr-3 font-size-16"
              onClick={() =>
                setBatchModal({ mode: "EDIT", batchDetails: batch })
              }
            >
              <i class="bx bxs-edit-alt"></i>
            </a>
            <Link
              className="text-info mr-3 font-size-16"
              to={`/batches/students/${batch._id}`}
            >
              <i class="bx bxs-user-detail"></i>
            </Link>
            <a
              href="#"
              title="Invite Student"
              className="text-success mr-3 font-size-16"
              onClick={() => setInviteModal({ batchId: batch._id })}
            >
              <i class="bx bx-user-plus"></i>
            </a>
          </React.Fragment>
        ),
      };
    });
    return batches;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Batches")} />
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
                    <Col className="text-right">
                      <Button onClick={() => setBatchModal({ mode: "NEW" })}>
                        <i class="mdi mdi-plus"></i> Batch
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <MDBDataTable
                        responsive
                        bordered
                        exportToCSV={true}
                        hover
                        fixed
                        noBottomColumns
                        data={{ rows: batches || [], columns: batchColumns }}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {batchModal && (
        <BatchModal details={batchModal} onClose={onBatchModalClose} />
      )}
      {inviteModal && (
        <InviteToBatchModal
          batchId={inviteModal.batchId}
          onClose={() => setInviteModal(false)}
        />
      )}
    </React.Fragment>
  );
}

export default withNamespaces()(Batches);
