import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  Progress,
  Badge,
  Button,
  Modal,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withNamespaces } from "react-i18next";
import { getErrorMsg } from "../../helpers/apiRequest";
import { EXAM_TYPES, EXAM_TYPE_TEXT, SPLITUP_CATEGORY } from "./../../contants";
import { postRequest } from "./../../helpers/apiRequest";
import { useHistory } from "react-router-dom";
import { shuffleArrayElement } from "../../helpers/common";

function Exam(props) {
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [activeQuestionId, setActiveQuestionId] = useState(0);
  const [skippedQuestionIds, setSkippedQuestionIds] = useState([]);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  const [skippedOnly, setSkippedOnly] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [showFinishWarning, setFinishWarning] = useState(false);
  const [examTimer, setExamTimer] = useState(false);
  const history = useHistory();
  const answerRef = useRef();
  const timerRef = useRef();
  const examStartTimerRef = useRef();

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    // Start the timer
    if (examDetails?.duration) {
      let timerInSeconds = examDetails?.duration * 60;
      setTimer(timerRef, timerInSeconds);
      const interval = setInterval(() => {
        setTimer(timerRef, timerInSeconds, interval);
        --timerInSeconds;
        if (timerInSeconds < 0) {
          finishExam();
        }
      }, 1000);
    }
  }, [examDetails]);

  useEffect(() => {
    setTimeStarted(new Date());
  }, [activeQuestionId]);

  function setTimer(timerRef, timerInSeconds, interval) {
    let timer = timerInSeconds;
    let hours, minutes, seconds;
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (timerRef?.current)
      timerRef.current.innerText = hours + ":" + minutes + ":" + seconds;
    if (--timer < 0) {
      timer = timerInSeconds;
      interval && clearInterval(interval);
    }
  }

  async function getQuestions() {
    try {
      setLoading(true);
      const { res, error } = await postRequest("exams/start", {
        examId: window.location.pathname.split("/").pop(),
      });
      if (error) {
        // Validate if the error because pre-accessing the timed exam
        const statusCode = error?.response?.status;
        const data = error?.response?.data;
        const isExpired = data?.isExpired ?? true;
        if (statusCode === 400 && !isExpired) {
          setExamTimer(data?.startsIn);
          startExamTimer(data?.startsIn);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          return setPageError(
            getErrorMsg(error, "Couldn't start the exam at the moment now")
          );
        }
      }
      const examDetails = res;
      const questions = examDetails?.shuffleQuestions
        ? shuffleArrayElement(res.questions)
        : res.questions;
      setQuestions(questions);
      setActiveQuestionId(questions[0]._id);
      setExamDetails(examDetails);
      setLoading(false);
    } catch (err) {
      console.log("ERR", err);
      setLoading(false);
      setPageError("Couldn't start the exam at the moment now");
    }
  }

  function startExamTimer(duration) {
    // Start the timer
    if (duration && duration > 0) {
      let timerInSeconds = duration;
      const interval = setInterval(() => {
        setTimer(examStartTimerRef, timerInSeconds, interval);
        --timerInSeconds;
        if (timerInSeconds < 0) {
          getQuestions();
          setExamTimer(null);
        }
      }, 1000);
    }
  }

  function onSubmit(event) {
    // Update the state & submit the answer to the backend
    event.preventDefault();
    const value = answerRef?.current?.value;
    if (value !== undefined && value !== "") {
      const isLastQuestion =
        questions.findIndex((question) => question._id === activeQuestionId) ===
          questions.length - 1 ||
        answeredQuestionIds?.length === questions?.length - 1;
      const timeTaken = (new Date().getTime() - timeStarted.getTime()) / 1000;
      postRequest("exams/capture", {
        examId: examDetails._id,
        questionId: activeQuestionId,
        answer: parseInt(value),
        timeTaken,
      });
      setAnsweredQuestionIds([...answeredQuestionIds, activeQuestionId]);
      const skippedQuestionIndex = skippedQuestionIds.indexOf(activeQuestionId);
      const updateSkippedQuestionsIds = [...skippedQuestionIds];
      if (skippedQuestionIndex !== -1) {
        updateSkippedQuestionsIds.splice(skippedQuestionIndex, 1);
        setSkippedQuestionIds([...updateSkippedQuestionsIds]);
      }
      answerRef.current.value = "";
      answerRef?.current?.focus();
      const updatedQuestions = [...questions];
      const question = updatedQuestions.find((q) => activeQuestionId === q._id);
      // TODO - Is this logic implemented in backend
      if (EXAM_TYPES.PRACTICE === examDetails?.examType) {
        const isCorrectAnswer = parseFloat(value) === question.answer;
        question.isCorrectAnswer = isCorrectAnswer;
      }

      question.givenAnswer = parseFloat(value);
      setQuestions([...updatedQuestions]);
      if (isLastQuestion) {
        if (updateSkippedQuestionsIds?.length > 0) {
          setActiveQuestionId(updateSkippedQuestionsIds?.[0]);
          setFinishWarning(true);
        } else {
          finishExam();
        }
      } else {
        jumpToNextQuestion();
      }
    } else {
      answerRef?.current?.focus?.();
    }
  }

  function onSkip() {
    setSkippedQuestionIds([
      ...new Set([...skippedQuestionIds, activeQuestionId]),
    ]);
    jumpToNextQuestion();
  }

  function onQuestionClick(questionId) {
    setActiveQuestionId(questionId);
  }

  function getCompletedPercentage() {
    const percentage = (answeredQuestionIds?.length / questions?.length) * 100;
    return Math.floor(percentage);
  }

  function getActiveQuestion() {
    return questions?.find((question) => question._id === activeQuestionId);
  }

  function getActiveQuestionNumber() {
    const activeQuestionIndex = questions?.findIndex(
      (q) => q._id === activeQuestionId
    );
    return activeQuestionIndex + 1;
  }

  function jumpToNextQuestion() {
    const currentQuestionIndex = questions?.findIndex(
      (question) => question._id === activeQuestionId
    );
    const nextQuestion = questions?.find((question, index) => {
      return index > currentQuestionIndex && question.givenAnswer === undefined;
    });
    if (nextQuestion) {
      setActiveQuestionId(nextQuestion._id);
      answerRef?.current?.focus();
    }
  }

  function getQuestionNumber(question) {
    const currentQuestionIndex = questions?.findIndex(
      (q) => q._id === question._id
    );
    return currentQuestionIndex + 1;
  }

  function onFinishExam(event) {
    event.preventDefault();
    if (answeredQuestionIds.length !== questions.length) {
      setFinishWarning(true);
    } else {
      finishExam();
    }
  }

  async function finishExam() {
    try {
      setLoading(true);
      setFinishWarning(false);
      const { error, res } = await postRequest("exams/complete", {
        examId: examDetails._id,
      });
      if (error) {
        setLoading(false);
        return setPageError(
          getErrorMsg(
            error,
            "Couldn't complete the exam. Please try again later!"
          )
        );
      }
      history.push(`/exam/completed/${examDetails._id}`);
    } catch (err) {
      setLoading(false);
      return setPageError(
        getErrorMsg(err, "Couldn't complete the exam. Please try again later!")
      );
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={props.t("Exam")} />
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  {loading && (
                    <div className="spinner-overlay">
                      <div className="spinner" />
                    </div>
                  )}
                  {!pageError && !examTimer && (
                    <div className="exam-container">
                      <Row className="mb-2">
                        <Col>
                          <p className="mb-1 mt-0">
                            Duration: <b ref={timerRef}>N/A</b>
                          </p>
                          <Badge color="dark" pill>
                            Task Completed - {getCompletedPercentage()}%
                          </Badge>
                        </Col>
                        <Col className="text-center">
                          <p className="mb-0">{EXAM_TYPE_TEXT?.[examDetails?.examType]}</p>
                          <p className="mb-0  mt-1">
                            <b>
                              Question {getActiveQuestionNumber()}/
                              {questions?.length}
                            </b>
                          </p>
                        </Col>
                        <Col className="text-right">
                          <Button onClick={onFinishExam} color="primary">
                            Finish Exam
                          </Button>
                        </Col>
                      </Row>
                      <Progress
                        className="mt-1 mb-2"
                        striped
                        animated
                        color="primary"
                        value={getCompletedPercentage()}
                      />
                      <Row>
                        <Col sm="12" md="3" className="text-center m-auto">
                          <form onSubmit={onSubmit}>
                            <div className="question-container">
                              {getActiveQuestion()?.type ===
                                SPLITUP_CATEGORY.ADDITION_AND_SUBTRACTION && (
                                <div className={getActiveQuestion()?.type}>
                                  {getActiveQuestion()?.rowValues.map(
                                    (value, index) => (
                                      <div key={index} className="number">
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                              {getActiveQuestion()?.type ===
                                SPLITUP_CATEGORY.MULTIPLICATION && (
                                <div className={getActiveQuestion()?.type}>
                                  <div className="number">
                                    {getActiveQuestion()?.rowValues?.[0]}
                                  </div>
                                  x
                                  <div className="number">
                                    {getActiveQuestion()?.rowValues?.[1]}
                                  </div>
                                </div>
                              )}
                              {getActiveQuestion()?.type ===
                                SPLITUP_CATEGORY.DIVISION && (
                                <div className={getActiveQuestion()?.type}>
                                  <div className="number">
                                    {getActiveQuestion()?.rowValues?.[0]}
                                  </div>
                                  ÷
                                  <div className="number">
                                    {getActiveQuestion()?.rowValues?.[1]}
                                  </div>
                                </div>
                              )}

                              <hr />
                              <input
                                ref={answerRef}
                                autoFocus
                                type="number"
                                placeholder="Enter the answer here!"
                                className="form-control"
                              />
                              <hr />
                              {(getActiveQuestionNumber() ===
                                questions?.length ||
                                answeredQuestionIds?.length ===
                                  questions?.length - 1) && (
                                <Button onClick={onSubmit} color="primary">
                                  Submit & Finish Exam
                                </Button>
                              )}
                              {getActiveQuestionNumber() !==
                                questions?.length &&
                                answeredQuestionIds?.length !==
                                  questions?.length - 1 && (
                                  <React.Fragment>
                                    <Button
                                      onClick={onSubmit}
                                      color="success"
                                      className="mr-2"
                                    >
                                      Submit & Next
                                    </Button>
                                    {examDetails?.skipQuestions &&
                                      getActiveQuestionNumber() !==
                                        questions?.length && (
                                        <Button onClick={onSkip}>
                                          Skip to Next
                                        </Button>
                                      )}
                                  </React.Fragment>
                                )}
                            </div>
                          </form>
                        </Col>
                        <Col sm="12" md="4" className="mt-4">
                          <div>
                            <h5 className="d-inline">Questions Overview</h5>
                            {examDetails?.skipQuestions && (
                              <div className="d-inline float-right custom-control custom-checkbox mb-3">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="skippedOnly"
                                  onChange={() => setSkippedOnly(!skippedOnly)}
                                  checked={skippedOnly}
                                />
                                <label
                                  onClick={() => setSkippedOnly(!skippedOnly)}
                                  className="custom-control-label"
                                >
                                  Skipped Only
                                </label>
                              </div>
                            )}
                          </div>
                          <div className="question-selection">
                            {questions
                              ?.filter((question, index) =>
                                skippedOnly
                                  ? skippedQuestionIds?.includes(question._id)
                                  : true
                              )
                              .map((question, index) => {
                                return (
                                  <span
                                    key={index}
                                    onClick={() =>
                                      skippedQuestionIds.includes(question._id)
                                        ? onQuestionClick(question._id)
                                        : undefined
                                    }
                                    className={`
                                    ${
                                      skippedQuestionIds.includes(question._id)
                                        ? "skipped"
                                        : ""
                                    }
                                    ${
                                      question.givenAnswer !== undefined
                                        ? "answered"
                                        : ""
                                    }
                                    ${
                                      question.givenAnswer !== undefined &&
                                      question.isCorrectAnswer !== undefined
                                        ? question.isCorrectAnswer
                                          ? "success"
                                          : "incorrect"
                                        : null
                                    }
                                    ${
                                      question._id === activeQuestionId
                                        ? "active"
                                        : ""
                                    }
                                    `}
                                  >
                                    {getQuestionNumber(question)}
                                  </span>
                                );
                              })}
                            {questions?.filter((question, index) =>
                              skippedOnly
                                ? skippedQuestionIds.includes(question._id)
                                : true
                            )?.length === 0 && (
                              <div className="text-center mt-4">
                                No Questions to display
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {pageError && (
                    <div className="text-center mb-5 mt-5">
                      <div>
                        <i className="fa font-size-24 mb-4 fa-exclamation-triangle" />
                      </div>
                      {pageError}
                    </div>
                  )}
                  {examTimer && (
                    <div className="text-center mb-5 mt-5">
                      <div>
                        <i className="fa font-size-24 mb-4 fa-clock" />
                      </div>
                      Exam starts in
                      <div className="exam-start-timer" ref={examStartTimerRef}>
                        ---
                      </div>
                      <p className="mt-3">
                        <small>
                          * The page will refreshed automatically. You need not
                          to reload the page
                        </small>
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {showFinishWarning && (
        <Modal centered isOpen toggle={() => setFinishWarning(false)}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Warning!
            </h5>
          </div>
          <div className="modal-body">
            You didn't answered to all the questions. Do you want to finish the
            exam now?
            <Row className="mt-4">
              <Col>
                <Button
                  onClick={() => setFinishWarning(false)}
                  color="secondary"
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button onClick={finishExam} color="danger">
                  Yes. Finish Exam
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default withNamespaces()(Exam);
