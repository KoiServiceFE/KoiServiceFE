/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getServices, selectService } from "../../stores/slices/serviceSlice";
import { fetchUserProfile } from "../../stores/slices/authSlice";
import { fetchVets, selectVet } from "../../stores/slices/vetSlice";
import {
  createBooking,
  createBookingWithRandomVet,
} from "../../stores/slices/bookingSlice";
import { initiatePayment } from "../../stores/slices/paymentSlice";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
import { createBookingService } from "../../services/bookingService";
import { createKoi } from "../../services/koiService";
import BookingStatus from "../../common/constant/BookingStatus";
import { useNavigate } from "react-router-dom";


const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, selectedService } = useSelector((state) => state.services);
  const { userProfile, userId } = useSelector((state) => state.auth);
  const { availableVets, selectedVetSlots } = useSelector(
    (state) => state.vets
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedVet, setSelectedVet] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");


  const [newKoiDetails, setNewKoiDetails] = useState({
    name: "",
    species: "",
    color: "",
    weight: "",
  });

  const isSubmitDisabled =
    !selectedService ||
    !selectedDate ||
    (selectedVet && !selectedSlot) ||
    !availableVets.length;

  const username = userProfile?.username || "";
  const phoneNumber = userProfile?.phoneNumber || "";
  const email = userProfile?.email || "";

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
    dispatch(getServices());
  }, [userId]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedVet("");
    setSelectedSlot("");
    dispatch(fetchVets(date));
  };

  const handleVetChange = (e) => {
    const vetID = e.target.value;
    setSelectedVet(vetID);
    setSelectedSlot("");
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
  
    // Validate form fields
    if (!selectedService || !selectedDate) {
      toast.error("Please select a service and date.");
      return;
    }
    if (!newKoiDetails.name || !newKoiDetails.species || !newKoiDetails.color || !newKoiDetails.weight) {
      toast.error("Please fill out all Koi details.");
      return;
    }
    if (selectedVet && !selectedSlot) {
      toast.error("Please select a time slot for the chosen vet.");
      return;
    }
  
    try {
      // Create Koi
      const newKoi = await createKoi(newKoiDetails);
      const koiID = newKoi?.koiId;
  
      if (!koiID) {
        toast.error("Failed to create Koi. Please try again.");
        return;
      }
  
      // Prepare booking data
      const bookingData = {
        userID: Number.parseInt(userId),
        serviceID: Number.parseInt(selectedService),
        date: selectedDate,
        scheduleID: selectedSlot ? Number.parseInt(selectedSlot) : null,
        status: BookingStatus.PENDING,
        koiID
      };
  
      // Submit the booking
      let bookingSuccess = false;
  
      if (selectedVet) {
        await createBookingService(bookingData);
        bookingSuccess = true;
      } else {
        await dispatch(createBookingWithRandomVet(bookingData));
        bookingSuccess = true;
      }
  
      if (bookingSuccess) {
        toast.success("Booking created successfully!");
        // Reset form state
        setSelectedDate("");
        setSelectedVet("");
        setSelectedSlot("");
        setNewKoiDetails({ name: "", species: "", color: "", weight: "" });
        navigate(`/User/${userId}`);

      }
    } catch (error) {
      console.error("Error during booking submission:", error);
      toast.error("An error occurred while creating the booking. Please try again.");
    }
  };
  

  return (
    <Container className="py-5">
      <h2
        className="text-center my-4"
        style={{
          color: "#A52A2A",
          fontWeight: "900",
          textTransform: "capitalize",
        }}
      >
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

        <Form.Group
          controlId="service"
          className="mb-3"
       
        >
          <Form.Label className=""
            style={{ color: "black", fontWeight: "600" }}
          >Koi information</Form.Label>
          <form>
            <div className="mb-3">
              <label htmlFor="koiName">Name</label>
              <input
                type="text"
                id="koiName"
                className="form-control"
                value={newKoiDetails.name}
                onChange={(e) =>
                  setNewKoiDetails({ ...newKoiDetails, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="koiSpecies">Species</label>
              <input
                type="text"
                id="koiSpecies"
                className="form-control"
                value={newKoiDetails.species}
                onChange={(e) =>
                  setNewKoiDetails({
                    ...newKoiDetails,
                    species: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="koiColor">Color</label>
              <input
                type="text"
                id="koiColor"
                className="form-control"
                value={newKoiDetails.color}
                onChange={(e) =>
                  setNewKoiDetails({ ...newKoiDetails, color: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="koiWeight">Weight (kg)</label>
              <input
                type="number"
                id="koiWeight"
                className="form-control"
                value={newKoiDetails.weight}
                onChange={(e) =>
                  setNewKoiDetails({ ...newKoiDetails, weight: e.target.value })
                }
              />
            </div>
          </form>
        </Form.Group>

        <Form.Group
          controlId="service"
          className="mb-3"
          style={{ color: "black", fontWeight: "600" }}
        >
          <Form.Label>Service</Form.Label>
          <Form.Control
            as="select"
            value={selectedService || ""}
            onChange={handleServiceChange}
          >
            <option value="">Choose Service</option>
            {services.map((service) => (
              <option key={service.serviceID} value={service.serviceID}>
                {service.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group
          controlId="date"
          className="mb-3"
          style={{ color: "black", fontWeight: "600" }}
        >
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Form.Group>

        {availableVets.length > 0 ? (
          <>
            <Form.Group
              controlId="vet"
              className="mb-3"
              style={{ color: "black", fontWeight: "600" }}
            >
              <Form.Label>Veterinarian</Form.Label>
              <Form.Control
                as="select"
                value={selectedVet || ""}
                onChange={handleVetChange}
              >
                <option value="">Choose Veterinarian</option>
                {availableVets.map((vet) => (
                  <option key={vet.vetID} value={vet.vetID}>
                    {vet.name} - {vet.specialization}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedVet && selectedVetSlots.length > 0 && (
              <Form.Group
                controlId="vetSlot"
                className="mb-3"
                style={{ color: "black", fontWeight: "600" }}
              >
                <Form.Label>Slot</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedSlot || ""}
                  onChange={handleSlotChange}
                >
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
          selectedDate && (
            <Alert variant="info">No available vets for this date.</Alert>
          )
        )}

        <Button variant="danger" type="submit" disabled={isSubmitDisabled}>
          Book
        </Button>
      </Form>
    </Container>
  );
};

export default Booking;
