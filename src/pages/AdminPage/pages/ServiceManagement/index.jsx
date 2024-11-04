// quản lí dịch vụ ( admin có thể thêm , xóa , sửa dịch vụ )
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const ServiceManagement = () => {
    return (
        <Container>
            <h2>Service Management</h2>
            {/* This will render the nested routes like details and form */}
            <Outlet />
        </Container>
    );
};

export default ServiceManagement;
