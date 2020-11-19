import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { getRequest } from "../../helpers/apiRequest";
import defaultUserImg from "../../assets/images/user.svg";
import { getCompleteAssetPath } from "../../helpers/common";

const TeacherInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [studentStats, setStudentStats] = useState(null);

  useEffect(() => {
    getAllDetails();
  }, []);

  async function getAllDetails() {
    setLoading(true);
    await Promise.all([getTeacherInfo(), getStudentsStats()]);
    setLoading(false);
  }

  async function getStudentsStats() {
    const { res, error } = await getRequest("teachers/student-stats");
    if (error) console.log("error");
    setStudentStats(res);
  }

  async function getTeacherInfo() {
    const { res, error } = await getRequest("teachers");
    if (error) console.log("error");
    setTeacherInfo({ ...teacherInfo, loading: false, ...res });
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
                        teacherInfo?.profileImage
                          ? getCompleteAssetPath(teacherInfo?.profileImage)
                          : defaultUserImg
                      }
                      alt=""
                      className="profile-image"
                    />
                  </Col>
                  <Col sm="12" md="6">
                    <h5 className="font-size-15 mb-0 text-truncate text-info pt-3 pt-sm-3 pt-md-0">
                      {teacherInfo?.name}
                    </h5>
                    <p className="text-muted mb-1 mt-2 text-truncate">
                      Age: {teacherInfo?.age}
                    </p>
                    <p className="text-muted mb-1 text-truncate">
                      {teacherInfo?.centerName}
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col sm="12" lg="7">
                <div className="text-center">
                  <Row>
                    <Col sm="6" md="4" className="col-6 pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.totalStudents}
                      </h5>
                      <p className="text-muted mb-0">Total Students</p>
                    </Col>
                    <Col sm="6" md="4" className="col-6 pb-3 pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.totalAssessments}
                      </h5>
                      <p className="text-muted mb-0">Assessments</p>
                    </Col>
                    <Col sm="6" md="4" className="col-6 pb-3 pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.WCLParticipatedStudents}
                      </h5>
                      <p className="text-muted mb-0">WCL Participated</p>
                    </Col>
                    <div className="col-12 d-none d-sm-none d-md-block">
                      <hr />
                    </div>
                    <Col sm="6" md="4" className="col-6 pb-3 pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.ACLParticipatedStudents}
                      </h5>
                      <p className="text-muted mb-0">ACL Participated</p>
                    </Col>
                    <Col sm="6" md="4" className=" col-6 pb-3 pr-3">
                      <h5 className="text-info font-size-15">
                        <i className="bx bx-shield ml-1"></i>{" "}
                        {studentStats?.WCLWonStudents}
                      </h5>
                      <p className="mb-0">WCL Won</p>
                    </Col>
                    <Col sm="6" md="4" className="col-6 pb-3 pr-3">
                      <h5 className="text-info font-size-15">
                        <i className="bx bx-trophy ml-1"></i>{" "}
                        {studentStats?.ACLWonStudents}
                      </h5>
                      <p className="mb-0"> ACL Won</p>
                    </Col>
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
export default TeacherInfo;
