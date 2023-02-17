/* eslint-disable no-useless-escape */
import React, { useMemo, useState } from "react";
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

  const numbers: number[] = output.split(/[\+\-\x\/]/).map(Number);

  const operators: string[] = output
    .split("")
    .filter((char) => /\+|\-|\x|\//.test(char));

  let result: number = numbers[0];

  const handleButtonClick = useMemo(
    () => (value: string) => {
      // check if initial output is zero
      // Update state with the value of the button that was clicked
      output === "0" ? setOutput(value) : setOutput(output + value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [output]
  );

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
    setOutput(result.toString())
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
  const formatOutput = (number: string): string => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const reset = () => {
    setOutput("0");
  };

  const del = () => {
    let txt = output;
    setOutput(txt.slice(0, txt.length - 1));
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
