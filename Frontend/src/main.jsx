import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

// This is the root element in your HTML where React will render your app
const rootElement = document.getElementById('root');

// Creating the root using React 18's createRoot method
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
