import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'; // Import your Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Wrap your App with Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();