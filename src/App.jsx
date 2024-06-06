import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [display, setDisplay] = useState(`0`);
  const [expression, setExpression] = useState(``);

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }

    if (expression === "0") {
      setExpression(number);
    } else {
      setExpression((prev) => prev + number);
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    setDisplay(operator + " ");
    setExpression(expression + " " + operator + " ");
  };

  const handleEqual = (event) => {
    let newExpression = expression.split(/\s+/);
    console.log(newExpression);

    const isNumber = (value) => {
      return Number.isFinite(parseFloat(value));
    };

    let finalExpression = [];

    let i = 0;

    while (i < newExpression.length) {
      if (isNumber(newExpression[i])) {
        finalExpression.push(newExpression[i]);
      } else {
        if (
          i > 1 &&
          newExpression[i] === "-" &&
          isNumber(newExpression[i + 1]) &&
          !isNumber(newExpression[i - 1])
        ) {
          // Handling negative numbers
          finalExpression.push(newExpression[i - 1]);
          finalExpression.push("-" + newExpression[i + 1]);
          i++; // Skip the next number as it's part of the negative number
        } else {
          if (isNumber(newExpression[i + 1]))
            finalExpression.push(newExpression[i]);
        }
      }
      i++;
    }

    console.log(finalExpression);

    try {
      const result = eval(finalExpression.join(""));
      console.log(finalExpression.join(""));
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplay("Error");
      setExpression("");
    }
  };

  const handleDecimal = (event) => {
    const decimal = event.target.textContent;
    if (display.includes(".")) return;
    setDisplay(display + decimal);

    if (expression === "") {
      setExpression(0 + decimal);
    } else {
      setExpression((prev) => prev + decimal);
    }
  };

  const handleClear = (event) => {
    setDisplay("0");
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <div className="result formula" id="formulascreen">
          {expression}
        </div>
        <div className="result" id="display">
          {display}
        </div>
        <div className="buttons">
          <button className="button resetBtn" id="clear" onClick={handleClear}>
            AC
          </button>

          <button
            className="button operator"
            id="divide"
            onClick={handleOperator}
          >
            /
          </button>
          <button
            className="button operator"
            id="multiply"
            onClick={handleOperator}
          >
            *
          </button>
          <button className="button number" onClick={handleNumber} id="one">
            1
          </button>
          <button className="button number" onClick={handleNumber} id="two">
            2
          </button>
          <button className="button number" onClick={handleNumber} id="three">
            3
          </button>

          <button
            className="button operator"
            id="subtract"
            onClick={handleOperator}
          >
            -
          </button>
          <button className="button number" onClick={handleNumber} id="four">
            4
          </button>
          <button className="button number" onClick={handleNumber} id="five">
            5
          </button>
          <button className="button number" onClick={handleNumber} id="six">
            6
          </button>
          <button className="button operator" id="add" onClick={handleOperator}>
            +
          </button>
          <div className="subset">
            <button className="button number" onClick={handleNumber} id="seven">
              7
            </button>
            <button className="button number" onClick={handleNumber} id="eight">
              8
            </button>
            <button className="button number" onClick={handleNumber} id="nine">
              9
            </button>

            <button
              className="button number zero-btn"
              id="zero"
              onClick={handleNumber}
            >
              0
            </button>
            <button
              className="button number dot"
              id="decimal"
              onClick={handleDecimal}
            >
              .
            </button>
          </div>

          <button className="button operator" id="equals" onClick={handleEqual}>
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
