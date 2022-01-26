import React, { useState } from "react";

// STYLE
import "./display.scss";

export const Display = ({ displayValue = "0" }) => {
  return (
    <div className="display">
      <span className="character">{displayValue}</span>
    </div>
  );
};
