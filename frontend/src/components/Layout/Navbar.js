import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/customers" className="navbar-brand">
          Customer Management System
        </Link>

        <div className="navbar-menu">
          <Link to="/customers" className="navbar-item">
            Customers
          </Link>
          <Link to="/customers/new" className="navbar-item">
            Add Customer
          </Link>
          <Link to="/change-password" className="navbar-item">
            Change Password
          </Link>

          <div className="navbar-user">
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
