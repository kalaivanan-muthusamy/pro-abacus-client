import React, { useState } from "react";
import { Alert, FormGroup, Label, Modal } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import AvField from "availity-reactstrap-validation/lib/AvField";
import { getErrorMsg, postRequest } from "./../../helpers/apiRequest";
import toastr from "toastr";

function InviteToBatchModal({ onClose, batchId }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function inviteToBatch(event, batchInputs) {
    setLoading(true);
    try {
      const { error } = await postRequest("batches/invite", {
        batchId,
        studentEmailIds: batchInputs.studentEmailIds,
      });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't invite students to this batch")
        );
        setLoading(false);
        return;
      }
      toastr.info("Students invited successfully");
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't invite students to this batch"));
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
      <AvForm onValidSubmit={inviteToBatch} className="needs-validation">
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Invite Students
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
            <Label htmlFor="studentEmailIds">Student Email IDs</Label>
            <AvField
              name="studentEmailIds"
              placeholder="Enter Student Email IDs separated by commas"
              type="textarea"
              errorMessage="Atleast one student email is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="studentEmailIds"
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
          <button
            type="submit"
            className="btn btn-primary waves-effect waves-light"
          >
            Invite
          </button>
        </div>
      </AvForm>
    </Modal>
  );
}

export default InviteToBatchModal;
