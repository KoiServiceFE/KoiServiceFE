import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const DoctorSchedule = () => {
  return (
    <Container>
      <h2>My Schedule</h2>
      {/* This will render the nested routes like details and form */}
      <Outlet />
    </Container>
  );
};

export default DoctorSchedule;
