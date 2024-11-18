// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Use named import
import authReducer from './reducers/authReducer'; // Import the auth reducer
import taskReducer from './reducers/taskReducer'; // Import the task reducer

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer, // Add the task reducer here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
