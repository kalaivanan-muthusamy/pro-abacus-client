import React, { useState } from "react";
import { Alert, FormGroup, Label, Modal } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import AvField from "availity-reactstrap-validation/lib/AvField";
import { getErrorMsg, postRequest, putRequest } from "../../helpers/apiRequest";
import toastr from "toastr";

function ExamPlanModel({ onClose, planDetails }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const isUpdate = !!planDetails;

  function onsubmitClick(event, inputs) {
    if (isUpdate) updateSubscription(event, inputs);
    else addNewSubscription(event, inputs);
  }

  async function addNewSubscription(event, planInputs) {
    setLoading(true);
    try {
      const { error } = await postRequest("pricing-plans", {
        planType: "EXAM_PLAN",
        name: planInputs.name,
        examType: planInputs.examType,
        basicPrice: planInputs.basicPrice,
        discountedPrice: planInputs.discountedPrice,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't add new subscription plans"));
        setLoading(false);
        return;
      }
      toastr.info("New plan added successfully");
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't add new subscription plans"));
      setLoading(false);
    }
  }

  async function updateSubscription(event, planInputs) {
    setLoading(true);
    try {
      const { error } = await putRequest("pricing-plans", {
        pricingPlanId: planDetails?._id,
        name: planInputs.name,
        basicPrice: planInputs.basicPrice,
        discountedPrice: planInputs.discountedPrice,
      });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't update the subscription plans")
        );
        setLoading(false);
        return;
      }
      toastr.info("Plan details updated successfully");
      onClose({ refresh: true });
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't update the subscription plans"));
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
      <AvForm onValidSubmit={onsubmitClick} className="needs-validation">
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            {isUpdate ? "Update Exam Price Plan" : "Add Exam Price Plan"}
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
            <Label htmlFor="name">Plan Name</Label>
            <AvField
              defaultValue={planDetails?.name}
              name="name"
              placeholder="Plan Name"
              type="text"
              errorMessage="Plan Name is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="examType">Exam Type</Label>
            <AvField
              defaultValue="ACL"
              name="examType"
              type="select"
              errorMessage="Exam Type is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="examType"
            >
              <option>ACL</option>
            </AvField>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="basicPrice">Basic Price (₹)</Label>
            <AvField
              defaultValue={planDetails?.basicPrice}
              name="basicPrice"
              placeholder="Base Price"
              type="text"
              errorMessage="Base Price is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="basicPrice"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
            <AvField
              defaultValue={planDetails?.discountedPrice}
              name="discountedPrice"
              placeholder="Discounted Price"
              type="text"
              errorMessage="Discounted price is required"
              className="form-control"
              validate={{ required: { value: true } }}
              id="discountedPrice"
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
            {isUpdate ? "Update Exam Price Plan" : "Add Exam Price Plan"}
          </button>
        </div>
      </AvForm>
    </Modal>
  );
}

export default ExamPlanModel;
