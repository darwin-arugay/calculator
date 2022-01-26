import React, { useCallback, useMemo, useState } from "react";
import { Key } from "../keys/Key";
import { keys } from "../../utils/keys";
import { sortBy } from "lodash";

// STYLE
import "./keypad.scss";

export const Keypad = ({ displayValue, setDisplayValue }) => {
  const [previousValue, setPreviousValue] = useState(0);
  console.log(previousValue);
  const sortedKeys = useMemo(() => sortBy(keys, "order"), [keys]);
  const handleClick = useCallback(
    ({ char, name, type }) => {
      switch (type) {
        case "function":
          // setDisplayValue(char)
          if (name === "clear") {
            setDisplayValue("0");
          }
          if (name === "negative") {
            setDisplayValue((prev) => parseFloat(prev) * -1);
          }
          if (name === "percent") {
            setDisplayValue((prevChar) => {
              const currentValue = parseFloat(prevChar);
              if (currentValue === 0) return prevChar;
              const fixedDigits = prevChar.replace(/^-?\d*\.?/, "");
              const newValue = currentValue / 100;
              return String(newValue.toFixed(fixedDigits.length + 2));
            });
          }
          break;
        case "operator":
          if (name === "add") {
            setDisplayValue((prev) => prev);
            // setPreviousValue(parseFloat(displayValue))
          }
          break;
        default:
          setDisplayValue((prevChar) => {
            return prevChar === "0" ? String(char) : prevChar + char;
          });
      }
    },
    [setDisplayValue]
  );

  const { clearDisplay, clearText } = useMemo(() => {
    const clearDisplay = displayValue !== "0";
    const clearText = clearDisplay ? "C" : "AC";
    return {
      clearDisplay,
      clearText,
    };
  }, [displayValue]);

  return (
    <div className="keypad">
      {sortedKeys.map((key) => {
        const { char, type } = key;
        return (
          <Key
            key={char}
            {...key}
            onClick={() => handleClick(key)}
            displayValue={displayValue}
          >
            {char === "AC" && type === "function" ? clearText : char}
          </Key>
        );
      })}
    </div>
  );
};
