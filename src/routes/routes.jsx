import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/ContactPage/Contact";
import Service from "../pages/ServicePage/Service";
import Login from "../pages/LoginPage/Login";
import UserProfile from "../pages/UserProfilePage/UserProfile";
import Booking from "../pages/BookingPage/Booking";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import About from "../pages/AboutPage/About";
import UnauthorizedPage from "../pages/UnauthorizedPage/UnauthorizedPage";
import ProtectedRoute from "./protectedRoutes";
import UserRole from "../common/constant/UserRole";
import DoctorSchedule from "../pages/AdminPage/pages/DoctorSchedule";
import CustomerManagement from "../pages/AdminPage/pages/CustomerManagement";
import ServiceManagement from "../pages/AdminPage/pages/ServiceManagement";
import AdminReport from "../pages/AdminPage/pages/AdminReport/AdminReport";
import ScheduleForm from "../pages/AdminPage/pages/DoctorSchedule/ScheduleForm";
import ListAllDoctorSchedule from "../pages/AdminPage/pages/DoctorSchedule/ListAllDoctorSchedule";
import ListAllServiceTable from "../pages/AdminPage/pages/ServiceManagement/ListAllServiceTable";
import ServiceForm from "../pages/AdminPage/pages/ServiceManagement/ServiceForm";
import CustomerDetails from "../pages/AdminPage/pages/CustomerManagement/CustomerDetails";
import ListAllCustomerTable from "../pages/AdminPage/pages/CustomerManagement/ListAllCustomerTable";
import VeterianPage from "../pages/VeterianPage/VeterianPage";
import PrescriptionForm from "../pages/VeterianPage/pages/PrescriptionPage/PrescriptionForm";
import ListAllVetSchedule from "../pages/VeterianPage/pages/DoctorSchedule/ListAllDoctorSchedule";
import VetScheduleView from "../pages/VeterianPage/pages/DoctorSchedule/ScheduleForm";
import CreatePrescription from "../pages/VeterianPage/pages/PrescriptionPage/PrescriptionForm";
import KoiDetails from "../pages/VeterianPage/pages/DoctorSchedule/PatientDetails";
//import PaymentResult from "../pages/BookingPage/PaymentResult";
const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/user/:id" element={<UserProfile />} />
    {/* <Route path="/paymentresult" element={<PaymentResult />} /> */}
    {/* Protected Routes based on role */}

    <Route
      path="/Service"
      element={
        <ProtectedRoute requiredRoleId={UserRole.USER}>
          <Service />
        </ProtectedRoute>
      }
    />

    <Route
      path="/booking"
      element={
        <ProtectedRoute requiredRoleId={UserRole.USER}>
          <Booking />
        </ProtectedRoute>
      }
    />

    <Route
      path="/veterian"
      element={
        <ProtectedRoute requiredRoleId={UserRole.DOCTOR}>
          <VeterianPage />{" "}
        </ProtectedRoute>
      }
    >
      <Route path="doctor-schedule" element={<DoctorSchedule />}>
        <Route index element={<ListAllVetSchedule />} />
        <Route path="details" element={<VetScheduleView />} />
        <Route path="patient-details" element={<KoiDetails />} />
        <Route path="prescription" element={<PrescriptionForm />} />
      </Route>
    </Route>

    {/* Admin-only route */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute requiredRoleId={UserRole.ADMIN}>
          <AdminPage />
        </ProtectedRoute>
      }
    >
      <Route path="doctor-schedule" element={<DoctorSchedule />}>
        <Route index element={<ListAllDoctorSchedule />} />
        <Route path="form" element={<ScheduleForm />} />
      </Route>
      <Route path="customer-management" element={<CustomerManagement />}>
        <Route index element={<ListAllCustomerTable />} />
        <Route path="details" element={<CustomerDetails />} />
        <Route path="form" element={<CreatePrescription />} />
      </Route>
      <Route path="service-management" element={<ServiceManagement />}>
        <Route index element={<ListAllServiceTable />} />
        <Route path="form" element={<ServiceForm />} />
      </Route>

      <Route path="report" element={<AdminReport />} />
    </Route>

    {/* Unauthorized Page */}
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default routes;
