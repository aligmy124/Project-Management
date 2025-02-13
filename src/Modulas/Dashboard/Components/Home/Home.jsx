import * as React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import Header from "../../../Shared/Components/Header/Header";
import HomeImg1 from "../../../../assets/images/HomeImg1.png";
import HomeImg2 from "../../../../assets/images/numPro.png";
import pro3 from "../../../../assets/images/pro3.png";
import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";

export default function Home() {
  // context
  const { LoginData } = React.useContext(AuthContext);

  return (
    <>
      <Header />
      <Container className="home mt-5">
        <Row className="justify-content-center">
          {/* الكارد الأول */}
          <Col xs={12} md={6} lg={5} className="mb-4">
            <Card className="p-3 shadow-sm border-primary custom-card h-100 d-flex flex-column">
              <h5 className="fw-bold">Tasks</h5>
              <p className="text-muted flex-grow-1">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <Row>
                <Col xs={12} sm={4} className="text-center mb-2 mb-sm-0">
                  <Card className="p-3 rounded custom-inner-card h-100 d-flex flex-column">
                    <div className="img-card">
                      <img
                        src={HomeImg1}
                        alt="HomeImg1"
                        className="img-fluid"
                      />
                    </div>
                    <p className="fw-bold mb-1 text-muted">Progress</p>
                    <h5 className="text-primary">$7328.32</h5>
                  </Card>
                </Col>
                <Col xs={12} sm={4} className="text-center mb-2 mb-sm-0">
                  <Card className="p-3 bg-light rounded custom-inner-card h-100 d-flex flex-column">
                    <div className="img-card">
                      <img
                        src={HomeImg2}
                        alt="HomeImg2"
                        className="img-fluid"
                      />
                    </div>
                    <p className="fw-bold mb-1 text-muted">Tasks Number</p>
                    <h5 className="text-success">1293</h5>
                  </Card>
                </Col>
                <Col xs={12} sm={4} className="text-center">
                  <Card className="p-3 bg-light rounded custom-inner-card h-100 d-flex flex-column">
                    <div className="img-card">
                      <img src={pro3} alt="pro3" className="img-fluid" />
                    </div>
                    <p className="fw-bold mb-1 text-muted">Projects Number</p>
                    <h5 className="text-danger">32</h5>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* الكارد الثاني */}
          {LoginData.userGroup === "Manager" && (
            <Col xs={12} md={6} lg={5} className="mb-4">
              <Card className="p-3 shadow-sm border-primary custom-card h-100 d-flex flex-column">
                <h5 className="fw-bold">Users</h5>
                <p className="text-muted flex-grow-1">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <Row>
                  <Col xs={12} sm={4} className="text-center mb-2 mb-sm-0">
                    <Card className="p-3 bg-light rounded custom-inner-card h-100 d-flex flex-column">
                      <div className="img-card">
                        <img
                          src={HomeImg1}
                          alt="HomeImg1"
                          className="img-fluid"
                        />
                      </div>
                      <p className="fw-bold mb-1 text-muted">Active</p>
                      <h5 className="text-primary">$7328.32</h5>
                    </Card>
                  </Col>
                  <Col xs={12} sm={4} className="text-center mb-2 mb-sm-0">
                    <Card className="p-3 bg-light rounded custom-inner-card h-100 d-flex flex-column">
                      <div className="img-card">
                        <img
                          src={HomeImg2}
                          alt="HomeImg2"
                          className="img-fluid"
                        />
                      </div>
                      <p className="fw-bold mb-1 text-muted">Inactive</p>
                      <h5 className="text-success">1293</h5>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
