import { Outlet } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
export default function AdminPage() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
