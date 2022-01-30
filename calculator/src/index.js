import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CalculatorProvider } from "./CalculatorContext";

ReactDOM.render(
  <React.StrictMode>
    <CalculatorProvider>
      <App />
    </CalculatorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
