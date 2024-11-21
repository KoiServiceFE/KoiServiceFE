/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {fetchAllSchedules,deleteScheduleById,} from "../../../../services/vetScheduleService"; 


export default function ListAllVetSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId, email } = useSelector((state) => state.auth);

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



  if (loading) {
    return <p>Loading schedules...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  // Filter schedules to only include those for the current user
  const filteredSchedules = schedules
  .filter(
    (schedule) => schedule?.veterian?.email == email
  );

  return (
    <div className="container mt-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Schedule Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Type</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.length > 0 ? <>{filteredSchedules.map((schedule, index) => (
            <tr key={index}>
              <td>{schedule.scheduleID}</td>
           
              <td>{schedule.scheduleDate}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.type}</td>
              
              <td>
                <Link
                  to={`/veterian/doctor-schedule/patient-details?scheduleID=${schedule.scheduleID}`}
                >
                  <Button variant="primary" className="me-2">
                    Detail
                  </Button>
                </Link>
                
              </td>
            </tr>
          ))
          
          }</> : <><tr>No schedule data.</tr></>}
          
        </tbody>
      </Table>
    </div>
  );
}
