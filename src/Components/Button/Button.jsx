import "Components/Button/Button.scss";
import cx from "classnames";

import { React } from "react";

function Button({ bgColor, text, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      style={{ background: bgColor, transition: "0.2s" }}
    >
      {text}
    </button>
  );
}

export default Button;
