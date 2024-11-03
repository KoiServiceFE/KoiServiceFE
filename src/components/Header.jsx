import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { logout } from '../stores/slices/authSlice';
import "./Header.css";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username, userId } = useSelector((state) => state.auth);

    const carousels = [
        { img: '/Images/fish.jpeg' },
        { img: '/Images/fish2.jpeg' },
        { img: '/Images/fish3.jpeg' },
    ];

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
                            <li className="menu-active"><a href="/">Home</a></li>
                            <li><a href="/About">About</a></li>
                            <li><a href="/Service">Services</a></li>
                            <li><a href="/Contact">Contact</a></li>
                            {username ? (
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        {username} <span className="caret"></span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href={`/User/${userId ? userId : ""}`}>Profile</a></li>
                                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </li>
                            ) : (
                                <li><a href="/Login">Login</a></li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            <Carousel indicators={false}>
                {carousels.map((carousel, index) => (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100 carousel-img" src={carousel.img} alt={carousel.script} />
                        <Carousel.Caption>
                            <h3>{carousel.script}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}
