// src/actions/authActions.js
import axios from 'axios';
import { API_URL } from '../config';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { email, password });

      if (response.data.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
        localStorage.setItem('token', response.data.token); // Save token for session management
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Login failed' });
    }
  };
};
export const register = (username,email,password) => {
  return async (dispatch) => {
  try{
    const response = await axios.post(`${API_URL}/api/users/register`, { username, email, password })
    if(response.data.success){
      dispatch({type:'REGISTER_SUCCESS', payload: response.data.token})
      localStorage.setItem('token', response.data.token); // Save token for session management
      // dispatch(login(email, password)); 
      Promise.resolve()
    }else{
      dispatch({ type: 'REGISTER_FAILURE', payload: response.data.message });
      Promise.reject()
    }
  }catch(error){
    const errorMessage = error.response?.data?.message || 'An error occurred';
    dispatch({ type:'REGISTER_FAILURE', payload: errorMessage})
    Promise.reject()
  }
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };
};
