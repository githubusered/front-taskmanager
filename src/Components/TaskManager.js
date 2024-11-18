// src/Components/TaskManager.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, removeTask, toggleTaskCompletion } from '../actions/taskActions';
import axios from 'axios';
import { API_URL } from '../config';

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Dispatch an action to populate tasks in the Redux store
        dispatch({ type: 'GET_TASKS_SUCCESS', payload: response.data.tasks });
      } catch (err) {
        console.error('Failed to fetch tasks', err);
        dispatch({ type: 'TASK_ERROR', payload: err.message });
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (task) {
      if (editId !== null) {
        dispatch(updateTask(editId, { description: task, completed: false }));
        setEditId(null);
      } else {
        dispatch(addTask(task));
      }
      setTask('');
    }
  };

  const handleEdit = (taskId, description) => {
    setTask(description);//.description
    setEditId(taskId);
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <form onSubmit={handleTaskSubmit} className="task-form">
        <input
          type="text"
          placeholder="New task description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update Task' : 'Add Task'}</button>
      </form>
      {error && <p style={{color:'red',padding:'10px 0 10px 0',margin:'0 0 20px 0',borderRadius:'8px'}}>{error}</p>}
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th id="statusOfTask">Status</th>
            <th id="actionsOfTask">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.description}</td>
              <td>{task.completed ? 'Completed' : 'Not Completed'}</td>
              <td>
                <button onClick={() => dispatch(toggleTaskCompletion(task._id, task.completed))}>Toggle Completion</button>
                <button onClick={() => handleEdit(task._id, task.description)}>Edit</button>
                <button onClick={() => dispatch(removeTask(task._id))}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;
