/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import {
  fetchAllServices,
  deleteService,
} from "../../../../services/serviceService";
import { toast } from "react-toastify";

export default function ListAllServiceTable() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load services when component mounts
  const loadServices = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const serviceList = await fetchAllServices();
      setServices(serviceList);
    } catch (error) {
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices(); // Initial load of services
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmDelete) {
      try {
        await deleteService(id);
        toast.success("Deleted service successfully");
        // Reload services after deleting the service
        loadServices();
      } catch (error) {
        setError("Failed to delete service");
      }
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <Link to="/admin/service-management/form">
        <Button variant="primary" className="my-2">
          Add service
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Base Price</th>
            <th>Service Type</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.serviceID}>
                <td>{service.serviceID}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.basePrice}</td>
                <td>{service.serviceType}</td>
                <td>{service.duration}</td>
                <td>
                  <Link
                    to={`/admin/service-management/form?serviceId=${service.serviceID}`}
                  >
                    <Button variant="primary" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(service.serviceID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No services available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
