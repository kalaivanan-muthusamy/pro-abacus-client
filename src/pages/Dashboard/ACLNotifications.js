import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import * as moment from "moment-timezone";
import { getFormattedDiff } from "./../../helpers/DateHelper";

function ACLNotifications({ notification }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ACLExamDetails, setACLExamDetails] = useState(null);

  useEffect(() => {
    getACLExamDetails();
  }, []);

  async function getACLExamDetails() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/acl-details", {
        aclExamId: notification?.examId,
      });
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the notifications right now")
        );
        setLoading(false);
        return;
      }
      setACLExamDetails(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the notifications right now"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      {ACLExamDetails && (
        <Card>
          <CardBody>
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner" />
              </div>
            )}
            <CardTitle className="mb-4">{ACLExamDetails?.name}</CardTitle>

            <div className="text-center">
              <h4 className="text-primary mb-3">
                {(() => {
                  const formattedDiff = getFormattedDiff({
                    toDate: ACLExamDetails?.examDate,
                  });
                  return `${formattedDiff.days} Day ${formattedDiff.hours} Hr ${formattedDiff.minutes} Min`;
                })()}
              </h4>
              <Link
                to=""
                className="btn btn-primary waves-effect waves-light btn-md"
              >
                Join Now
              </Link>
              <h6 className="mt-3">
                Date:{" "}
                {moment
                  .tz(ACLExamDetails?.examDate, "Asia/Calcutta")
                  .format("DD-MMM-YYYY H:mm:ss")}
              </h6>
            </div>
            <p className="text-warning text-left mt-3">
              <small>
                * You need to complete 2 Weekly Assessment for participating in
                ACL
              </small>
            </p>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
}

export default ACLNotifications;
