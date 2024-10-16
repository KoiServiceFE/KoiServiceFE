import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServices, selectService } from '../../stores/slices/serviceSlice';
import { fetchUserProfile } from '../../stores/slices/authSlice';
import { fetchVets, selectVet } from '../../stores/slices/vetSlice';
import { Form, Button, Row, Col, Container, Alert, Spinner } from 'react-bootstrap';
import { createBookingWithRandomVet } from '../../services/koiService';

const Booking = () => {
    const dispatch = useDispatch();
    const { services,selectedService } = useSelector((state) => state.services);
    const { userProfile, userId } = useSelector((state) => state.auth);
    const { availableVets, selectedVetSlots } = useSelector((state) => state.vets);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedVet, setSelectedVet] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [bookingStatus, setBookingStatus] = useState(null);

    const username = userProfile ? userProfile.username : '';
    const phoneNumber = userProfile ? userProfile.phoneNumber : '';
    const email = userProfile ? userProfile.email : '';

    useEffect(() => {
        dispatch(fetchUserProfile(userId));
        dispatch(getServices());
    }, [dispatch, userId]);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        setSelectedVet('');
        setSelectedSlot('');
        dispatch(fetchVets(date));
    };

    const handleVetChange = (e) => {
        const vetID = e.target.value;
        setSelectedVet(vetID);
        setSelectedSlot('');
        dispatch(selectVet(vetID));
    };

    const handleServiceChange = (e) => {
        const serviceID = e.target.value;
        dispatch(selectService(serviceID));
    };

    const handleSlotChange = (e) => {
        setSelectedSlot(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedService || !selectedDate || !selectedVet || !selectedSlot) {
            alert("Vui lòng chọn dịch vụ, ngày, bác sĩ và slot trực.");
            return;
        }

        const bookingData = {
            user: { userID: userId },
            service: { serviceID: selectedService },
            date: selectedDate,
            payment: { paymentID: 1 },
            vet: selectedVet,
            scheduleID: selectedSlot
        };

        try {
            await createBookingWithRandomVet(bookingData);
            setBookingStatus({ type: 'success', message: 'Đặt lịch hẹn thành công!' });
        } catch (error) {
            setBookingStatus({ type: 'error', message: 'Không thể đặt lịch hẹn. Vui lòng thử lại.' });
        }
    };

    return (
        <Container className='py-5'>
            <h2 className="text-center my-4">Đặt Lịch Hẹn</h2>

            {bookingStatus && (
                <Alert variant={bookingStatus.type === 'success' ? 'success' : 'danger'}>
                    {bookingStatus.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="username">
                            <Form.Label>FullName</Form.Label>
                            <Form.Control type="text" value={username} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={phoneNumber} readOnly />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} readOnly />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="service" className="mb-3">
                    <Form.Label>Service</Form.Label>
                    <Form.Control as="select" value={selectedService || ''} onChange={handleServiceChange}>
                        <option value="">Choose Service</option>
                        {services.map((service) => (
                            <option key={service.serviceID} value={service.serviceID}>
                                {service.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="date" className="mb-3">
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Form.Group>

                {availableVets.length > 0 ? (
                    <>
                        <Form.Group controlId="vet" className="mb-3">
                            <Form.Label>Veterian</Form.Label>
                            <Form.Control as="select" value={selectedVet} onChange={handleVetChange}>
                                <option value="">Choose Verterian</option>
                                {availableVets.map((vet) => (
                                    <option key={vet.vetID} value={vet.vetID}>
                                        {vet.name} - {vet.specialization}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {selectedVetSlots.length > 0 && (
                            <Form.Group controlId="vetSlot" className="mb-3">
                                <Form.Label>Slot</Form.Label>
                                <Form.Control as="select" value={selectedSlot} onChange={handleSlotChange}>
                                    <option value="">Choose Slot</option>
                                    {selectedVetSlots.map((slot) => (
                                        <option key={slot.scheduleID} value={slot.scheduleID}>
                                            {slot.startTime} - {slot.endTime}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                    </>
                ) : (
                    selectedDate && <Alert variant="info">No veterian on duty this day. Please choose another day.</Alert>
                )}
                <Button variant="primary" type="submit" className="mt-4" disabled={!selectedService || !selectedDate || !selectedVet || !selectedSlot}>
                    Đặt Hẹn
                </Button>
            </Form>
        </Container>
    );
};

export default Booking;