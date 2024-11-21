import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {Container,Card,Row,Col,Button,Table,Modal,} from "react-bootstrap";
import { fetchKoiById } from "../../../../services/koiService";
import { fetchBookingsByScheduleId } from "../../../../services/bookingService";
import { fetchVetScheduleById } from "../../../../services/vetScheduleService";
import CreatePrescription from "../PrescriptionPage/PrescriptionForm";

const KoiDetails = () => {
  const [searchParams] = useSearchParams();
  const scheduleID = searchParams.get("scheduleID");
  const [schedule, setSchedule] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [showKoiModal, setShowKoiModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [initialBookingData, setInitialBookingData] = useState(null);

  const loadSchedule = async () => {
    try {
      const data = await fetchVetScheduleById(scheduleID);
      setSchedule(data);
    } catch (error) {
      console.error("Error fetching schedule details:", error);
    }
  };

  const loadBookings = async () => {
    try {
      const bookingData = await fetchBookingsByScheduleId(scheduleID);
      setBookings(bookingData);
      setInitialBookingData(bookingData[0]); // Set initial booking data
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const loadKoiDetails = async (koiID) => {
    try {
      const koiData = await fetchKoiById(koiID);
      setSelectedKoi(koiData);
      setShowKoiModal(true); // Open the koi details modal
    } catch (error) {
      console.error("Error fetching koi details:", error);
    }
  };

  const handleCloseKoiModal = () => setShowKoiModal(false);
  const handleShowPrescriptionModal = () => setShowPrescriptionModal(true);
  const handleClosePrescriptionModal = () => setShowPrescriptionModal(false);

  useEffect(() => {
    loadSchedule();
    loadBookings();
  }, [scheduleID]);

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
              <p>
                <strong>Schedule Date:</strong> {schedule.scheduleDate}
              </p>
              <p>
                <strong>Start Time:</strong> {schedule.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {schedule.endTime}
              </p>
              <p>
                <strong>Type:</strong> {schedule.type}
              </p>
            </Col>
          </Row>
          <Card.Title className="mt-4">Bookings</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Koi ID</th>
                <th>Status</th>
                <th>Vet Name</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.bookingID}>
                    <td>{booking.bookingID}</td>
                    <td>{booking.koiID}</td>
                    <td>{booking.status}</td>
                    <td>{booking.vetName}</td>
                    <td>{booking.userName}</td>
                    <td>{booking.date}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => loadKoiDetails(booking.koiID)}
                      >
                        View Koi
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No bookings available</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Button variant="primary" onClick={handleShowPrescriptionModal}>
            Create Prescription 2
          </Button>
          <Link to="/veterian/doctor-schedule">
            <Button variant="outline-secondary" className="ml-2">Back</Button>
          </Link>
        </Card.Body>
      </Card>

      {/* Modal for Koi Details */}
      <Modal show={showKoiModal} onHide={handleCloseKoiModal}>
        <Modal.Header closeButton>
          <Modal.Title>Koi Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedKoi ? (
            <>
              <p>
                <strong>Name:</strong> {selectedKoi.name}
              </p>
              <p>
                <strong>Species:</strong> {selectedKoi.species}
              </p>
              <p>
                <strong>Color:</strong> {selectedKoi.color}
              </p>
              <p>
                <strong>Weight:</strong> {selectedKoi.weight} kg
              </p>
            </>
          ) : (
            <p>Loading koi details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseKoiModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Creating Prescription */}
      <Modal show={showPrescriptionModal} onHide={handleClosePrescriptionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePrescription initialBooking={initialBookingData} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default KoiDetails;
