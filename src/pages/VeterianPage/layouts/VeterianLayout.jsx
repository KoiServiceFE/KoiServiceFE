import VeterianSideBar from "../components/VeterianSideBar/VeterianSideBar";
import "../../AdminPage/layouts/AdminLayout"

const VeterianLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <VeterianSideBar />
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default VeterianLayout;
