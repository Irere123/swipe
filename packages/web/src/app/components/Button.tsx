import React from "react";

const colorClassNames = {
  primary: "bg-primary-900",
  secondary: "",
};

interface ButtonProps {
  children?: React.ReactNode;
  color?: keyof typeof colorClassNames;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
}) => {
  return (
    <button className={`${colorClassNames[color]}`}>
      <div>{children}</div>
    </button>
  );
};
