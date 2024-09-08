import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  text?: string;
  additionalClasses?: string;
  onClick?: () => void;
  svg?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  additionalClasses = "",
  onClick,
  svg,
}) => {
  const defaultClasses =
    "py-2 bg-theam-light font-semibold rounded-lg shadow-md hover:bg-theam-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-theam-dark transition duration-300 ease-in-out p-4 ";
  const buttonClasses = `${defaultClasses} ${additionalClasses}`;

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {svg && <span>{svg}</span>}
      {text}
    </button>
  );
};

export default Button;
