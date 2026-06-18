import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents page reload on form submit
        try {
            const response = await api.post("/api/auth/login", formData);
            localStorage.setItem("token", response.data.token);
            alert("Login Successful");
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert("Login Failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Log in to manage your tasks effectively</p>
                </div>

                <form onSubmit={handleLogin}>
                    <label className="field-label">Email Address</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                        required
                    />

                    <label className="field-label">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                        required
                    />

                    <button type="submit" className="login-btn">
                        Sign In
                    </button>
                </form>

                <div className="register-link">
                    <span>New here?</span> <Link to="/register">Create an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;