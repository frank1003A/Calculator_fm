import Switch from "./Switch";

interface Props {
  // callback function
  onButtonClick: (theme: "theme1" | "theme2" | "theme3") => void;
}
const Header = ({ onButtonClick }: Props) => {
  return (
    <header>
      <h1>calc</h1>
      <h2>theme</h2>
      <Switch onButtonClick={onButtonClick}/>
    </header>
  );
};

export default Header;
