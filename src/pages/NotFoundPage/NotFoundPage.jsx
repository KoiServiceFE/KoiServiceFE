import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button onClick={() => navigate("/")} variant="primary">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
