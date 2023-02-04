import React from "react";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [fallbackState, setFallbackState] = useState("");
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState("");
  const [total, setTotal] = useState(null);

  //Main funcs
  //useEffect for new rendering
  useEffect(() => {
    setDisplay(curState);
  }, [curState]);

  useEffect(() => {
    setDisplay("0");
  }, []);

  //Register when number is pressed
  const numberKey = (e) => {
    if (curState.length < 8) {
      if (curState.includes(".") && e.target.innerHTML === ".") {
        return;
      }

      //Another if statement to check if it's meant to start new calculation
      if (total) {
        setPreState("");
      }

      curState
        ? setCurState((preValue) => preValue + e.target.innerHTML)
        : setCurState(e.target.innerHTML);
      setTotal(false);
    } else {
      return;
    }
  };

  //Register when operator is pressed
  const operatorKey = (e) => {
    //setTotal to false so you can execute another operation
    setTotal(false);
    setOperator(e.target.innerHTML);
    //If curState doesn't exist, do nothing
    if (curState === "") {
      return;
    }
    //If preState exists, calculate operation and prepare to new curState input
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
    setFallbackState(curState);
  };

  //Return value from equation ($preState $operator $curState = x)
  const equals = (e) => {
    if (e?.target.innerHTML === "=") {
      setTotal(true);
    }

    let operation;
    switch (operator) {
      case "÷":
        operation =
          Math.round(
            String(
              parseFloat(preState) /
                parseFloat(curState ? curState : fallbackState)
            ) * 10000000
          ) / 10000000;
        break;
      case "×":
        operation = String(
          parseFloat(preState) * parseFloat(curState ? curState : fallbackState)
        );
        break;
      case "-":
        operation = String(
          parseFloat(preState) - parseFloat(curState ? curState : fallbackState)
        );
        break;
      case "+":
        operation = String(
          parseFloat(preState) + parseFloat(curState ? curState : fallbackState)
        );
        break;
      default:
        return;
    }
    //Set display to empty so the number displayed in the calculator is the preState
    setDisplay("");
    //Then pass the curState to the preState and empty the curState to accept the next number
    setPreState(operation);
    setCurState("");
  };

  //Transform values into percentages (x / 100)
  const percentage = () => {
    preState
      ? setCurState(
          String(Math.round(parseFloat(curState) * 10000000) / 1000000000) *
            preState
        )
      : setCurState(
          String(Math.round(parseFloat(curState) * 10000000) / 1000000000)
        );
  };

  //Transform value into opposite value (x * -1)
  const plusMinus = () => {
    if (curState === "") {
      if (preState.charAt(0) === "-") {
        setPreState(preState.substr(1));
      } else {
        setPreState(String("-" + preState));
      }
    } else if (curState.charAt(0) === "-") {
      setCurState(curState.substr(1));
    } else {
      setCurState(String("-" + curState));
    }
  };

  //Reset values
  const reset = () => {
    setPreState("");
    setCurState("");
    setDisplay("0");
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display" id="display">
          {display !== "" || display === "0" ? (
            <NumberFormat
              className="displayValue"
              id="display"
              value={display}
              displayType={"text"}
              thousandSeparator={true}
              isNumericString={true}
              decimalScale={8}
              format="########"
            />
          ) : (
            <NumberFormat
              className="displayValue"
              id="display"
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
              isNumericString={true}
              decimalScale={8}
              format="########"
            />
          )}
        </div>
        <div className="calcKeys">
          <button className="key-c modular-key" id="clear" onClick={reset}>
            AC
          </button>
          <button className="key-c modular-key" onClick={plusMinus}>
            +/-
          </button>
          <button className="key-c modular-key" onClick={percentage}>
            %
          </button>
          <button
            className="key-c operator-key"
            id="divide"
            onClick={operatorKey}
          >
            ÷
          </button>
          <button className="key-c number-key" id="seven" onClick={numberKey}>
            7
          </button>
          <button className="key-c number-key" id="eight" onClick={numberKey}>
            8
          </button>
          <button className="key-c number-key" id="nine" onClick={numberKey}>
            9
          </button>
          <button
            className="key-c operator-key"
            id="multiply"
            onClick={operatorKey}
          >
            ×
          </button>
          <button className="key-c number-key" id="four" onClick={numberKey}>
            4
          </button>
          <button className="key-c number-key" id="five" onClick={numberKey}>
            5
          </button>
          <button className="key-c number-key" id="six" onClick={numberKey}>
            6
          </button>
          <button
            className="key-c operator-key"
            id="subtract"
            onClick={operatorKey}
          >
            -
          </button>
          <button className="key-c number-key" id="one" onClick={numberKey}>
            1
          </button>
          <button className="key-c number-key" id="two" onClick={numberKey}>
            2
          </button>
          <button className="key-c number-key" id="three" onClick={numberKey}>
            3
          </button>
          <button className="key-c operator-key" id="add" onClick={operatorKey}>
            +
          </button>
          <button className="key-c number-key" id="zero" onClick={numberKey}>
            0
          </button>
          <button className="key-c number-key" id="decimal" onClick={numberKey}>
            .
          </button>
          <button className="key-c operator-key" id="equals" onClick={equals}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
