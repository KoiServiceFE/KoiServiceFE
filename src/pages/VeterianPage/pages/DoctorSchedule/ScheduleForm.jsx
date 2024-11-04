import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { fetchVetScheduleById } from "../../../../services/vetScheduleService";
import { useSearchParams } from "react-router-dom";
import { getAllVeterians } from "../../../../services/veterianService";

const VetScheduleView = () => {
  const [searchParams] = useSearchParams();
  const scheduleID = searchParams.get("scheduleID");

  const [schedule, setSchedule] = useState(null);
  const [veterians, setVeterians] = useState([]);

  // Fetch vet schedule and veterians
  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const data = await fetchVetScheduleById(scheduleID);
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    const loadVeterians = async () => {
      try {
        const vetData = await getAllVeterians();
        setVeterians(vetData);
      } catch (error) {
        console.error("Error fetching veterians:", error);
      }
    };

    loadSchedule();
    loadVeterians();
  }, [scheduleID]);

  if (!schedule) {
    return <p>Loading schedule...</p>;
  }

  // Find the veterinarian name based on the vetID
  const vetName =
    veterians.find((vet) => vet.vetID === schedule.veterian.vetID)?.name ||
    "Unknown";

  return (
    <Container className="mt-4">
      <h3>Schedule Details</h3>
      <div>
        <strong>Schedule Date:</strong> {schedule.scheduleDate}
      </div>
      <div>
        <strong>Start Time:</strong> {schedule.startTime}
      </div>
      <div>
        <strong>End Time:</strong> {schedule.endTime}
      </div>
      <div>
        <strong>Type:</strong> {schedule.type}
      </div>
      <div>
        <strong>Availability:</strong>{" "}
        {schedule.availability ? "Available" : "Unavailable"}
      </div>
      <div>
        <strong>Veterinarian:</strong> {vetName}
      </div>

      {/* Button to go back to schedule list */}
      <Link to="/admin/doctor-schedule">
        <Button variant="outline-secondary" className="mt-3">
          Back to Schedule List
        </Button>
      </Link>
    </Container>
  );
};

export default VetScheduleView;
