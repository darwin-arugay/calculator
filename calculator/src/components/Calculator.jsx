import React, { useState } from "react";
import { Keypad } from "./keypad/Keypad";
import { Display } from "./display/Display";

// STYLE
import "./calculator.scss";

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  return (
    <div className="calculator">
      <h1>Simple Calculator</h1>
      <Display displayValue={displayValue} />
      <Keypad displayValue={displayValue} setDisplayValue={setDisplayValue} />
    </div>
  );
};
