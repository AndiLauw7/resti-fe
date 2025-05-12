import React from "react";

const ButtonCustom = (props) => {
  const {
    onClick = () => {},
    variant = "default",
    className = "",
    children,
    hidden,
    style = {
      padding: "11px",
      fontSize: "12px",
      fontWeight: "bolder",
      lineHeight: 1,
      letterSpacing: "0.3px",
    },
  } = props;

  const baseClasses =
    "border font-bold py-2 px-4 rounded transition duration-200 ease-in-out";
  const variantClass = {
    red: "border-red-500 text-red-700 hover:bg-red-500 hover:text-white",
    blue: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    default: "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantClass[variant]} ${className}`}
      style={style}
      onClick={onClick}
      hidden={hidden}
    >
      {children}
    </button>
  );
};

export default ButtonCustom;
