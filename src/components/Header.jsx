import { useDispatch, useSelector } from "react-redux";

import { logout } from "../stores/slices/authSlice";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import UserRole from "../common/constant/UserRole";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, roleId, userId } = useSelector((state) => state.auth);

  console.log(userId);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <header id="header">
        <div className="container">
          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li className="menu-active">
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/About">About</a>
              </li>
              <li>
                <a href="/Contact">Contact</a>
              </li>
              <li>
                <a href="/Service">Services</a>
              </li>

              {username && roleId == UserRole.ADMIN && (
                <>
                  <li>
                    <a href="/admin/doctor-schedule">Admin Dashboard</a>
                  </li>
                </>
              )}

              {username && roleId == UserRole.DOCTOR && (
                <>
                  <li>
                    <a href="/veterian/doctor-schedule">Veterian Dashboard</a>
                  </li>
                </>
              )}
              {username ? (
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    {username} <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={`/User/${userId}`}>Profile</Link>
                    </li>
                    <li>
                      <a href="#" onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <a href="/Login">Login</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
