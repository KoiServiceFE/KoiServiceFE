import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { fetchKoiById } from "../services/koiService";
import {
  fetchPresByBookingId,
  fetchFeedbackById,
} from "../services/bookingService";
import { FaStar } from "react-icons/fa";

const BookingDetailsModal = ({ show, onHide, bookingData }) => {
  const [koiDetails, setKoiDetails] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isLoadingKoi, setIsLoadingKoi] = useState(false);
  const [isLoadingPrescriptions, setIsLoadingPrescriptions] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  console.log(bookingData);
  useEffect(() => {
    if (bookingData && show) {
      loadKoiDetails(bookingData.koiID);
      loadPrescriptions(bookingData.bookingID);
      loadFeedback(bookingData.feedbackID);
    }
  }, [bookingData, show]);

  const loadKoiDetails = async (koiID) => {
    try {
      setIsLoadingKoi(true);
      const data = await fetchKoiById(koiID);
      setKoiDetails(data);
    } catch (error) {
      console.error("Error fetching koi details:", error);
      setKoiDetails(null);
    } finally {
      setIsLoadingKoi(false);
    }
  };

  const loadPrescriptions = async (bookingID) => {
    try {
      setIsLoadingPrescriptions(true);
      const data = await fetchPresByBookingId(bookingID);
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]);
    } finally {
      setIsLoadingPrescriptions(false);
    }
  };

  const loadFeedback = async (feedbackID) => {
    try {
      setIsLoadingFeedback(true);
      const data = await fetchFeedbackById(feedbackID);
      setFeedback(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback(null);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Koi Details */}
        <div>
          <h5>Koi Information</h5>
          {isLoadingKoi ? (
            <p>Loading koi details...</p>
          ) : koiDetails ? (
            <>
              <p>
                <strong>Name:</strong> {koiDetails.name}
              </p>
              <p>
                <strong>Species:</strong> {koiDetails.species}
              </p>
              <p>
                <strong>Color:</strong> {koiDetails.color}
              </p>
              <p>
                <strong>Weight:</strong> {koiDetails.weight} kg
              </p>
            </>
          ) : (
            <p>No koi details available.</p>
          )}
        </div>

        {/* Prescriptions */}
        <div className="my-4">
          <h5>Prescription Information</h5>
          {isLoadingPrescriptions ? (
            <p>Loading prescriptions...</p>
          ) : prescriptions.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medication</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prescription.medication}</td>
                    <td>{prescription.instruction}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No prescriptions available for this booking.</p>
          )}
        </div>

        {/* Feedback */}
        <div className="">
          <h5>Feedback</h5>
          {isLoadingFeedback ? (
            <p>Loading feedback...</p>
          ) : feedback ? (
            <>
              <p>
                <strong>Rating:</strong> 
                
                {/* {feedback.rating}/5 */}
                {[...Array(feedback.rating)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    style={{ color: "#efef0e", marginLeft: "2px" }}
                  />
                ))}
              </p>

              <p>
                <strong>Comment:</strong> {feedback.comment}
              </p>
            </>
          ) : (
            <p>No feedback available for this booking.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingDetailsModal;
