import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { getRequest } from "../../helpers/apiRequest";

const StudentInfo = (props) => {
  const [studentInfo, setStudentInfo] = useState({ loading: true });

  useEffect(() => {
    getStudentInfo();
  }, []);

  async function getStudentInfo() {
    const { res, error } = await getRequest("student-info");
    if (error) console.log("error");
    setStudentInfo({ ...studentInfo, loading: false, ...res });
  }

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <CardBody>
          {studentInfo?.loading && (
            <Spinner type="grow" className="mr-2" color="primary" />
          )}
          {!studentInfo?.loading && (
            <Row>
              <Col lg="3">
                <div className="avatar-md mb-2">
                  <img
                    src={avatar1}
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">
                  {studentInfo?.name}
                </h5>
                <p className="text-muted mb-1 text-truncate">
                  {studentInfo?.abacusCenter}
                </p>
                <p className="text-muted mb-0 text-truncate">
                  {studentInfo?.level}
                </p>
              </Col>

              <Col lg="9">
                <div className="pt-4 text-center">
                  <Row>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentInfo?.weeklyAssessmentMetrics?.rank}
                      </h5>
                      <p className="text-muted mb-0">Rank</p>
                    </div>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentInfo?.weeklyAssessmentMetrics?.participated}
                      </h5>
                      <p className="text-muted mb-0">Participated</p>
                    </div>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentInfo?.weeklyAssessmentMetrics?.totalSums}
                      </h5>
                      <p className="text-muted mb-0">Total Sums</p>
                    </div>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentInfo?.weeklyAssessmentMetrics?.avgAccuracy}
                      </h5>
                      <p className="text-muted mb-0">Avg. Accuracy</p>
                    </div>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentInfo?.weeklyAssessmentMetrics?.avgSpeed}
                      </h5>
                      <p className="text-muted mb-0">Avg. Speed</p>
                    </div>
                    <div className="pr-3">
                      <div className="avatar-sm mx-auto">
                        <span className="avatar-title rounded-circle bg-soft-primary font-size-14">
                          {studentInfo?.weeklyAssessmentMetrics?.totalStars}
                          <i className="mdi mdi-star text-primary"></i>
                        </span>
                      </div>
                    </div>
                  </Row>
                  <hr />
                  <Row>
                    <div className="pr-3">
                      <h5 className="font-size-15">
                        {studentInfo?.aclMetrics?.aclWon}
                      </h5>
                      <p className="text-primary mb-0">ACL Won</p>
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
