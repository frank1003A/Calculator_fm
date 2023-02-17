import React from "react";

interface Props {
  handleButtonClick: (value: string) => void;
  reset?: () => void;
  del?: () => void;
  equalfn?: () => void;
}

const Buttons = ({ handleButtonClick, reset, del, equalfn }: Props) => {
  const buttonValues: {
    id: string;
    value: string;
    action?: () => void;
    title?: string;
    descriptionId?: string;
    description?: string;
  }[] = [
    {
      id: "number_seven",
      value: "7",
      title: "Seven",
      descriptionId: "seven-desc",
      description: "Press to enter the number seven.",
    },
    {
      id: "number_eight",
      value: "8",
      title: "Eight",
      descriptionId: "eight-desc",
      description: "Press to enter the number eight.",
    },
    {
      id: "number_nine",
      value: "9",
      title: "Nine",
      descriptionId: "nine-desc",
      description: "Press to enter the number nine.",
    },
    {
      id: "del",
      value: "del",
      action: del,
      title: "Delete",
      descriptionId: "del-desc",
      description: "Press to delete the last digit entered.",
    },
    {
      id: "number_four",
      value: "4",
      title: "Four",
      descriptionId: "four-desc",
      description: "Press to enter the number four.",
    },
    {
      id: "number_five",
      value: "5",
      title: "Five",
      descriptionId: "five-desc",
      description: "Press to enter the number five.",
    },
    {
      id: "number_six",
      value: "6",
      title: "Six",
      descriptionId: "six-desc",
      description: "Press to enter the number six.",
    },
    {
      id: "plussign",
      value: "+",
      title: "Plus",
      descriptionId: "plus-desc",
      description: "Press to add the previous and current numbers.",
    },
    {
      id: "number_one",
      value: "1",
      title: "One",
      descriptionId: "one-desc",
      description: "Press to enter the number one.",
    },
    {
      id: "number_two",
      value: "2",
      title: "Two",
      descriptionId: "two-desc",
      description: "Press to enter the number two.",
    },
    {
      id: "number_three",
      value: "3",
      title: "Three",
      descriptionId: "three-desc",
      description: "Press to enter the number three.",
    },
    {
      id: "minussign",
      value: "-",
      title: "Minus",
      descriptionId: "minus-desc",
      description: "Press to subtract the previous and current numbers.",
    },
    {
      id: "period",
      value: ".",
      title: "Decimal point",
      descriptionId: "decimal-desc",
      description: "Press to add a decimal point to the number.",
    },
    {
      id: "zero",
      value: "0",
      title: "Zero",
      descriptionId: "zero-desc",
      description: "Press to enter the number zero.",
    },
    {
      id: "divisionsign",
      value: "/",
      title: "Divide",
      descriptionId: "divide-desc",
      description: "Press to divide the previous and current numbers.",
    },
    {
      id: "multiplicationsign",
      value: "x",
      title: "Multiply",
      descriptionId: "multiply-desc",
      description: "Press to multiply the previous and current numbers.",
    },
    {
      id: "reset",
      value: "reset",
      action: reset,
      title: "Reset",
      descriptionId: "reset-desc",
      description: "Press to reset the calculator.",
    },
    {
      id: "equal",
      value: "=",
      action: equalfn,
      title: "Equals",
      descriptionId: "equals-desc",
      description: "Press to get the result of the calculation.",
    },
  ];
  return (
    <div className="buttons">
      {buttonValues.map((btn, index) => (
        <>
          <button
            key={index}
            type="button"
            id={btn.id}
            onClick={
              btn.action !== undefined
                ? btn.action
                : () => handleButtonClick(btn.value)
            }
            title={btn.title}
            aria-describedby={btn.descriptionId}
          >
            {btn.value}
          </button>
          <span id={btn.descriptionId} className="visually-hidden">
            {btn.description}
          </span>
        </>
      ))}
    </div>
  );
};

export default Buttons;
