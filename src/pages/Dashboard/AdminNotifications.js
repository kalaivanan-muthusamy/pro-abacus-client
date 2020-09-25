import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Media } from "reactstrap";
import { Link } from "react-router-dom";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import * as moment from "moment";
import { postRequest } from "./../../helpers/apiRequest";
import toastr from "toastr";
import { ucFirst } from "./../../helpers/common";

function AdminNotifications() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    getAllNotifications();
  }, []);

  async function getAllNotifications() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("notifications");
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the notifications right now")
        );
        setLoading(false);
        return;
      }
      setNotifications(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the notifications right now"));
    }
    setLoading(false);
  }

  async function acceptBatchJoinRequest(
    notificationId,
    batchRequestId,
    status
  ) {
    setLoading(true);
    try {
      const { error } = await postRequest("batches/request/update", {
        batchRequestId,
        status,
      });
      if (error) {
        toastr.error(
          getErrorMsg(error, "Couldn't get the notifications right now")
        );
        setLoading(false);
        return;
      }
      toastr.info(`Batch request has been ${ucFirst(status)} successfully`);
    } catch (err) {
      toastr.error(
        getErrorMsg(err, "Couldn't get the notifications right now")
      );
    }
    await getAllNotifications();
    setLoading(false);
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

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <CardTitle className="mb-4">Notifications</CardTitle>
          <ul className="verti-timeline list-unstyled">
            {notifications?.slice(0, 3).map((notification) => (
              <li
                id={`notification_${notification._id}`}
                className="event-list"
              >
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"></i>
                </div>
                <Media>
                  <div className="mr-3">
                    <p className="font-size-12 mb-2">
                      <b>{moment(notification.createdAt).format("MMM DD")}</b>
                    </p>
                    <div>{notification?.message}</div>
                    {notification.type === "BATCH_JOIN_NOTIFICATION" &&
                      displayBatchJoinNotification(notification)}
                  </div>
                  <Media body></Media>
                </Media>
              </li>
            ))}
          </ul>
          {notifications?.length === 0 && (
            <div className="text-center">
              <i className="fa font-size-24 text-info mb-4 fa-bell" />
              <p className="m-0">No notifications available right now</p>
            </div>
          )}
          {notifications?.length > 3 && (
            <div className="text-center mt-4">
              <Link
                to="/notifications"
                className="btn btn-primary waves-effect waves-light btn-sm"
              >
                View All <i className="mdi mdi-arrow-right ml-1"></i>
              </Link>
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default AdminNotifications;
