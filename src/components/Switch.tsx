import { useEffect, useRef, useState } from "react";

interface Props {
  // callback function
  onButtonClick: (theme: "theme1" | "theme2" | "theme3") => void;
}

const Switch = ({ onButtonClick }: Props) => {
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const switchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sw = switchRef.current! as HTMLDivElement;
    let arr = sw.children;

    for (let i = 0; i < arr.length; i++) {
      let radio = arr[i] as HTMLInputElement;
      radio.addEventListener("click", function () {
        this.style.opacity = "1";
        setActiveBtn(i);
      });
      if (i !== activeBtn) {
        radio.style.opacity = "0";
      }
    }
  }, [activeBtn]);


  return (
    <div className="indicator-switch">
      <div className="number-indicator">
      <p id="indicator">1</p>
      <p id="indicator">2</p>
      <p id="indicator">3</p>
      </div>
      <div className="tri-state-toggle" ref={switchRef}>
        <input
          className="button"
          type="radio"
          name="toggle"
          id="one"
          onClick={() => onButtonClick("theme1")}
        />
        <input
          className="button"
          type="radio"
          name="toggle"
          id="two"
          onClick={() => onButtonClick("theme2")}
        />
        <input
          className="button"
          type="radio"
          name="toggle"
          id="three"
          onClick={() => onButtonClick("theme3")}
        />
      </div>
    </div>
  );
};

export default Switch;
