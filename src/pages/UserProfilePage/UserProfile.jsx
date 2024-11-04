import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../stores/slices/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { userId, userProfile, isLoading, error } = useSelector(
    (state) => state.auth
  );
  const [profileData, setProfileData] = useState({
    username: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch, userId]);

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
    console.log("Updating profile with data:", profileData); // Log profileData before dispatch

    dispatch(updateUserProfile({ id: userId, ...profileData }))
      .unwrap()
      .then(() => {
        setSuccessMessage("Cập nhật thành công!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.error("Cập nhật không thành công:", err);
      });
  };

  return (
    <Container className="py-5">
      <h3 className="mb-4">Your Profile</h3>

      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {!isLoading && !userProfile && (
        <Alert variant="warning">This user does not exist</Alert>
      )}

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

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
    </Container>
  );
}
