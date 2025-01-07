import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Patient from "./components/Patient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Patient />
  </React.StrictMode>
);
