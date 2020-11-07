import React, { useCallback, useEffect, useState } from "react";
import { Alert, FormGroup, Modal } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import AvField from "availity-reactstrap-validation/lib/AvField";
import {
  getErrorMsg,
  getRequest,
  postRequest,
} from "./../../helpers/apiRequest";
import debounce from "lodash/debounce";
import toastr from "toastr";

function JoinClassModal({ onClose }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [text, setText] = useState(false);
  const delayedSearch = useCallback(
    debounce((q) => onSearch(q), 500),
    [studentDetails]
  );

  useEffect(() => {
    getStudentDetails();
  }, []);

  async function getStudentDetails() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("students");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't search for new batch now"));
        setLoading(false);
        return;
      }
      setStudentDetails(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't search for new batch now"));
    }
    setLoading(false);
  }

  function onTextChange(event) {
    const value = event.target.value;
    setText(value);
    if (value !== "") {
      delayedSearch && delayedSearch(value);
    }
  }

  async function onSearch(searchText) {
    setLoading(true);
    try {
      const { error, res } = await postRequest("batches/search", {
        searchText,
        exclude: studentDetails?.batchId,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't search for new batch now"));
        setLoading(false);
        return;
      }
      setBatches(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't search for new batch now"));
    }
    setLoading(false);
  }

  async function joinBatch(batchId) {
    setLoading(true);
    try {
      const { error } = await postRequest("batches/join", {
        batchId,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't join this batch"));
        setLoading(false);
        return;
      }
      toastr.info("Join request has been sent to the Batch Teacher");
      onClose();
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't join this batch"));
    }
    setLoading(false);
  }

  return (
    <Modal isOpen>
      {/* {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )} */}
      <AvForm className="needs-validation">
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            {studentDetails?.batchId ? "Change Batch" : "Join Your Batch"}
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
            {studentDetails?.batchDetails?.name && (
              <p className="ml-1 text-info">
                <b>Current Batch</b>: {studentDetails?.batchDetails?.name} (
                {studentDetails?.batchDetails?.batchNumber})
              </p>
            )}
            <AvField
              value={text}
              name="name"
              placeholder="Search Batch Number"
              type="text"
              onChange={onTextChange}
              className="form-control"
              id="batchName"
            />

            {loading && "Searching ..."}
          </FormGroup>
          {batches && (
            <table className="table table-centered table-nowrap table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Batch Number</th>
                  <th>Teacher Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {batches?.map((batch, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{batch.batchNumber}</td>
                    <td>{batch.teacherDetails?.name}</td>
                    <td>
                      <a href="#" onClick={() => joinBatch(batch._id)}>
                        Join
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
        </div>
      </AvForm>
    </Modal>
  );
}

export default JoinClassModal;
