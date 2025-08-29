import React from "react";
import ButtonStyles from "./Button.module.scss";

interface ButtonProps {
  inv: string;
  selectedInverter: string;
  setSelectedInverter: (inv: string) => void;
}

const Button: React.FC<ButtonProps> = ({ inv, selectedInverter, setSelectedInverter }) => {
  return (
    <button
      key={inv}
      onClick={() => setSelectedInverter(inv)}
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
