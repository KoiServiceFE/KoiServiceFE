import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Contact from "../pages/ContactPage/Contact";
import Service from "../pages/ServicePage/Service";
import Login from "../pages/LoginPage/Login";
import UserProfile from "../pages/UserProfilePage/UserProfile";
import Booking from "../pages/BookingPage/Booking";
import About from "../pages/AboutPage/About";
import PaymentResult from "../pages/BookingPage/PaymentResult";

const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Service" element={<Service />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/User/:id" element={<UserProfile />} />
      <Route path="/Booking" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/paymentresult" element={<PaymentResult />} />
    </Routes>
);

export default routes;
