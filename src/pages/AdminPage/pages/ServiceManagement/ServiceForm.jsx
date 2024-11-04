/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createService,
  updateService,
  fetchServiceById,
} from "../../../../services/serviceService"; // Import service functions
import { toast } from "react-toastify";

const ServiceForm = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const navigate = useNavigate();
  const isEditing = !!serviceId; // Determine if we're in edit mode

  // Initialize state for service fields
  const [service, setService] = useState({
    name: "",
    description: "",
    basePrice: "",
    serviceType: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(null); // To handle general errors
  const [validationErrors, setValidationErrors] = useState({}); // For field-specific errors

  // Load existing service data if editing
  useEffect(() => {
    if (isEditing) {
      const loadService = async () => {
        try {
          setLoading(true);
          const foundService = await fetchServiceById(serviceId);
          setService(foundService);
        } catch (err) {
          setError("Failed to load service data");
        } finally {
          setLoading(false);
        }
      };
      loadService();
    }
  }, [isEditing, serviceId]);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    if (!service.name.trim()) {
      errors.name = "Service name is required.";
    }
    if (!service.description.trim()) {
      errors.description = "Description is required.";
    }
    if (
      !service.basePrice ||
      isNaN(service.basePrice) ||
      Number(service.basePrice) <= 0
    ) {
      errors.basePrice = "Base Price must be a positive number.";
    }
    if (
      !service.duration ||
      isNaN(service.duration) ||
      Number(service.duration) <= 0
    ) {
      errors.duration = "Duration must be a positive number.";
    }
    if (!service.serviceType.trim()) {
      errors.serviceType = "Service type is required.";
    }
    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        if (isEditing) {
          // Update existing service
          await updateService(serviceId, service);
        } else {
          // Create a new service
          await createService(service);
        }
        toast.success("Service saved successfully!");
        navigate("/admin/service-management"); // Navigate back after saving
      } catch (err) {
        toast.error(err);
        setError("Failed to save service");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fix the validation errors.");
    }
  };

  return (
    <Container className="mt-4">
      <h3>{isEditing ? "Edit Service" : "Create Service"}</h3>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={service.name}
            onChange={handleChange}
            required
            disabled={loading}
            isInvalid={!!validationErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={service.description}
            onChange={handleChange}
            required
            disabled={loading}
            isInvalid={!!validationErrors.description}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.description}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Base Price</Form.Label>
          <Form.Control
            type="text"
            name="basePrice"
            value={service.basePrice}
            onChange={handleChange}
            required
            disabled={loading}
            isInvalid={!!validationErrors.basePrice}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.basePrice}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            name="serviceType"
            value={service.serviceType}
            onChange={handleChange}
            required
            disabled={loading}
            isInvalid={!!validationErrors.serviceType}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.serviceType}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="text"
            name="duration"
            value={service.duration}
            onChange={handleChange}
            required
            disabled={loading}
            isInvalid={!!validationErrors.duration}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.duration}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {isEditing ? "Update Service" : "Create Service"}
        </Button>
      </Form>
    </Container>
  );
};

export default ServiceForm;
