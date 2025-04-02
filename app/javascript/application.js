// app/javascript/application.js
// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./components/App";

// console.log("APPLICATION.JS LOADED!");
// // Wait for DOM to be fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM LOADED!");
//   const container = document.getElementById("research-dashboard-app");

//   // Debug: Check if the container exists
//   if (container) {
//     console.log("Found container, mounting React app");
//     const root = createRoot(container);
//     root.render(React.createElement(App));
//   } else {
//     console.error("Container #research-dashboard-app not found in the DOM");
//   }
// });
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing React app");
  const container = document.getElementById('research-dashboard-app');

  if (container) {
    try {
      console.log("Found container, mounting App component");
      const root = createRoot(container);
      root.render(React.createElement(App));
      console.log("React app mounted successfully");
    } catch (error) {
      console.error("Error mounting React app:", error);
    }
  } else {
    console.error("Container #research-dashboard-app not found");
  }
});
