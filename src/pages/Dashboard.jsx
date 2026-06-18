import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await api.get("/api/tasks/my-tasks");
            setTasks(response.data || []);
        } catch (error) {
            console.log("Error loading tasks:", error);
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await api.delete(`/api/tasks/${id}`);
            alert("Task Deleted");
            loadTasks();
        } catch (error) {
            console.log("Delete failed:", error);
            alert("Delete Failed");
        }
    };

    const editTask = (task) => {
        setEditingTask({ ...task });
    };

    const updateTask = async () => {
        try {
            await api.put(`/api/tasks/${editingTask.id}`, {
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                status: editingTask.status,
                dueDate: editingTask.dueDate
            });
            alert("Task Updated");
            setEditingTask(null);
            loadTasks();
        } catch (error) {
            console.log("Update failed:", error);
            alert("Update Failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2 className="heading">My Tasks</h2>
                    <span className="task-count">{tasks.length} tasks total</span>
                </div>

                {/* Edit Task Modal Overlay */}
                {editingTask && (
                    <div className="modal-overlay">
                        <div className="edit-form">
                            <h2>Edit Task</h2>
                            
                            <label>Task Title</label>
                            <input
                                type="text"
                                value={editingTask.title || ""}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            />

                            <label>Description</label>
                            <textarea
                                value={editingTask.description || ""}
                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            />

                            <div className="form-row">
                                <div>
                                    <label>Priority</label>
                                    <select
                                        value={editingTask.priority || "MEDIUM"}
                                        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                                    >
                                        <option value="LOW">LOW</option>
                                        <option value="MEDIUM">MEDIUM</option>
                                        <option value="HIGH">HIGH</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Status</label>
                                    <select
                                        value={editingTask.status || "TODO"}
                                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                                    >
                                        <option value="TODO">TODO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                            </div>

                            <label>Due Date</label>
                            <input
                                type="date"
                                value={editingTask.dueDate || ""}
                                onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                            />

                            <div className="modal-actions">
                                <button className="btn update-btn" onClick={updateTask}>
                                    Save Changes
                                </button>
                                <button className="btn cancel-btn" onClick={() => setEditingTask(null)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Task Cards Grid Layout */}
                <div className="tasks-grid">
                    {tasks.map((task) => {
                        // Safe lowercase parsing to prevent layout crashes
                        const taskStatus = task.status ? task.status.toLowerCase() : "todo";
                        const taskPriority = task.priority ? task.priority.toLowerCase() : "medium";

                        return (
                            <div key={task.id} className="task-card">
                                <div className="task-card-header">
                                    <span className={`badge status-${taskStatus}`}>
                                        {task.status ? task.status.replace("_", " ") : "TODO"}
                                    </span>
                                    <span className={`badge priority-${taskPriority}`}>
                                        {task.priority || "MEDIUM"} Priority
                                    </span>
                                </div>

                                <h3>{task.title}</h3>
                                <p className="task-desc">{task.description || "No description provided."}</p>

                                <div className="task-meta">
                                    <div className="due-date-wrapper">
                                        <span className="meta-label">Due Date</span>
                                        <span className="meta-value">{task.dueDate || "No Date"}</span>
                                    </div>
                                </div>

                                <div className="task-card-actions">
                                    <button className="btn edit-btn" onClick={() => editTask(task)}>
                                        Edit
                                    </button>
                                    <button className="btn delete-btn" onClick={() => deleteTask(task.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State Handler */}
                {tasks.length === 0 && (
                    <div className="empty-state">
                        <p>No tasks found. Go to "Create Task" or use "AI Create" to get started!</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;