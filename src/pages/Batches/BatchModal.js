import React, { useState } from "react";
import { Alert, FormGroup, Label, Modal } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import AvField from "availity-reactstrap-validation/lib/AvField";
import {
  getErrorMsg,
  postRequest,
  putRequest,
} from "./../../helpers/apiRequest";
import toastr from "toastr";

function BatchModal({ onClose, details }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function addNewBatch(event, batchInputs) {
    setLoading(true);
    try {
      const { error } = await postRequest("batches", {
        name: batchInputs.name,
        description: batchInputs.description,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't create a new batch now"));
        setLoading(false);
        return;
      }
      toastr.info("New batch added successfully");
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't create a new batch now"));
      setLoading(false);
    }
  }

  async function updateBatch(event, batchInputs) {
    setLoading(true);
    try {
      const { error } = await putRequest("batches", {
        batchId: details?.batchDetails?._id,
        name: batchInputs.name,
        description: batchInputs.description,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't update the batch details"));
        setLoading(false);
        return;
      }
      toastr.info("Batch details updated successfully");
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't update the batch details"));
      setLoading(false);
    }
  }

  return (
    <Modal isOpen>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <AvForm
        onValidSubmit={details?.mode === "NEW" ? addNewBatch : updateBatch}
        className="needs-validation"
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            {details.mode === "NEW" ? "Add New Batch" : "Update Batch"}
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
            <Label htmlFor="batchName">Batch name</Label>
            <AvField
              name="name"
              placeholder="Batch Name"
              type="text"
              defaultValue={details?.batchDetails?.name}
              errorMessage="Enter Batch Name"
              className="form-control"
              validate={{ required: { value: true } }}
              id="batchName"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="batchDescription">Description</Label>
            <AvField
              name="description"
              placeholder="Description"
              type="textarea"
              defaultValue={details?.batchDetails?.description}
              errorMessage="Enter Batch Description"
              className="form-control"
              validate={{ required: { value: true } }}
              id="batchDescription"
            />
          </FormGroup>
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
          {details?.mode === "NEW" && (
            <button
              type="submit"
              className="btn btn-primary waves-effect waves-light"
            >
              Add New Batch
            </button>
          )}
          {details?.mode === "EDIT" && (
            <button
              type="submit"
              className="btn btn-primary waves-effect waves-light"
            >
              Update Batch
            </button>
          )}
        </div>
      </AvForm>
    </Modal>
  );
}

export default BatchModal;
