import React from "react";
import ButtonStyles from "./Button.module.scss";

interface ButtonProps {
  inv: string;
  selectedInverter: string;
  handleOnClick: (inv: string) => void;
}

const Button: React.FC<ButtonProps> = ({ inv, selectedInverter, handleOnClick }) => {
  return (
    <button
      key={inv}
      onClick={() => handleOnClick(inv)}
      className={ButtonStyles.button}
      style={{
        border:
          selectedInverter === inv ? "1px solid #007bff" : "1px solid #ccc",
        background: selectedInverter === inv ? "#e6f0ff" : "#fff",
        fontWeight: selectedInverter === inv ? "bold" : "normal",
      }}
    >
      Onduleur {inv}
    </button>
  );
};

export default Button;
