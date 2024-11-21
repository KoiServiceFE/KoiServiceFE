/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  fetchAllSchedules,
  deleteScheduleById,
} from "../../../../services/vetScheduleService"; // Import your service functions
import { toast } from "react-toastify";

export default function ListAllDoctorSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vet schedules when component mounts
  const loadSchedules = async () => {
    try {
      const response = await fetchAllSchedules();
      setSchedules(response); // Assuming the API response is an array of schedules
      setLoading(false);
    } catch (err) {
      setError("Failed to load schedules");
      setLoading(false);
    }
  };
  useEffect(() => {
    loadSchedules();
  }, []);

  // Handle delete schedule
  const handleDelete = async (scheduleId) => {
    try {
      await deleteScheduleById(scheduleId);
      setSchedules(schedules.filter((schedule) => schedule.id !== scheduleId));
      toast.info("Schedule deleted successfully");
      loadSchedules();
    } catch (err) {
      console.error("Failed to delete schedule", err);
      toast.error("Failed to delete schedule");
    }
  };

  if (loading) {
    return <p>Loading schedules...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-2">
      <Link to="/admin/doctor-schedule/form">
        <Button variant="primary" className="my-2">
          Add schedule
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> ID</th>
            {/* <th>Vet ID</th> */}
            <th>Vet name</th>
            <th>Schedule Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Type</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.scheduleID}</td>
              {/* <td>{schedule.veterian.vetID}</td> */}
              <td>{schedule.veterian.name}</td>
              <td>{schedule.scheduleDate}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.type}</td>
              <td>{schedule.availability ? "Available" : "Unavailable"}</td>
              <td>
                <Link
                  to={`/admin/doctor-schedule/form?scheduleID=${schedule.scheduleID}`}
                >
                  <Button variant="primary" className="me-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(schedule.scheduleID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}