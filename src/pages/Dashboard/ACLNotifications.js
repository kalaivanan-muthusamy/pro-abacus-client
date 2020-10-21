import React, { useEffect, useState } from "react";
import { Alert, Button, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import * as moment from "moment-timezone";
import { getFormattedDiff } from "./../../helpers/DateHelper";
import { postRequest } from "./../../helpers/apiRequest";
import { EXAM_TYPES } from "./../../contants";

let aclTimerId;

function ACLNotifications({ notification }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [registeredExam, setRegisteredExam] = useState(null);
  const [ACLExamDetails, setACLExamDetails] = useState(null);
  const [isACLRegistered, setIsACLRegistered] = useState(false);

  useEffect(() => {
    getRegisteredACLExams();
    getACLExamDetails();
    return () => {
      aclTimerId && clearInterval(aclTimerId);
    };
  }, []);

  useEffect(() => {
    ACLExamDetails && startTimer();
  }, [ACLExamDetails]);

  async function getACLExamDetails() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/acl-details", {
        aclExamId: notification?.examId,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't register now"));
        setLoading(false);
        return;
      }
      setACLExamDetails(res);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't register now"));
    }
    setLoading(false);
  }

  async function getRegisteredACLExams() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("exams/registered-exams", {
        examType: EXAM_TYPES.ACL,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get registered exams"));
        setLoading(false);
        return;
      }
      const registered = res?.find?.(
        (registeredExam) => registeredExam.examId === notification?.examId
      );
      if (registered) setIsACLRegistered(true);
      setRegisteredExam(registered);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get registered exams"));
    }
    setLoading(false);
  }

  function startTimer() {
    aclTimerId = setInterval(() => {
      const diff = getDiff();
      document.getElementById("aclTimer").innerHTML = diff;
    }, 1000);
  }

  function getDiff() {
    let timerString = "";
    const formattedDiff = getFormattedDiff({
      toDate: ACLExamDetails?.examDate,
    });
    if (formattedDiff.days === 1) timerString += "1 Day";
    if (formattedDiff.days > 1) timerString += `${formattedDiff.days} Days`;
    timerString += ` ${formattedDiff.hours}:${formattedDiff.minutes}:${formattedDiff.seconds}`;
    return "Exam starts in " + timerString;
  }

  async function onRegister() {
    setLoading(true);
    try {
      const { error, res } = await postRequest("exams/register", {
        examId: notification?.examId,
      });
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't register now"));
        setLoading(false);
        return;
      }
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't register now"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      {(registeredExam || ACLExamDetails) && (
        <Card>
          <CardBody>
            {loading && (
              <div className="spinner-overlay">
                <div className="spinner" />
              </div>
            )}
            <CardTitle className="mb-4">{ACLExamDetails?.name}</CardTitle>
            {isACLRegistered && (
              <Alert>
                You have registered for {registeredExam?.examDetails?.name} -{" "}
                {registeredExam?.levelDetails?.name}
              </Alert>
            )}
            <div className="text-center">
              <h4 className="text-primary mb-3" id="aclTimer">
                {getDiff()}
              </h4>
              {!isACLRegistered && (
                <Button
                  onClick={onRegister}
                  color="primary"
                  className=" waves-effect waves-light btn-md"
                >
                  Pay & Register
                </Button>
              )}
              {isACLRegistered && (
                <Button
                  onClick={onRegister}
                  color="primary"
                  className=" waves-effect waves-light btn-md"
                >
                  Start Exam
                </Button>
              )}
              <h6 className="mt-3">
                Date:{" "}
                {moment
                  .tz(ACLExamDetails?.examDate, "Asia/Calcutta")
                  .format("DD-MMM-YYYY H:mm:ss")}
              </h6>
            </div>
            <p className="text-warning text-left mt-3">
              <small>
                * You need to complete 2 WCL for participating in ACL
              </small>
              <small className="d-block">
                * This exam is based on your current level
              </small>
            </p>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
}

export default ACLNotifications;
