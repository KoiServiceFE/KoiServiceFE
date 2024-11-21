import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const ScheduleDetails = () => {
    const { id } = useParams(); // Get the Schedule ID from URL
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        // Fetch schedule details from the server using the ID
        fetch(`/api/schedules/${id}`)
            .then((response) => response.json())
            .then((data) => setSchedule(data))
            .catch((error) => console.error('Error:', error));
    }, [id]);

    if (!schedule) {
        return <p>Loading schedule details...</p>;
    }

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Schedule Details</Card.Title>
                    <Row>
                        <Col md={6}>
                            <p><strong>Veterian:</strong> {schedule.veterian.name}</p>
                            <p><strong>Schedule Date:</strong> {schedule.scheduleDate}</p>
                            <p><strong>Start Time:</strong> {schedule.startTime}</p>
                            <p><strong>End Time:</strong> {schedule.endTime}</p>
                        </Col>
                        <Col md={6}>
                            <p><strong>Type:</strong> {schedule.type}</p>
                            <p><strong>Availability:</strong> {schedule.availability ? 'Available' : 'Not Available'}</p>
                        </Col>
                    </Row>
                    <Button variant="primary" href={`/schedules/edit/${id}`}>Edit Schedule</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ScheduleDetails;
