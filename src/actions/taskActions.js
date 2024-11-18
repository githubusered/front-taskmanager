// src/actions/taskActions.js
import axios from 'axios';
import { API_URL } from '../config';


export const addTask = (taskDescription) => async (dispatch) => {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/tasks/`, 
        { description: taskDescription, completed: false },        
        { headers: { Authorization: `Bearer ${token}`}
      })

      dispatch({
        type: 'ADD_TASK_SUCCESS',
        payload: response.data,
      })
    }catch(err){
      const errorMessage = err.response?.data?.message || 'An error occurred';
      dispatch({ type: 'TASK_ERROR', payload: errorMessage})
    }
  };
  
  export const updateTask = (taskId, updatedTask) => async (dispatch) => {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
    });

      dispatch({
        type: 'UPDATE_TASK_SUCCESS',
        payload: response.data,
      })
    }catch(err){
      dispatch({ type: 'TASK_ERROR', payload: err.message });
    }
    
  };
  
  export const removeTask = (taskId) => async (dispatch) =>{
    try{
      dispatch({ type: 'TASK_LOADING' });

      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/tasks/${taskId}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: 'REMOVE_TASK_SUCCESS',
        payload: taskId,
      })
    }catch(err){
      dispatch({ type:'TASK_ERROR',payload: err.message })
    }
  };
  export const toggleTaskCompletion = (taskId, currentStatus) => async (dispatch, getState) => {
    try{
      const token = localStorage.getItem('token');
      const state = getState();
      const task = state.tasks.tasks.find((t) => t._id === taskId);
      if(!task) {
        throw new Error('Task Not Found');
      }

      const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, 
        { description: task.description, completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({
        type:'TOGGLE_TASK_COMPLETION_SUCCESS',
        payload: response.data,
      })

    }catch(err){
      console.error('Failed to toggle task completion:', err.response?.data || err.message);
      dispatch({ type: 'TASK_ERROR', payload: err.message })
    }
  }