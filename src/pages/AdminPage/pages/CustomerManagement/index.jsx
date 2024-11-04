
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const CustomerManagement = () => {
  return (
    <Container>
      <h2>Customer Management</h2>
      {/* This will render the nested routes like details and form */}
      <Outlet />
    </Container>
  );
};

export default CustomerManagement;
