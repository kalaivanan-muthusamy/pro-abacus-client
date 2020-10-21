import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import defaultUserImg from "../../assets/images/user.svg";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { getCompleteAssetPath } from "../../helpers/common";

function WCLNotifications() {
  const [loading, setLoading] = useState(false);
  const [wclStarInfo, setWCLStarInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getWCLStar();
  }, []);

  async function getWCLStar() {
    try {
      setLoading(true);
      const { error, res: wclStart } = await getRequest(
        "exams/notice-board/wcl-star"
      );
      if (error) {
        setErrorMsg(
          getErrorMsg(error, "Couldn't get the completed exam details")
        );
        setLoading(false);
        return;
      }
      if (Object.keys(wclStart).length > 0) {
        setWCLStarInfo(wclStart);
      }
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
          {loading && (
            <div className="spinner-overlay">
              <div className="spinner" />
            </div>
          )}
          <CardTitle className="pb-3">
            WCL Star: {wclStarInfo?.result?.examDetails?.name}
          </CardTitle>
          {wclStarInfo && (
            <React.Fragment>
              <div className="text-center pt-4">
                <div className="avatar-md profile-user-wid mb-2 mx-auto">
                  <img
                    src={
                      wclStarInfo?.studentDetails?.profileImage
                        ? getCompleteAssetPath(
                            wclStarInfo?.studentDetails?.profileImage
                          )
                        : defaultUserImg
                    }
                    alt=""
                    className="img-thumbnail rounded-circle"
                  />
                </div>
                <h5 className="font-size-15 text-truncate">
                  {wclStarInfo?.studentDetails?.name}
                </h5>
                <p className="text-muted mb-0 text-truncate">
                  {wclStarInfo?.studentDetails?.level}
                </p>
              </div>
              <Row className="text-center">
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-secondary mr-1"></i>{" "}
                      Attempted
                    </p>
                    <h5>{wclStarInfo?.result?.answeredQuestions}</h5>
                  </div>
                </Col>
                <Col xs="4">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success mr-1"></i>
                      Accuracy
                    </p>
                    <h5>{wclStarInfo?.result?.accuracy}%</h5>
                  </div>
                </Col>
                <Col xs="4" className="p-0">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-info mr-1"></i>Speed
                    </p>
                    <h5>{wclStarInfo?.result?.speed} sums/min</h5>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          )}
          {!wclStarInfo && (
            <div className="text-center mb-3 mt-0">
              <div>
                <i className="bx bx-comment-error font-size-24 mb-2" />
              </div>
              No info available
            </div>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default WCLNotifications;
