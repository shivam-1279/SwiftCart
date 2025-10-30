import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Updated Icon Imports for a more creative/modern feel
import { FaShoppingBasket, FaBuilding, FaUserCircle, FaSignOutAlt, FaUserPlus, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../user/AuthContext"; 

const Navbar = ({ numCartItems = 0 }) => {
  const { isLoggedIn, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Modern Navbar: Light background (white), strong shadow, fixed top, ample vertical padding (py-3)
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-lg fixed-top py-3">
      <div className="container">
        
        {/* TOP ROW: BRAND & CART */}
        <div className="d-flex w-100 justify-content-between align-items-center">
            
            {/* Brand */}
            <Link to="/" className="navbar-brand fw-bolder fs-4 text-primary me-auto">
                ShopBrand ✨
            </Link>

            {/* Cart Link (Always visible, pushed to the far right on its line) */}
            <Link className="nav-link position-relative ms-3" to="/cart" aria-label="Shopping Cart">
                <FaShoppingBasket size={22} className="text-dark" /> {/* Creative Icon Change */}
                {numCartItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm">
                        {numCartItems}<span className="visually-hidden">items in cart</span>
                    </span>
                )}
            </Link>
        </div>
        
        {/* BOTTOM ROW: NAVIGATION LINKS
          
          KEY CHANGE: We use 'd-none d-lg-flex' to hide this entire block on mobile, 
          and only show it on large screens as a single, right-aligned row.
          This simplifies the structure for desktop while maintaining the clean mobile top bar.
        */}
        <div className="d-none d-lg-flex justify-content-end w-100 mt-lg-0 pt-lg-0">
          <ul className="navbar-nav d-flex align-items-center">
            
            {/* Home Link */}
            <li className="nav-item me-3">
                <Link className="nav-link fw-semibold text-dark p-2" to="/">
                    <FaBuilding className="me-1" /> Home {/* Creative Icon Change */}
                </Link>
            </li>

            {isLoggedIn ? (
                <>
                    {/* Profile Link */}
                    <li className="nav-item me-3">
                        <Link className="nav-link fw-semibold text-dark p-2" to="/profile">
                            <FaUserCircle size={18} className="me-1" /> Profile {/* Creative Icon Change */}
                        </Link>
                    </li>
                    {/* Logout Button */}
                    <li className="nav-item">
                        <button className="btn btn-primary btn-sm fw-semibold px-3 py-1 shadow-sm rounded-pill" onClick={handleLogout}>
                            <FaSignOutAlt className="me-1" /> Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    {/* Login Link */}
                    <li className="nav-item me-3">
                        <Link className="nav-link text-dark p-2" to="/login">
                            <FaSignInAlt className="me-1" /> Login {/* Creative Icon Change */}
                        </Link>
                    </li>
                    {/* Register Link (Outline button for distinction) */}
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary btn-sm fw-semibold px-3 py-1 rounded-pill" to="/register">
                            <FaUserPlus className="me-1" /> Register
                        </Link>
                    </li>
                </>
            )}
          </ul>
        </div>

        {/* --- Mobile-Only Menu for Links --- */}
        {/* We re-add the flexible mobile menu for the links to stack cleanly 
            *Below* the main brand/cart line when on mobile.
            This ensures all links are visible on mobile, as requested, without the toggle.
        */}
        <ul className="navbar-nav w-100 d-flex flex-row flex-wrap justify-content-start align-items-center mt-2 pt-2 border-top border-light-subtle d-lg-none">
             {/* Home Link */}
            <li className="nav-item">
                <Link className="nav-link fw-semibold text-dark p-2" to="/">
                    <FaBuilding className="me-1" /> Home
                </Link>
            </li>

            {isLoggedIn ? (
                <>
                    {/* Profile Link */}
                    <li className="nav-item">
                        <Link className="nav-link fw-semibold text-dark p-2" to="/profile">
                            <FaUserCircle size={18} className="me-1" /> Profile
                        </Link>
                    </li>
                    {/* Logout Button (Using ms-auto to push it right on mobile relative to other links) */}
                    <li className="nav-item ms-auto">
                        <button className="btn btn-primary btn-sm fw-semibold px-3 py-1 shadow-sm rounded-pill" onClick={handleLogout}>
                            <FaSignOutAlt className="me-1" /> Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    {/* Login Link */}
                    <li className="nav-item">
                        <Link className="nav-link text-dark p-2" to="/login">
                            <FaSignInAlt className="me-1" /> Login
                        </Link>
                    </li>
                    {/* Register Link (Outline button for distinction) */}
                    <li className="nav-item">
                        <Link className="btn btn-outline-primary btn-sm fw-semibold px-3 py-1 rounded-pill ms-2" to="/register">
                            <FaUserPlus className="me-1" /> Register
                        </Link>
                    </li>
                </>
            )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;