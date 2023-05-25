import React from "react";

interface ButtonProps {
  label: string;
  size: "sm" | "md" | "lg";
  type: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  onClick?: () => any;
}

export default function Button({ disabled = false, ...props }: ButtonProps) {
  const type = getType(props.type);
  const size = getSize(props.size);

  return (
    <button
      className={`btn ${size} ${type}`}
      disabled={disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

const getType = (propsType: ButtonProps["type"]) => {
  switch (propsType) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "success":
      return "btn-success";
    case "danger":
      return "btn-danger";
  }
};

const getSize = (propsSize: ButtonProps["size"]) => {
  switch (propsSize) {
    case "sm":
      return "btn-sm";
    case "md":
      return "btn-md";
    case "lg":
      return "btn-lg";
  }
};
