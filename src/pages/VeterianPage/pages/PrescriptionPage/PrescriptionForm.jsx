import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createPrescription } from "../../../../services/veterianService";
import { updateBookingStatus } from "../../../../services/bookingService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BookingStatus from "../../../../common/constant/BookingStatus";

const CreatePrescription = ({ initialBooking }) => {
 
  console.log(initialBooking);
  const [prescriptionData, setPrescriptionData] = useState({
    vetID: initialBooking.vetID,
    bookingID: initialBooking.bookingID,
    recordID: 2,
    medication: "",
    instruction: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWaitingPayBooking = async (bookingId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to add a prescription and update the status for this booking?"
    );
    if (!confirmApprove) return false;
  
    try {
      // Update booking status to 'WAITINGPAYMENT'
      await updateBookingStatus(bookingId, BookingStatus.WAITINGPAYMENT); 

      return true; 
    } catch (err) {
      console.error("Failed to update booking status", err);

      return false; 
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Update booking status first
    const statusUpdated = await handleWaitingPayBooking(initialBooking.bookingID);
    if (!statusUpdated) return; // Stop execution if status update failed
  
    try {
      // Create prescription
      await createPrescription(prescriptionData);
      toast.success("Prescription created successfully!");
      navigate("/veterian/doctor-schedule");
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Error creating prescription. Please try again.");
    }
  };
  

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMedication">
          <Form.Label style={{ color: "black", fontWeight: "600" }}>Medication</Form.Label>
          <Form.Control
            type="text"
            name="medication"
            value={prescriptionData.medication}
            onChange={handleChange}
            placeholder="Enter Medication"
          />
        </Form.Group>

        <Form.Group controlId="formInstruction" className="mt-4">
          <Form.Label style={{ color: "black", fontWeight: "600" }}>Instruction</Form.Label>
          <Form.Control
            as="textarea"
            name="instruction"
            value={prescriptionData.instruction}
            onChange={handleChange}
            placeholder="Enter Instructions"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Prescription
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePrescription;
