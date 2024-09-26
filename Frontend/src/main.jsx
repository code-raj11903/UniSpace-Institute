import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// This is the root element in your HTML where React will render your app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

