import React from "react";

const colorMap = {
  "800": "bg-primary-800",
};

export interface BoxedIconProps
  extends React.ComponentPropsWithoutRef<"button"> {
  circle?: boolean;
  transition?: boolean;
  hover?: boolean;
  color?: keyof typeof colorMap;
}

export const BoxedIcon: React.FC<BoxedIconProps> = ({
  color = "800",
  children,
  className = "",
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
        hover ? `` : `hover:bg-primary-800`
      } h-10 w-10 cursor-pointer justify-center items-center ${
        circle ? `rounded-full` : `rounded-lg`
      } ${className.includes("text-button") ? "" : "text-primary-100"}
        ${className}`}
      data-testid="boxed-icon"
      {...props}
    >
      {children}
    </button>
  );
};
