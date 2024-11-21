import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  fetchAllBookings,
  updateBookingStatus,
} from "../../../../services/bookingService";
import StatusBadge from "../../../../components/StatusBadge";
import BookingStatus from "../../../../common/constant/BookingStatus";
import BookingDetailsModal from "../../../../components/BookingDetailsModel";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Fetch all bookings when component mounts
  const loadBookings = async () => {
    try {
      const response = await fetchAllBookings();
      setBookings(response); // Assuming the API response is an array of bookings
      setLoading(false);
    } catch (err) {
      setError("Failed to load bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCloseBookingDetailsModal = () => {
    setSelectedBooking(null);
    setShowBookingDetailsModal(false);
  };

  const handleApproveBooking = async (bookingId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this booking?"
    );
    if (!confirmApprove) return;

    try {
      await updateBookingStatus(bookingId, BookingStatus.APPROVED);
      toast.success("Booking status updated to 'Approved'");
      loadBookings(); // Refresh the bookings list
    } catch (err) {
      console.error("Failed to update booking status", err);
      toast.error("Failed to update booking status");
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-2">
      <h2>All Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Veterinarian Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingID}>
              <td>{booking.bookingID}</td>
              <td>
                <StatusBadge status={booking.status} />
              </td>
              <td>{booking.userID}</td>
              <td>{booking.userName}</td>
              <td>{booking.vetName}</td>
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
                {booking.status == BookingStatus.PENDING ? (
                  <Button
                    variant="success"
                    onClick={() => handleApproveBooking(booking.bookingID)}
                  >
                    Approve
                  </Button>
                ) : (
                  <span className="text-muted"></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <BookingDetailsModal
        show={showBookingDetailsModal}
        onHide={handleCloseBookingDetailsModal}
        bookingData={selectedBooking}
      />
    </div>
  );
}
