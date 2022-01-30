import React, { createContext, useState } from "react";

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [displayValue, setDisplayValue] = useState("0");
  return (
    <CalculatorContext.Provider value={{ displayValue, setDisplayValue }}>
      {children}
    </CalculatorContext.Provider>
  );
};
