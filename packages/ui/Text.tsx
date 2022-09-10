import React, { CSSProperties, JSXElementConstructor } from "react";

interface TextProps {
  variant?: keyof typeof variantClassNames;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
  onClick?: () => any;
}

type Variant =
  | "body"
  | "heading"
  | "pageHeading"
  | "sectionHeading"
  | "username"
  | "info";

const variantClassNames = {
  info: "text-sm select-none",
  username: "font-extrabold select-none",
  body: "text-base leading-7 max-w-6xl mx-auto",
  heading: "text-5xl pt-1 pb-2 font-semibold tracking-wide cursor-pointer mb-2",
  pageHeading: "pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide",
  sectionHeading:
    "pt-1 pb-2 text-2xl font-bold tracking-wide cursor-pointer mb-2",
};

export const Text: React.FC<TextProps> = ({
  children,
  className,
  html,
  onClick,
  style,
  variant = "body",
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    body: "div",
    username: "p",
    info: "p",
    heading: "h1",
    pageHeading: "h1",
    sectionHeading: "h2",
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={`${variantClassNames[variant]} ${className}`}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};
