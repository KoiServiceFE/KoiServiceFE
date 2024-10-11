import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';  // Ensure Footer.css file exists

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4">
            <h5>Fish Care Center</h5>
            <p>
              We provide professional aquarium care services with a team of experienced veterinarians. 
              The health of your aquatic pets is our top priority.
            </p>
          </div>
          
          {/* Services Section */}
          <div className="col-md-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light">Online Consultation</a></li>
              <li><a href="#!" className="text-light">Home Visit</a></li>
              <li><a href="#!" className="text-light">Treatment at the Center</a></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>123 ABC Street, XYZ District, Ho Chi Minh City</p>
            <p>Email: fishcareservice@gmail.com</p>
            <p>Phone: +84 0964703716</p>
          </div>
        </div>
        <hr className="my-3" />
        <div className="text-center">
          © 2024 FishCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
