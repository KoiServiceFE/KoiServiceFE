import { useEffect, useState } from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa"; // For icons
import { useSearchParams } from "react-router-dom";
import { GetUserById } from "../../../../services/userService";
//import { fetchBookingsByUserId } from "../../../../services/bookingService ";
const CustomerDetails = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { userData } = await GetUserById(userId);
        //   const { bookingData } = await fetchBookingsByUserId(userId);
        setUserData(userData);
        //  setBookings(bookingData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // Mock data for service history
  const serviceHistory = [
    {
      id: 1,
      serviceName: "Pond Cleaning",
      date: "2024-10-01",
      status: "Completed",
      price: "$150.00",
    },
    {
      id: 2,
      serviceName: "Koi Health Check",
      date: "2024-09-15",
      status: "Completed",
      price: "$50.00",
    },
    {
      id: 3,
      serviceName: "Water Quality Testing",
      date: "2024-08-30",
      status: "Pending",
      price: "$40.00",
    },
  ];

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Customer Profile</h3>

      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          Customer Details
        </Card.Header>
        <Card.Body>
          <p>
            <strong>User ID:</strong> {userData.id}
          </p>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
        </Card.Body>
      </Card>

      {/* <h5 className="mb-3">Booking History</h5>
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Service ID</th>
            <th>Service Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceHistory.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.serviceName}</td>
              <td>{service.date}</td>
              <td>
                <span
                  className={`badge ${
                    service.status === "Completed" ? "bg-success" : "bg-warning"
                  }`}
                >
                  {service.status}
                </span>
              </td>
              <td>{service.price}</td>
              <td>
                <Button variant="info" className="me-2" title="View Details">
                  <FaInfoCircle />
                </Button>
                {service.status === "Pending" && (
                  <Button variant="danger" title="Cancel">
                    <FaTrashAlt />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
};

export default CustomerDetails;
