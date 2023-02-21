/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";

interface THEME {
  theme: "theme1" | "theme2" | "theme3";
}
function App() {
  const [dataTheme, setDataTheme] = useState<THEME["theme"]>("theme1");
  const [output, setOutput] = useState<string>("0");
  const [passed, setPassed] = useState<boolean>(false);

  const numbers: number[] = output.split(/[\+\-\x\/]/).map(Number);

  const operators: string[] = output
    .split("")
    .filter((char) => /\+|\-|\x|\//.test(char));

  let result: number = numbers[0];

  const displayMax = 15;

  const handleButtonClick = (value: string) => {
    setOutput((prevOutput) => {
      let newOutput = prevOutput + value;

      // handle initial zero's
      newOutput = handleInitialZero(value, prevOutput);

      // handles consecutive operator
      newOutput = handleArithmeticOperatorLimit(newOutput);

      // limit decimal points for each number to one
      newOutput = handleDecimalLimits(value, newOutput);

      // limit the users input to just 15 numbers
      newOutput = handleNumberLimit(newOutput);

      // clear result
      handleClearResult(value, prevOutput);

      return newOutput;
    });
  };

  const switchOperator = (op: string, num: number) => {
    if (op === "+") {
      result += num;
    } else if (op === "-") {
      result -= num;
    } else if (op === "x") {
      result *= num;
    } else if (op === "/") {
      result /= num;
    } else {
      // do nothing
    }
    setOutput(parseFloat(result.toFixed(2)).toString());
    setPassed(true);
  };

  const calculateResult = () => {
    let i: number = 1;
    for (const op of operators) {
      const num: number = numbers[i];
      switchOperator(op, num);
      i++;
    }
  };

  const handleInitialZero = (value: string, initial: string) => {
    let current = value;
    let init = initial;
    if (init === "0" && current === "0") {
      // basically move the zero value 1 index forward
      // and a space before the first zero to bypass initial check
      return " " + current;
    } else if (init === "0" && current !== "0") {
      // first zero check which stops the initial zero
      // from computing and act as a placeholder
      return current;
    } else {
      return initial + current;
    }
  };

  const handleNumberLimit = (out: string) => {
    let newOutput = out;
    if (newOutput.length > displayMax) {
      return newOutput.slice(0, displayMax);
    } else {
      return newOutput;
    }
  };

  const handleDecimalLimits = (value: string, newOutput: string) => {
    let fm = "";
    if (newOutput.endsWith(".") && value === ".") {
      // Split the newOutput string into an array of numbers.
      const numbers = newOutput.split("+");
      // Replace the last number in the array with a new version that has at most one decimal point.
      numbers[numbers.length - 1] = numbers[numbers.length - 1].replace(
        /\.+/g,
        "."
      );
      // Join the numbers array back into a string.
      fm = numbers.join("+");
    } else {
      fm = newOutput;
    }
    return fm;
  };

  const formatOperator = (str: string) => str.replace(/([x/+-])+/g, "$1");

  const handleArithmeticOperatorLimit = (newOutput: string): string => {
    return formatOperator(newOutput);
  };

  const handleClearResult = (value: string, prev: string) => {
    let currentValue = value;
    let initValue = prev;
    if (passed && ["+", "-", "x", "/"].includes(value)) {
      setPassed(false);
      setOutput(initValue + currentValue);
    } else if (passed && !["+", "-", "x", "/"].includes(value)) {
      setPassed(false);
      reset();
    }
  };

  /**Figure Formater */
  const formatOutput = (number: string) => {
    let fm = "";
    for (let i = 0; i < numbers.length; i++) {
      if (
        numbers[i].toString().includes(".") ||
        numbers[i].toString().startsWith("0")
      ) {
        // do not format floating point values
        fm = number;
      } else {
        fm = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    return fm;
  };

  const reset = () => {
    setOutput("0");
  };

  const del = () => {
    let txt = output;
    if (result.toString() === "Infinity" || result.toString() === "NaN") {
      setOutput("0");
    } else {
      setOutput(txt.slice(0, txt.length - 1));
    }
  };

  const handleActiveTheme = (theme: THEME["theme"]) => {
    setDataTheme(theme);
  };

  return (
    <main data-theme={dataTheme}>
      <Header onButtonClick={handleActiveTheme} />
      <Form
        output={formatOutput(output)}
        handleButtonClick={handleButtonClick}
        reset={reset}
        del={del}
        equalfn={() => calculateResult()}
      />
      <Footer />
    </main>
  );
}

export default App;
