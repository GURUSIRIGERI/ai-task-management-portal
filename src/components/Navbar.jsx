import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Used to highlight the active tab

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <span>Task</span>Master AI
            </div>
            
            <div className="navbar-links">
                <Link 
                    to="/dashboard" 
                    className={location.pathname === "/dashboard" ? "active" : ""}
                >
                    Dashboard
                </Link>
                <Link 
                    to="/create-task" 
                    className={location.pathname === "/create-task" ? "active" : ""}
                >
                    Create Task
                </Link>
                <Link 
                    to="/ai-task" 
                    className={location.pathname === "/ai-task" ? "active" : ""}
                >
                    AI Task
                </Link>
            </div>

            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;