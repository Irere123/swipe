import React, { ReactNode } from "react";
import { Spinner } from "./Spinner";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded",
  small: "px-2 py-1 text-sm rounded",
  tiny: "px-1 text-sm rounded",
};

const colorClassnames = {
  primary:
    "text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover",
  secondary:
    "text-button bg-secondary transition duration-200 ease-in-out hover:bg-secondary-washed-out disabled:text-secondary-washed-out disabled:bg-secondary-washed-out",
  transparent: "text-black bg-primary-dark border-2 border-primary-dark-2",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  className?: string;
  children?: any;
  loading?: boolean;
  icon?: JSX.Element;
  transition?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "big",
  color = "primary",
  className = "",
  disabled,
  loading,
  icon,
  transition,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`flex outline-none ${sizeClassnames[size]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${
        colorClassnames[color]
      } font-bold flex items-center justify-center ${className}`}
      data-testid="button"
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          <Spinner size={size === "small" ? "2" : "4"} />
        </span>
      ) : null}
    </button>
  );
};
