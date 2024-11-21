import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import {
  fetchVetScheduleById,
  createVetSchedule,
  updateVetSchedule,
} from "../../../../services/vetScheduleService";
import { useSearchParams } from "react-router-dom";
import { getAllVeterians } from "../../../../services/veterianService";
import { toast } from "react-toastify";

const ScheduleForm = () => {
  let isEdit = false;
  const [searchParams] = useSearchParams();
  const scheduleID = searchParams.get("scheduleID");
  if (scheduleID != null) {
    isEdit = true;
  }
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState({
    scheduleDate: "",
    startTime: "",
    endTime: "",
    type: "",
    availability: true,
    vetID: "",
    veterian: {},
  });
  const [veterians, setVeterians] = useState([]);

  // Fetch veterians and vet schedules
  useEffect(() => {
    if (isEdit) {
      fetchVetScheduleById(scheduleID)
        .then((data) => setSchedule(data))
        .catch((error) => console.error("Error fetching schedule:", error));
    }
    getAllVeterians()
      .then((vetData) => setVeterians(vetData))
      .catch((error) => console.error("Error fetching schedule:", error));
  }, [scheduleID, isEdit]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the veterian select changes, update the full veterian object by finding the selected one
    if (name === "veterian") {
      const selectedVet = veterians.find(
        (vet) => vet.vetID === parseInt(value)
      );
      setSchedule({
        ...schedule,
        veterian: selectedVet,
        vetID: parseInt(value),
      });
    } else {
      setSchedule({ ...schedule, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateVetSchedule(scheduleID, schedule);
        toast.success("Schedule updated successfully!");
      } else {
        await createVetSchedule(schedule);
        toast.success("Schedule created successfully!");
      }
      navigate("/admin/doctor-schedule");
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };
  console.log(schedule);

  return (
    <Container className="mt-4">
      <h3>{isEdit ? "Edit Schedule" : "Add New Schedule"}</h3>
      <Form onSubmit={handleSubmit}>
        {/* Schedule Date */}
        <Form.Group controlId="formScheduleDate">
          <Form.Label>Schedule Date</Form.Label>
          <Form.Control
            type="date"
            name="scheduleDate"
            value={schedule.scheduleDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Start Time */}
        <Form.Group controlId="formStartTime" className="mt-2">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            name="startTime"
            value={schedule.startTime}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* End Time */}
        <Form.Group controlId="formEndTime" className="mt-2">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            name="endTime"
            value={schedule.endTime}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Type */}
        <Form.Group controlId="formType" className="mt-2">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={schedule.type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Availability */}
        <Form.Group controlId="formAvailability" className="mt-2">
          <Form.Check
            type="checkbox"
            name="availability"
            label="Available"
            checked={schedule.availability}
            onChange={(e) =>
              setSchedule({ ...schedule, availability: e.target.checked })
            }
          />
        </Form.Group>
        {/* Veterian Dropdown */}
        <Form.Group controlId="formVeterian" className="mt-2">
          <Form.Label>Veterian</Form.Label>
          <Form.Control
            as="select"
            name="veterian"
            value={schedule.veterian.vetID || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Veterian</option>
            {veterians.map((vet) => (
              <option key={vet.vetID} value={vet.vetID}>
                {vet.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {/* Buttons */}
        <Link to="/admin/doctor-schedule">
          <Button variant="outline-secondary" type="button" className="mt-3">
            Cancel
          </Button>
        </Link>{" "}
        <Button variant="primary" type="submit" className="ml-3 mt-3">
          {isEdit ? "Update Schedule" : "Create Schedule"}
        </Button>
      </Form>
    </Container>
  );
};

export default ScheduleForm;