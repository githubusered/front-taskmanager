// src/reducers/authReducer.js
const initialState = {
    error: null,
    isAuthenticated: false,
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return { ...state, isAuthenticated: true, error: null, token: action.payload };
      case 'LOGIN_FAILURE':
      case 'REGISTER_FAILURE':
        return { ...state, error: action.payload, isAuthenticated: false };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false, token: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  