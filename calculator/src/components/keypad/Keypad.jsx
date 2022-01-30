import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Key } from "../keys/Key";
import { keys } from "../../utils/keys";
import { sortBy } from "lodash";

import { CalculatorContext } from "../../CalculatorContext";

// STYLE
import "./keypad.scss";

export const Keypad = () => {
  const { displayValue, setDisplayValue } = useContext(CalculatorContext);
  const [value, setValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingOperand] = useState(false);
  const sortedKeys = useMemo(() => sortBy(keys, "order"), [keys]);

  const CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue,
  };
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    if (value === null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);
      setValue(newValue);
      setDisplayValue(String(newValue));
    }
    setOperator(nextOperator);
    setWaitingOperand(true);
  };
  const clearDisplay = () => {
    setDisplayValue("0");
  };

  const clearAll = () => {
    setValue(null);
    setDisplayValue("0");
    setOperator(null);
    setWaitingOperand(false);
  };

  const clearLastChar = () => {
    setDisplayValue(
      (prevChar) => prevChar.substring(0, prevChar.length - 1) || "0"
    );
  };

  const toggleSign = () => {
    setDisplayValue((prevChar) => {
      const newValue = parseFloat(prevChar) * -1;
      return String(newValue);
    });
  };

  const inputPercent = () => {
    setDisplayValue((prevChar) => {
      const currentValue = parseFloat(prevChar);
      if (currentValue === 0) return prevChar;
      const fixedDigits = prevChar.replace(/^-?\d*\.?/, "");
      const newValue = currentValue / 100;
      return String(newValue.toFixed(fixedDigits.length + 2));
    });
  };
  const inputDot = () => {
    setDisplayValue((prev) => {
      if (!/\./.test(prev)) {
        setWaitingOperand(false);
        return prev + ".";
      }
      return prev;
    });
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setWaitingOperand(false);
      setDisplayValue(String(digit));
    } else {
      setDisplayValue((prevValue) =>
        prevValue === "0" ? String(digit) : prevValue + digit
      );
    }
  };
  const handleKeyDown = (event) => {
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      inputDot();
    } else if (key === "%") {
      event.preventDefault();
      inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Clear") {
      event.preventDefault();

      if (displayValue !== "0") {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const { clearText, hasValue } = useMemo(() => {
    const hasValue = displayValue !== "0";
    const clearText = hasValue ? "C" : "AC";
    return {
      clearText,
      hasValue,
    };
  }, [displayValue]);

  const handleClick = useCallback(
    ({ char, name, type, operator }) => {
      switch (type) {
        case "function":
          if (name === "clear") {
            hasValue ? clearDisplay() : clearAll();
          }
          if (name === "negative") {
            toggleSign();
          }
          if (name === "percent") {
            inputPercent();
          }
          break;
        case "operator":
          performOperation(operator);
          break;
        case "decimal":
          inputDot();
          break;
        default:
          inputDigit(char);
      }
    },
    [
      setDisplayValue,
      clearDisplay,
      clearAll,
      toggleSign,
      inputPercent,
      inputDot,
      inputDigit,
      performOperation,
    ]
  );

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
