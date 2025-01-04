// Entry point for the build script in your package.json
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import ProjectDetails from "./components/ProjectDetails";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("research-dashboard-app");

  if (container) {
    const root = createRoot(container);

    // Basic routing based on the URL path
    const path = window.location.pathname;

    // If the path includes /projects/ and a project ID, render the ProjectDetails component
    if (path.match(/\/projects\/\d+/)) {
      root.render(<ProjectDetails />);
    } else {
      // Otherwise, render the main App component
      root.render(<App />);
    }
  }
});
