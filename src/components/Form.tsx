import Buttons from "./Buttons";

interface Props {
  output: string;
  handleButtonClick: (value: string) => void;
  reset?: () => void;
  del?: () => void;
  equalfn?: () => void;
}

const Form = ({ output, handleButtonClick, reset, del, equalfn }: Props) => {
  return (
    <form className="calculator" aria-label="Calculator" role="region">
      <div className="screen" tabIndex={0}>
        <output id="display" placeholder="0" aria-live="polite">
          {output}
        </output>
      </div>
      <Buttons
        handleButtonClick={handleButtonClick}
        reset={reset}
        del={del}
        equalfn={equalfn}
      />
    </form>
  );
};

export default Form;
