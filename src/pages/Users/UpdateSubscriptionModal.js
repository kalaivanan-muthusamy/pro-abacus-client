import AvForm from "availity-reactstrap-validation/lib/AvForm";
import React, { useState } from "react";
import { Alert, FormGroup, InputGroup, Label, Modal } from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import { getErrorMsg, putRequest } from "../../helpers/apiRequest";

function UpdateSubscriptionModal({ onClose, userDetails, userType }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [expiryDate, setExpiryDate] = useState(
    moment
      .tz(userDetails?.subscriptionDetails?.expiryAt, "Asia/Calcutta")
      .toDate()
  );

  async function onsubmitClick() {
    setLoading(true);
    try {
      const path = userType === "students" ? "students" : "teachers";
      const userIdKey = userType === "students" ? "studentId" : "teacherId";
      const { error } = await putRequest(path, {
        expiryAt: expiryDate.toISOString(),
        [userIdKey]: userDetails._id,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the user details"));
        setLoading(false);
        return;
      }
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the user details"));
    }
    setLoading(false);
  }
  return (
    <Modal isOpen>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
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
                onChange={(value) => setExpiryDate(value)}
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
