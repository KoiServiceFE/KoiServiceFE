import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createPrescription } from "../../../../services/veterianService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CreatePrescription = () => {
  const { userId } = useSelector((state) => state.auth);
  const [veterians, setVeterians] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState({
    prescriptionID: userId,
    veterian: {},
    record: {},
    medication: "",
    instruction: "",
  });

 
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription(prescriptionData);
      alert("Prescription created successfully!");
      navigate("/admin/prescriptions"); // Redirect to prescriptions list after success
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Create New Prescription</h3>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group controlId="formVeterian">
          <Form.Label>Veterian ID</Form.Label>
          <Form.Control
            type="text"
            name="veterian"
            value={prescriptionData.veterian.vetID || ""}
            onChange={handleChange}
            placeholder="Enter Veterian ID"
          />
        </Form.Group> */}

        <Form.Group controlId="formRecord">
          <Form.Label>Record ID</Form.Label>
          <Form.Control
            type="text"
            name="record"
            value={prescriptionData.record.recordID || ""}
            onChange={handleChange}
            placeholder="Enter Record ID"
          />
        </Form.Group>

        <Form.Group controlId="formMedication">
          <Form.Label>Medication</Form.Label>
          <Form.Control
            type="text"
            name="medication"
            value={prescriptionData.medication}
            onChange={handleChange}
            placeholder="Enter Medication"
          />
        </Form.Group>

        <Form.Group controlId="formInstruction">
          <Form.Label>Instruction</Form.Label>
          <Form.Control
            type="text"
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