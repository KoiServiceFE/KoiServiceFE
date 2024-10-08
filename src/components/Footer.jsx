import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';  // Đảm bảo file Footer.css tồn tại

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4">
            <h5>Fish Care Center</h5>
            <p>
              Chúng tôi cung cấp dịch vụ chăm sóc cá cảnh chuyên nghiệp với đội ngũ bác sĩ thú y giàu kinh nghiệm.
              Sức khỏe của cá cảnh là ưu tiên hàng đầu của chúng tôi.
            </p>
          </div>
          
          {/* Services Section */}
          <div className="col-md-4">
            <h5>Dịch vụ</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-light">Tư vấn trực tuyến</a></li>
              <li><a href="#!" className="text-light">Khám bệnh tại nhà</a></li>
              <li><a href="#!" className="text-light">Điều trị bệnh tại trung tâm</a></li>
              
            </ul>
          </div>
          
          {/* Contact Section */}
          <div className="col-md-4">
            <h5>Liên hệ</h5>
            <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
            <p>Email: fishcareservice@gmail.com</p>
            <p>Điện thoại: +84 0964703716</p>

          
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