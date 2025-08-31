import React from "react";

import InverterButtonStyles from "./InverterButton.module.scss";

interface InverterButtonProps {
  inv: string;
  selectedInverter: string;
  handleOnClick: (inv: string) => void;
}

const InverterButton: React.FC<InverterButtonProps> = ({
  inv,
  selectedInverter,
  handleOnClick,
}) => {
  return (
    <button
      onClick={() => handleOnClick(inv)}
      className={InverterButtonStyles.button}
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

export default InverterButton;
