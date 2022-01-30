import React, { useContext } from "react";
import { CalculatorContext } from "../../CalculatorContext";

// STYLE
import "./display.scss";

export const Display = () => {
  const { displayValue } = useContext(CalculatorContext);
  return (
    <div className="display">
      <span className="character">{displayValue}</span>
    </div>
  );
};
