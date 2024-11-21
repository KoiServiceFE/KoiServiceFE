import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Form,Button,Container,Row,Col,Alert,Spinner,Table,Modal,} from "react-bootstrap";
import {fetchUserProfile,updateUserProfile,} from "../../stores/slices/authSlice";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import StatusBadge from "../../components/StatusBadge";
import { initiatePayment } from "../../stores/slices/paymentSlice";
import BookingStatus from "../../common/constant/BookingStatus";
import {fetchBookingsByUserId,fetchPresByBookingId,createFeedback,updateBookingFeedback,} from "../../services/bookingService";
import BookingDetailsModal from "../../components/BookingDetailsModel";

export default function UserProfile() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedBookingID, setSelectedBookingID] = useState(null);
  const [profileData, setProfileData] = useState({
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [bookings, setBookings] = useState([]);
  const [newFeedbackDetails, setFeedbackDetails] = useState({
    rating: "",
    comment: "",
  });

  const dispatch = useDispatch();
  const { userId, userProfile, isLoading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
      fetchBookingHistory(userId);
    }
  }, [dispatch, userId]);

  const handleCloseBookingDetailsModal = () => {
    setSelectedBooking(null);
    setShowBookingDetailsModal(false);
  };



  const fetchBookingHistory = async (userId) => {
    try {
      const bookingsData = await fetchBookingsByUserId(userId);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load booking history.");
    }
  };

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        username: userProfile.username,
        address: userProfile.address,
        phoneNumber: userProfile.phoneNumber,
        email: userProfile.email,
      });
    }
  }, [userProfile]);

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleUpdate = () => {
    dispatch(updateUserProfile({ id: userId, ...profileData }))
      .unwrap()
      .then(() => {
        toast.success("Cập nhật thành công!");
      })
      .catch((err) => {
        toast.error("Cập nhật không thành công:", err);
      });
  };

  const handlePayment = async (serviceID, bookingID) => {
    const paymentResponse = await dispatch(
      initiatePayment({ serviceID, bookingID })
    ).unwrap();

    if (paymentResponse?.url) {
      console.log("Redirecting to payment:", paymentResponse.url);
      setTimeout(() => {
        window.location.href = paymentResponse.url;
      }, 2000);
    } else {
      console.error("Cannot initiate payment");
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!newFeedbackDetails.rating || !newFeedbackDetails.comment) {
      toast.error("Please provide both a rating and a comment.");
      return;
    }

    const feedbackData = {
      rating: newFeedbackDetails.rating,
      comment: newFeedbackDetails.comment,
      bookingID: selectedBookingID,
      createdAt: Date.now(),
    };

    try {
      const feedback = await createFeedback(feedbackData);
      await updateBookingFeedback(selectedBookingID, feedback.feedbackID);
      
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingID === selectedBookingID
            ? { ...booking, feedbackID: feedback.feedbackID }
            : booking
        )
      );
     
      toast.success("Feedback Submitted ");
      setFeedbackDetails({ rating: "", comment: "" });
      setShowFeedbackModal(false);
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Container className="py-5">
      <h3 className="mb-4">Your Profile</h3>

      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {!isLoading && !userProfile && (
        <Alert variant="warning">This user does not exist</Alert>
      )}

      {userProfile && (
        <Form>
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Group controlId="username">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  value={profileData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={profileData.email}
                  readOnly
                  plaintext
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" onClick={handleUpdate}>
            Save Information
          </Button>
        </Form>
      )}

<div className="mt-5">
        <h3 className="mb-4">Your Booking history</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Status</th>
              <th>Vet Name</th>
              <th>Service </th>
              <th>Date</th>
              <th>Time</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.bookingID}>
                  <td>{booking.bookingID}</td>
                  <td>
                    <StatusBadge status={booking.status} />
                  </td>
                  <td>{booking.vetName}</td>
                  <td>{booking.serviceName}</td>
                  <td>{booking.date}</td>
                  <td>
                    {booking.startTime} - {booking.endTime}
                  </td>

                  {/* Prescription data */}
                  <td>

                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedBooking(booking)
                        setShowBookingDetailsModal(true);
                      }}

                    >
                      View
                    </Button>

                  </td>

                  <td>
                    {booking.status == BookingStatus.COMPLETED ? (
                      <Button
                        variant="info"
                        disabled={booking.feedbackID != null}
                        onClick={() => {
                          setShowFeedbackModal(true);
                          setSelectedBookingID(booking.bookingID);
                        }}
                      >
                        Feedback
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        disabled={
                          booking.status != BookingStatus.WAITINGPAYMENT
                        }
                        onClick={() =>
                          handlePayment(booking.serviceID, booking.bookingID)
                        }
                      >
                        Pay now
                      </Button>
                    )}
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
      </div>



      <BookingDetailsModal
       show={showBookingDetailsModal}
       onHide={handleCloseBookingDetailsModal}
       bookingData={selectedBooking}
      />


      {/* Feedback Modal */}
      <Modal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="koiName">Rating</label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setFeedbackDetails({
                    ...newFeedbackDetails,
                    rating: e.target.value,
                  })
                }
              >
                <option>Open this select menu</option>
                <option value="1">
                  1 <FaStar />
                </option>
                <option value="2">
                  2 <FaStar />
                </option>
                <option value="3">
                  3 <FaStar />
                </option>
                <option value="4">
                  4 <FaStar />
                </option>
                <option value="5">
                  5 <FaStar />
                </option>
              </Form.Select>
            </div>
            <div className="mb-3">
              <label htmlFor="koiSpecies">Comment</label>
              <textarea
                type="text"
                id="koiSpecies"
                className="form-control"
                value={newFeedbackDetails.comment}
                onChange={(e) =>
                  setFeedbackDetails({
                    ...newFeedbackDetails,
                    comment: e.target.value,
                  })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowFeedbackModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
