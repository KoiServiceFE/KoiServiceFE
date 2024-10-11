import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { fetchServices } from "../../services/koiService";
import "./Service.css";

export default function Service() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                console.error("Failed to load services:", error);
            }
        };

        loadServices();
    }, []);

    return (
        <div style={{ padding: "60px 0 60px 0", textAlign: "center" }}>
            <Container>
                <header className="section-header">
                    <h3>Services</h3>
                </header>
                <Row>
                    {services.map((service, index) => (
                        <Col sm={6} md={4} lg={3} key={service.serviceID}>
                            <Card className="single-service" style={{ margin: "20px 0" }}>
                                <div className={`icon icon-${(index % 4) + 1}`}
                                    style={{ width: '50px', height: '50px', margin: '20px auto 15px' }}>
                                </div>
                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <Card.Title style={{ color: "#A52A2A", fontWeight: 800 }}>{service.name}</Card.Title>
                                        <Card.Text>{service.duration} Min | ${service.basePrice}</Card.Text>
                                        <Card.Text>{service.description}</Card.Text>
                                    </div>
                                    <Button href="booking.html"
                                        className="btn-book"
                                        style={{ backgroundColor: "#A52A2A", borderRadius: "30px", border: "none", marginTop: "auto" }}>
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
