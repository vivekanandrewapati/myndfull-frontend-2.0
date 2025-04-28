import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.png';
import axios from 'axios';
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Check auth status on mount and route changes
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/users/current-user`, {
                    withCredentials: true
                });
                
                // Update this condition to check for user data
                setIsLoggedIn(!!response.data?.data);
            } catch (error) {
                console.error('Auth check error:', error);
                setIsLoggedIn(false);
            }
        };
        
        checkAuthStatus();
    }, [location.pathname, backendUrl]);

    const handleLogout = async () => {
        try {
            await axios.post(`${backendUrl}/api/v1/users/logout`, {}, {
                withCredentials: true // Ensure this is present
            });

            // No need to clear localStorage
            setIsLoggedIn(false); // Immediately update state
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggedIn(false); // Immediately update state
            navigate('/login', { replace: true });
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Brand Logo - Responsive at all sizes */}
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px]"
                            src={logo}
                            alt="MyndFull Logo"
                        />
                        <Link
                            to="/"
                            className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-primary-500"
                        >
                            MyndFull
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
                        <NavLink
                            to="/aboutus"
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            ABOUT US
                        </NavLink>
                        {!isLoggedIn ? (
                            <NavLink
                                to="/login"
                                className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                            >
                                LOGIN
                            </NavLink>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                            >
                                LOGOUT
                            </button>
                        )}
                        <a
                            href="mailto:myndfull@gmail.com"
                            className="text-sm xl:text-base text-text-600 hover:text-primary-500 transition-colors font-body whitespace-nowrap"
                        >
                            CONTACT US
                        </a>
                        {!isLoggedIn && (
                            <NavLink
                                to="/signup"
                                className="border-2 border-primary-500 text-primary-500 rounded-full px-4 xl:px-6 py-1.5 xl:py-2 text-sm xl:text-base hover:bg-primary-500 hover:text-white transition-colors font-body whitespace-nowrap"
                            >
                                GET STARTED →
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        {!isLoggedIn && (
                            <NavLink
                                to="/signup"
                                className="border-2 border-primary-500 text-primary-500 rounded-full px-3 py-1 text-sm hover:bg-primary-500 hover:text-white transition-colors font-body whitespace-nowrap"
                            >
                                GET STARTED
                            </NavLink>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-primary-500 p-1.5 hover:bg-primary-50 rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[57px] bg-white shadow-lg overflow-y-auto animate-fadeIn">
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            <NavLink
                                to="/aboutus"
                                className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ABOUT US
                            </NavLink>
                            {!isLoggedIn ? (
                                <NavLink
                                    to="/login"
                                    className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    LOGIN
                                </NavLink>
                            ) : (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                >
                                    LOGOUT
                                </button>
                            )}
                            <a
                                href="mailto:myndfull@gmail.com"
                                className="block text-sm font-medium text-text-600 hover:text-primary-500 transition-colors font-body py-3 border-b border-gray-100"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                CONTACT US
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
