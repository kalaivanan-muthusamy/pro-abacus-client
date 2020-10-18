import React, { useState } from "react";
import moment from "moment";
import { getErrorMsg, postRequest } from "../../helpers/apiRequest";
import toastr from "toastr";
import { ucFirst } from "../../helpers/common";
import { useHistory } from "react-router-dom";

function GroupNotifications({ notifications, onChange = () => "" }) {
  const history = useHistory();

  async function acceptBatchJoinRequest(
    notificationId,
    batchRequestId,
    status
  ) {
    try {
      const { error } = await postRequest("batches/request/update", {
        batchRequestId,
        status,
      });
      if (error) {
        toastr.error(
          getErrorMsg(error, "Couldn't get the notifications right now")
        );
        return;
      }
      toastr.info(`Batch request has been ${ucFirst(status)} successfully`);
    } catch (err) {
      toastr.error(
        getErrorMsg(err, "Couldn't get the notifications right now")
      );
    }
    onChange();
  }

  function displayBatchJoinNotification(notification) {
    return (
      <React.Fragment>
        <button
          className="btn btn-secondary btn-sm mt-2"
          onClick={() =>
            acceptBatchJoinRequest(
              notification._id,
              notification.batchRequestId,
              "ACCEPTED"
            )
          }
        >
          Accept
        </button>
        <button
          className="btn btn-danger btn-sm mt-2 ml-2"
          onClick={() =>
            acceptBatchJoinRequest(
              notification._id,
              notification.batchRequestId,
              "REJECTED"
            )
          }
        >
          Reject
        </button>
      </React.Fragment>
    );
  }

  function displayExamAction(notification) {
    return (
      <button
        className="btn btn-secondary btn-sm mt-2"
        onClick={() => history.push("exam/start/" + notification.examId)}
      >
        Start Exam
      </button>
    );
  }

  return (
    <table className="table table-hover">
      <tbody>
        {notifications?.map?.((notification) => (
          <tr>
            <td>
              <span className="pt-3 pb-3">{notification?.message}</span>
              <div>
                {notification.type === "BATCH_JOIN_NOTIFICATION" &&
                  displayBatchJoinNotification(notification)}
                {notification.type === "EXAM_NOTIFICATION" &&
                  displayExamAction(notification)}
              </div>
              <div class="text-muted font-size-12 mt-2">
                <i class="far fa-calendar-alt text-primary mr-1"></i>
                {moment(notification?.createdAt).format("DD MMM, HH:mm")}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GroupNotifications;
