import { Component, JSX } from "solid-js";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
}

export const Input: Component<InputProps> = ({
  textarea,
  error,
  transparent,
  ...props
}) => {
  const bg = transparent ? `bg-transparent` : `bg-primary-dark`;
  const ring = error ? `ring-1 ring-secondary` : "";
  const cn = `w-full py-2 px-4 rounded-md text-black placeholder-primary-300 focus:outline-none ${bg} ${ring} ${props.class}`;

  return textarea ? (
    <textarea className={cn} data-testid="textarea" {...(props as any)} />
  ) : (
    <input class={cn} data-testid="input" {...props} />
  );
};
