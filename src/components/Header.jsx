import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../stores/slices/authSlice';
import "./Header.css";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useSelector((state) => state.auth);

    const carousels = [
        { img: '/Images/fish.jpeg', script: 'ảnh 1' },
        { img: '/Images/fish2.jpeg', script: 'ảnh 2' },
        { img: '/Images/fish3.jpeg', script: 'ảnh 3' },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
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
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/service">Services</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                            {username ? (
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                                            {username}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/user/:id">
                                                Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            <Carousel>
                {carousels.map((carousel, index) => (
                    <Carousel.Item key={index}>
                        <img 
                            className="d-block w-100 carousel-img" 
                            src={carousel.img} 
                            alt={carousel.script} 
                        />
                        <Carousel.Caption>
                            <h3>{carousel.script}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}