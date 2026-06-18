import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/AICreateTask.css";

function AICreateTask() {

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const generateTask = async () => {

        try {

            setLoading(true);

            const response = await api.post(
                "/api/tasks/ai-create",
                {
                    title: title,
                    priority: "HIGH",
                    status: "TODO",
                    dueDate: "2026-06-20"
                }
            );

            console.log(response.data);

            alert("AI Task Created Successfully");

            setTitle("");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Failed to Create AI Task");

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="ai-container">

                <div className="ai-card">

                    <h2>AI Task Generator</h2>

                    <input
                        type="text"
                        placeholder="Enter Task Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <br /><br />

                    <button
                        className="ai-btn"
                        onClick={generateTask}
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Generating..."
                                : "Generate AI Task"
                        }
                    </button>

                </div>

            </div>
        </>
    );
}

export default AICreateTask;