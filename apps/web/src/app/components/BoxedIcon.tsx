import { JSX, Component } from "solid-js";

const colorMap = {
  "700": "bg-primary-700",
  "800": "bg-primary-800",
  transparent: "bg-transparent",
};

export interface BoxedIconProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  circle?: boolean;
  transition?: boolean;
  hover?: boolean;
  color?: keyof typeof colorMap;
  class?: string;
}

export const BoxedIcon: Component<BoxedIconProps> = ({
  color = "transparent",
  children,
  circle = false,
  transition = false,
  hover = false,
  ...props
}) => {
  return (
    <button
      class={`flex ${colorMap[color]} ${
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
