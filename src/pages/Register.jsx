import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Correctly intercepts form submission context
        try {
            await api.post("/api/auth/register", formData);
            alert("Registration Successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Registration Failed");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Get Started</h2>
                    <p>Create an account to begin managing your tasks</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="field-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label className="field-label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label className="field-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="register-btn">
                        Create Account
                    </button>
                </form>

                <div className="login-link">
                    <span>Already have an account?</span> <Link to="/">Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;