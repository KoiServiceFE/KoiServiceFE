import AdminSideBar from "../components/AdminSideBar/AdminSideBar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSideBar />
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default AdminLayout;
