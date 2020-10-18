import AvForm from "availity-reactstrap-validation/lib/AvForm";
import React, { useState } from "react";
import { Alert, FormGroup, InputGroup, Label, Modal } from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";

function UpdateSubscriptionModal({ onClose, studentDetails }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const expiryDate = moment
    .tz(studentDetails?.subscriptionDetails?.expiryAt, "Asia/Calcutta")
    .toDate();

  function onsubmitClick() {}
  return (
    <Modal isOpen>
      <AvForm onValidSubmit={onsubmitClick} className="needs-validation">
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Extend User Subscription
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
            <Label htmlFor="name">Expiry At</Label>
            <InputGroup>
              <DatePicker
                showTimeSelect
                onChange={(value) => ""}
                className="form-control"
                minDate={new Date()}
                selected={expiryDate}
                dateFormat="MMM d, yyyy h:mm aa"
              />
            </InputGroup>
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
            Update
          </button>
        </div>
      </AvForm>
    </Modal>
  );
}

export default UpdateSubscriptionModal;
