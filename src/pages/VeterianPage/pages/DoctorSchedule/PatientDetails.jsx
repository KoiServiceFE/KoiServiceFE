import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Table,
  Modal,
} from "react-bootstrap";

import { fetchBookingsByScheduleId } from "../../../../services/bookingService";
import { fetchVetScheduleById } from "../../../../services/vetScheduleService";
import CreatePrescription from "../PrescriptionPage/PrescriptionForm";
import StatusBadge from "../../../../components/StatusBadge";
import BookingDetailsModal from "../../../../components/BookingDetailsModel";
import BookingStatus from "../../../../common/constant/BookingStatus";

const KoiDetails = () => {
  const [searchParams] = useSearchParams();
  const scheduleID = searchParams.get("scheduleID");

  const [schedule, setSchedule] = useState(null);
  const [bookings, setBookings] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

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
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleShowPrescriptionModal = (booking) => {
    setSelectedBooking(booking);
    setShowPrescriptionModal(true);
  };

  const handleClosePrescriptionModal = () => {
    setSelectedBooking(null);
    setShowPrescriptionModal(false);
  };

  const handleCloseBookingDetailsModal = () => {
    setSelectedBooking(null);
    setShowBookingDetailsModal(false);
  };

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
                <th>Status</th>
                <th>Vet Name</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Actions</th>
                <th>Prescription</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings
                  .filter((booking) => booking.status !== BookingStatus.PENDING)
                  .map((booking) => (
                    <tr key={booking.bookingID}>
                      <td>{booking.bookingID}</td>
                      <td>
                        <StatusBadge status={booking.status} />
                      </td>
                      <td>{booking.vetName}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.date}</td>
                      <td>
                        <Button
                          className="me-2"
                          variant="info"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowBookingDetailsModal(true);
                          }}
                        >
                          Details
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          disabled={booking.status === BookingStatus.COMPLETED}
                          onClick={() => handleShowPrescriptionModal(booking)}
                        >
                          Create Prescription
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">No bookings available</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Link to="/veterian/doctor-schedule">
            <Button variant="outline-secondary" className="ml-2">
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>

      {/* Modal for Koi Details */}

      <BookingDetailsModal
        show={showBookingDetailsModal}
        onHide={handleCloseBookingDetailsModal}
        bookingData={selectedBooking}
      />

      {/* Modal for Creating Prescription */}
      <Modal show={showPrescriptionModal} onHide={handleClosePrescriptionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <CreatePrescription initialBooking={selectedBooking} />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default KoiDetails;
