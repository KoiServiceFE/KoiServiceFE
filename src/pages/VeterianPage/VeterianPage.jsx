import { Outlet } from "react-router-dom";
import VeterianLayout from "./layouts/VeterianLayout";
export default function VeterianPage() {
  return (
    <VeterianLayout>
      <Outlet />
    </VeterianLayout>
  );
}
