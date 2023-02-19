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

      // check zero's
      if (output === "0" && value === "0") {
        // basically move the zero value 1 index forward
        // and a space to before the first zero to bypass initial check
        newOutput = " " + value;
      } else if (output === "0" && value !== "0") {
        // first zero check which stops the initial zero
        // from computing and act as a placeholder
        newOutput = value;
      }

      // limit the users input to just 15 numbers
      if (newOutput.length > displayMax) {
        return newOutput.slice(0, displayMax);
      }

      // clear result
      if (
        passed &&
        (value === "+" ||
          value === "-" ||
          value === "/" ||
          value === "x" ||
          value === ".")
      ) {
        setPassed(false);
        newOutput = prevOutput + value;
      } else if (passed) {
        setPassed(false);
        reset();
      }

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
