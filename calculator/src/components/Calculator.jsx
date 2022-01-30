import React from "react";
import { Keypad } from "./keypad/Keypad";
import { Display } from "./display/Display";

// STYLE
import "./calculator.scss";

export const Calculator = () => {
  return (
    <div className="calculator">
      <h1>Simple Calculator</h1>
      <Display />
      <Keypad />
    </div>
  );
};
