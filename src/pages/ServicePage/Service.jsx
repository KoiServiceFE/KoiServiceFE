import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getServices } from "../../stores/slices/serviceSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Service.css";

export default function Service() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { services, isLoading, error } = useSelector((state) => state.services);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const handleBookingClick = () => {
    if (token) {
      navigate("/Booking");
    } else {
      navigate("/Login");
    }
  };

  return (
    <div style={{ padding: "60px 0 60px 0", textAlign: "center" }}>
      <Container>
        <header className="section-header">
          <h3>Services</h3>
        </header>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {services.map((service, index) => (
            <Col sm={6} md={4} lg={3} key={service.serviceID}>
              <Card className="single-service" style={{ margin: "20px 0" }}>
                <div
                  className={`icon icon-${(index % 4) + 1}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "20px auto 15px",
                  }}
                ></div>
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Card.Title style={{ color: "#A52A2A", fontWeight: 800 }}>
                      {service.name}
                    </Card.Title>
                    <Card.Text>
                      {service.duration} Min | ${service.basePrice}
                    </Card.Text>
                    <Card.Text>{service.description}</Card.Text>
                  </div>
                  <Button
                    onClick={handleBookingClick}
                    className="btn-book"
                    style={{
                      backgroundColor: "#A52A2A",
                      borderRadius: "30px",
                      border: "none",
                      marginTop: "auto",
                    }}
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
