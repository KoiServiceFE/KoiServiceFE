import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServices, selectService } from '../../stores/slices/serviceSlice';
import { fetchUserProfile } from '../../stores/slices/authSlice';
import { fetchVets, selectVet } from '../../stores/slices/vetSlice';
import { createBooking, createBookingWithRandomVet } from '../../stores/slices/bookingSlice';
import { initiatePayment } from '../../stores/slices/paymentSlice';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const Booking = () => {
    const dispatch = useDispatch();
    const { services, selectedService } = useSelector((state) => state.services);
    const { userProfile, userId } = useSelector((state) => state.auth);
    const { availableVets, selectedVetSlots } = useSelector((state) => state.vets);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedVet, setSelectedVet] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    const isSubmitDisabled = !selectedService || !selectedDate || (selectedVet && !selectedSlot) || !availableVets.length;

    const username = userProfile?.username || '';
    const phoneNumber = userProfile?.phoneNumber || '';
    const email = userProfile?.email || '';

    useEffect(() => {
        dispatch(fetchUserProfile(userId));
        dispatch(getServices());
    }, [userId]);

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
    
        if (!selectedService || !selectedDate) {
            alert("Please Choose Service and Date");
            return;
        }
    
        const bookingData = {
            userID: Number.parseInt(userId),
            serviceID: selectedService,
            date: selectedDate,
            scheduleID: selectedSlot ? selectedSlot : null,
            status: 'pending', 
        };
    
        try {
            if (selectedVet) {
                await dispatch(createBooking(bookingData));
            } else {
                await dispatch(createBookingWithRandomVet(bookingData));
            }
    
            // tạo payment với id service
            const paymentResponse = await dispatch(initiatePayment(selectedService)).unwrap();
    
            if (paymentResponse?.url) {
                console.log("Redirecting to payment:", paymentResponse.url);
    
                // chuyển tới url vnpay
                setTimeout(() => {
                    window.location.href = paymentResponse.url;
                }, 2000);
            } else {
                console.error('Cannot initiate payment'); 
            }
        } catch (error) {
            console.error(error.message || 'An error occurred. Please try again.'); 
        }
    };
    
    


    return (
        <Container className='py-5'>
            <h2 className="text-center my-4" style={{ color: "#A52A2A", fontWeight: "900", textTransform: "capitalize" }}>
                Booking Appointment
            </h2>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3" style={{ color: "black", fontWeight: "600" }}>
                    <Col>
                        <Form.Group controlId="username">
                            <Form.Label>Full Name</Form.Label>
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

                <Form.Group controlId="service" className="mb-3" style={{ color: "black", fontWeight: "600" }}>
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

                <Form.Group controlId="date" className="mb-3" style={{ color: "black", fontWeight: "600" }}>
                    <Form.Label>Appointment Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Form.Group>

                {availableVets.length > 0 ? (
                    <>
                        <Form.Group controlId="vet" className="mb-3" style={{ color: "black", fontWeight: "600" }}>
                            <Form.Label>Veterinarian</Form.Label>
                            <Form.Control as="select" value={selectedVet || ''} onChange={handleVetChange}>
                                <option value="">Choose Veterinarian</option>
                                {availableVets.map((vet) => (
                                    <option key={vet.vetID} value={vet.vetID}>
                                        {vet.name} - {vet.specialization}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {selectedVet && selectedVetSlots.length > 0 && (
                            <Form.Group controlId="vetSlot" className="mb-3" style={{ color: "black", fontWeight: "600" }}>
                                <Form.Label>Slot</Form.Label>
                                <Form.Control as="select" value={selectedSlot || ''} onChange={handleSlotChange}>
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
                    selectedDate && <Alert variant="info">No available vets for this date.</Alert>
                )}

                <Button variant="danger" type="submit" disabled={isSubmitDisabled}>
                    Book
                </Button>
            </Form>
        </Container>
    );
};

export default Booking;
