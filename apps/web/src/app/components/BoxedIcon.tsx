import React from "react";

const colorMap = {
  "700": "bg-primary-700",
  primary: "bg-primary-dark",
  transparent: "bg-transparent",
};

export type BoxedIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  circle?: boolean;
  transition?: boolean;
  hover?: boolean;
  color?: keyof typeof colorMap;
  class?: string;
};

export const BoxedIcon: React.FC<BoxedIconProps> = ({
  color = "transparent",
  children,
  circle = false,
  transition = false,
  hover = false,
  ...props
}) => {
  return (
    <button
      className={`flex ${colorMap[color]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${
        hover ? `` : `hover:bg-primary-600`
      } h-10 w-10 cursor-pointer justify-center items-center ${
        circle ? `rounded-full` : `rounded`
      }`}
      data-testid="boxed-icon"
      {...props}
    >
      {children}
    </button>
  );
};
