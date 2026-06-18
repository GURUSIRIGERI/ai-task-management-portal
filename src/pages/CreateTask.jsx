import { useState } from "react";
import api from "../services/api";
import "../styles/CreateTask.css";
import Navbar from "../components/Navbar";

function CreateTask() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "MEDIUM",
        status: "TODO"
    });

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/tasks/create", task);
            console.log(response.data);
            alert("Task Created Successfully");
            setTask({
                title: "",
                description: "",
                dueDate: "",
                priority: "MEDIUM",
                status: "TODO"
            });
        } catch (error) {
            console.log(error);
            alert("Failed to Create Task");
        }
    };

    return (
        <>
            <Navbar />

            <div className="create-container">
                <div className="create-card">
                    <h2>Create Task</h2>

                    <form onSubmit={handleSubmit}>
                        <label className="field-label">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g., Complete Spring Boot Assignment"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />

                        <label className="field-label">Description</label>
                        <textarea
                            name="description"
                            placeholder="Add clear context or steps for this task..."
                            value={task.description}
                            onChange={handleChange}
                        />

                        <div className="form-row">
                            <div>
                                <label className="field-label">Priority</label>
                                <select
                                    name="priority"
                                    value={task.priority}
                                    onChange={handleChange}
                                >
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                </select>
                            </div>
                            <div>
                                <label className="field-label">Status</label>
                                <select
                                    name="status"
                                    value={task.status}
                                    onChange={handleChange}
                                >
                                    <option value="TODO">TODO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                        </div>

                        <label className="field-label">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                        />

                        <button type="submit" className="create-btn">
                            Create Task
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateTask;