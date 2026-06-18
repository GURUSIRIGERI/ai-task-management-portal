import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import AICreateTask from "./pages/AICreateTask";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/create-task"
                    element={<CreateTask />}
                />

                <Route
                    path="/ai-task"
                    element={<AICreateTask />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;