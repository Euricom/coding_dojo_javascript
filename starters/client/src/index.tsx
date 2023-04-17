/* eslint-disable no-console */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Dump environment
console.log(import.meta.env);

// Render App
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
