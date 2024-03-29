import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { getRequest } from "../../helpers/apiRequest";
import defaultUserImg from "../../assets/images/user.svg";
import { getCompleteAssetPath } from "../../helpers/common";

const StudentInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [examReports, setExamReports] = useState(null);

  useEffect(() => {
    getAllDetails();
  }, []);

  async function getAllDetails() {
    setLoading(true);
    await Promise.all([getStudentInfo(), getExamReports()]);
    setLoading(false);
  }

  async function getExamReports() {
    const { res, error } = await getRequest("exams/reports");
    if (error) console.log("error");
    setExamReports(res);
  }

  async function getStudentInfo() {
    const { res, error } = await getRequest("students");
    if (error) console.log("error");
    setStudentInfo({ ...studentInfo, loading: false, ...res });
  }

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <CardBody>
          {loading && <Spinner type="grow" className="mr-2" color="primary" />}
          {!loading && (
            <Row>
              <Col
                sm="12"
                lg="5"
                className="m-auto text-center text-sm-center text-md-left text-lg-left text-xl-left pb-4 pb-sm-4 pb-md-0"
              >
                <Row className="align-items-center">
                  <Col sm="12" md="6">
                    <img
                      src={
                        studentInfo?.profileImage
                          ? getCompleteAssetPath(studentInfo?.profileImage)
                          : defaultUserImg
                      }
                      alt=""
                      className="profile-image"
                    />
                  </Col>
                  <Col sm="12" md="6">
                    <h5 className="font-size-15 mb-0 text-truncate text-info pt-3 pt-sm-3 pt-md-0">
                      {studentInfo?.name}
                    </h5>
                    <p className="text-muted mb-1 mt-0 text-truncate">
                      <small>
                        <b>{studentInfo?.levelDetails?.name}</b>
                      </small>
                    </p>
                    <p className="text-muted mb-1 mt-2 text-truncate">
                      Age: {studentInfo?.age}
                    </p>
                    <p className="text-muted mb-1 text-truncate">
                      {studentInfo?.batchDetails?.name}
                    </p>
                    <p className="text-muted mb-1 text-truncate">
                      {studentInfo?.batchDetails?.centerName}
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col sm="12" lg="7">
                <div className="text-center">
                  <Row>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-3">
                      <h5 className="font-size-15">
                        {examReports?.WCLExams?.participated}
                      </h5>
                      <p className="text-muted mb-0">Participated</p>
                    </div>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-4">
                      <h5 className="font-size-15">
                        {examReports?.WCLExams?.avgAccuracy}
                      </h5>
                      <p className="text-muted mb-0">Avg. Accuracy</p>
                    </div>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-3">
                      <h5 className="font-size-15">
                        {examReports?.WCLExams?.avgSpeed}
                      </h5>
                      <p className="text-muted mb-0">Avg. Speed</p>
                    </div>
                    <div className="col-6 pb-2 col-sm-6 col-md-2">
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle font-size-14">
                          {examReports?.WCLExams?.totalStars}
                          <i className="bx bx-shield ml-1"></i>
                        </span>
                      </div>
                    </div>
                  </Row>
                  <hr />
                  <Row>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-3">
                      <h5 className="font-size-15">
                        {examReports?.ACLExams?.participated}
                      </h5>
                      <p className="text-muted mb-0">Participated</p>
                    </div>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-4">
                      <h5 className="font-size-15">
                        {examReports?.ACLExams?.avgAccuracy}
                      </h5>
                      <p className="text-muted mb-0">Avg. Accuracy</p>
                    </div>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-3">
                      <h5 className="font-size-15">
                        {examReports?.ACLExams?.avgSpeed}
                      </h5>
                      <p className="text-muted mb-0">Avg. Speed</p>
                    </div>
                    <div className="pr-3 pb-2 col-6 col-sm-6 col-md-2">
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle font-size-14">
                          {examReports?.ACLExams?.totalStars}
                          <i className="bx bx-trophy ml-1"></i>
                        </span>
                      </div>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default StudentInfo;
