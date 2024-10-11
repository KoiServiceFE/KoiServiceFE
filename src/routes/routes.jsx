import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import About from "../pages/AboutPage/About";
import Contact from "../pages/ContactPage/Contact";
import Service from "../pages/ServicePage/Service";
import Login from "../pages/LoginPage/Login";
import UserProfile from "../pages/UserProfilePage/UserProfile";



const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/Service" element={<Service />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/User/:id" element={<UserProfile />} />
    </Routes>
  );
  
  export default routes;
  