// Mount React application
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("research-dashboard-app");
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
});
