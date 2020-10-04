import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Container } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { getErrorMsg, postRequest } from "../../helpers/apiRequest";

const EmailVerification = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { role, email, hash } = useParams();

  useEffect(() => {
    verifyEmail();
  }, []);

  async function verifyEmail() {
    try {
      setLoading(true);
      const { error } = await postRequest(`${role}s/verify`, {
        email: decodeURIComponent(email),
        hash,
      });
      if (error) {
        setLoading(false);
        setErrorMsg(getErrorMsg(error, "Couldn't verify this email"));
      } else {
        setLoading(false);
        setSuccessMsg("Email has been verified successfully");
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(getErrorMsg(err, "Couldn't verify this email"));
    }
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={8}>
              <Card className="overflow-hidden">
                {loading && (
                  <div className="spinner-overlay">
                    <div className="spinner" />
                  </div>
                )}
                <CardBody className="pt-0">
                  <div className="text-center mb-5 mt-5">
                    <div>
                      <i className="bx bx-mail-send font-size-24 mb-4" />
                    </div>
                    {successMsg && <p>{successMsg}</p>}
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <Link
                      to={`/login/${role}`}
                      className="btn btn-primary mt-3"
                    >
                      Proceed Login
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmailVerification;
