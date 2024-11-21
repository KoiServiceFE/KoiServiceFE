/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {Form,Button,Container,Row,Col,Alert,Spinner,Card,} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { GetUserById, UpdateUser } from "../../../../services/userService";
import { toast } from "react-toastify";

export default function UserAdminProfile() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { userData } = await GetUserById(userId);
        setProfileData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await UpdateUser({ id: userId, ...profileData });
      toast.success("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <h3 className="text-center mb-4">Your Profile</h3>

          <Card className="shadow-sm">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
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
                        className="bg-light"
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
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
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

                <div className="text-center">
                  <Button
                    variant="primary"
                    className="px-4"
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
