import "Components/Button/Button.scss";

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
