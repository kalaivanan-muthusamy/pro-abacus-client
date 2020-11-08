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
              <Col sm="12" lg="6" className="m-auto">
                <Row className="align-items-center">
                  <Col sm="12" md="5">
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
                  <Col sm="12" md="7">
                    <h5 className="font-size-15 mb-0 text-truncate text-info">
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

              <Col sm="12" lg="6">
                <div className="text-center">
                  <Row>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.totalStudents}
                      </h5>
                      <p className="text-muted mb-0">Total Students</p>
                    </div>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.totalAssessments}
                      </h5>
                      <p className="text-muted mb-0">Assessments</p>
                    </div>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.WCLParticipatedStudents}
                      </h5>
                      <p className="text-muted mb-0">WCL Participated</p>
                    </div>
                  </Row>
                  <hr />
                  <Row>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentStats?.ACLParticipatedStudents}
                      </h5>
                      <p className="text-muted mb-0">ACL Participated</p>
                    </div>
                    <div className="col-sm-12 col-md-4  pr-3">
                      <h5 className="text-info font-size-15">
                        <i className="bx bx-shield ml-1"></i>{" "}
                        {studentStats?.WCLWonStudents}
                      </h5>
                      <p className="mb-0">WCL Won</p>
                    </div>
                    <div className="col-sm-12 col-md-4  pr-3">
                      <h5 className="text-info font-size-15">
                        <i className="bx bx-trophy ml-1"></i>{" "}
                        {studentStats?.ACLWonStudents}
                      </h5>
                      <p className="mb-0"> ACL Won</p>
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
export default TeacherInfo;
