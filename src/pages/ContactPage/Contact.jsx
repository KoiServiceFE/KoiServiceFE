import { Container, Row, Col, Image } from 'react-bootstrap';
import "./Contact.css";

export default function Contact() {
    return (
        <div id="contact" className="section-bg wow fadeInUp">
            <Container>
                <div className="section-header">
                    <h3>Contact Us</h3>
                </div>

                <Row>
                    <Col md={6}>
                        <div className="contact-detail">
                            <div className="contact-hours">
                                <h4>Opening Hours</h4>
                                <p>Monday-Sunday: 7am to 5pm</p>
                               
                            </div>

                            <div className="contact-info">
                                <h4>Contact Info</h4>
                                <p>123 ABC Street, XYZ District, Ho Chi Minh City</p>
                                <p>+84 0964703716</p>
                                <p>fishcareservice@gmail.com</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <div className="fish">
                            <Image src="/Images/fish.jpeg" fluid />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
