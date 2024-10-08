import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Service.css";

export default function Service() {
    const services = [
        {
            id: 1,
            title: "Consultation",
            duration: "20 Min",
            price: "$50.00",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing."
        },
        {
            id: 2,
            title: "Health Checkup",
            duration: "30 Min",
            price: "$30.00",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing."
        },
        {
            id: 3,
            title: "Flu Shots",
            duration: "10 Min",
            price: "$15.00",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing."
        },
        {
            id: 4,
            title: "New Service",
            duration: "45 Min",
            price: "$60.00",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing."
        }
    ];

    return (
        <div id="services" style={{ padding: "60px 0 30px 0", textAlign: "center" }}>
            <Container>
                <header className="section-header">
                    <h3>Services</h3>
                </header>
                <Row>
                    {services.map((service, index) => (
                        <Col sm={6} md={4} lg={3} key={service.id}>
                            <Card className="single-service" style={{ margin: "20px 0" }}>
                                {/* Xác định class icon dựa trên vị trí của dịch vụ trong mảng */}
                                <div className={`icon icon-${(index % 4) + 1}`}
                                    style={{ width: '50px', height: '50px', margin: '20px auto 15px' }}>
                                </div>
                                <Card.Body>
                                    <Card.Title style={{ color: "#A52A2A", fontWeight: 800 }}>{service.title}</Card.Title>
                                    <Card.Text>{service.duration} | {service.price}</Card.Text>
                                    <Card.Text>{service.description}</Card.Text>
                                    <Button href="booking.html" 
                                    className="btn-book "
                                    style={{ backgroundColor: "#A52A2A", borderRadius: "30px", border: "none" }}>
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
