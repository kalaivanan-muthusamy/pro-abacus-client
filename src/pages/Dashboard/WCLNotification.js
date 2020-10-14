import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import defaultUserImg from "../../assets/images/user.svg";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { getCompleteAssetPath } from "../../helpers/common";

function WCLNotifications() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotifications] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getWCLStar();
  }, []);

  async function getWCLStar() {
    try {
      setLoading(true);
      const { error, res: allExams } = await getRequest(
        "exams/notice-board/wcl-star"
      );
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the completed exam details")
        );
        setLoading(false);
        return;
      }
      setNotifications(allExams);
    } catch (err) {
      console.error(err);
      setErrorMsg(getErrorMsg(err, "Couldn't get the completed exam details"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="pb-5">
            WCL Star: {notification?.result?.examDetails?.name}
          </CardTitle>
          <div className="text-center">
            <div className="avatar-md profile-user-wid mb-2 mx-auto">
              <img
                src={
                  notification?.studentDetails?.profileImage
                    ? getCompleteAssetPath(
                        notification?.studentDetails?.profileImage
                      )
                    : defaultUserImg
                }
                alt=""
                className="img-thumbnail rounded-circle"
              />
            </div>
            <h5 className="font-size-15 text-truncate">
              {notification?.studentDetails?.name}
            </h5>
            <p className="text-muted mb-0 text-truncate">
              {notification?.studentDetails?.level}
            </p>
          </div>
          <Row className="pl-3 text-center">
            <Col xs="4">
              <div className="mt-4">
                <p className="mb-2 text-truncate">
                  <i className="mdi mdi-circle text-secondary mr-1"></i> Total
                  Sum
                </p>
                <h5>{notification?.result?.totalQuestions}</h5>
              </div>
            </Col>
            <Col xs="4">
              <div className="mt-4">
                <p className="mb-2 text-truncate">
                  <i className="mdi mdi-circle text-success mr-1"></i>
                  Accuracy
                </p>
                <h5>{notification?.result?.accuracy}%</h5>
              </div>
            </Col>
            <Col xs="4">
              <div className="mt-4">
                <p className="mb-2 text-truncate">
                  <i className="mdi mdi-circle text-danger mr-1"></i>Speed
                </p>
                <h5>{notification?.result?.speed}/m</h5>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default WCLNotifications;
