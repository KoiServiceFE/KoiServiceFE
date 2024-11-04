import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Button onClick={() => navigate("/")} variant="primary">
        Go to Home
      </Button>
    </Container>
  );
};

export default UnauthorizedPage;
