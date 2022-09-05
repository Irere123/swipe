import React, { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { textarea?: boolean }
>(({ textarea, ...props }, ref) => {
  const cn = `w-full py-2 outline-none px-3 text-primary-200 bg-primary-700`;

  return textarea ? (
    <textarea ref={ref as any} className={cn} {...(props as any)} />
  ) : (
    <input ref={ref} className={cn} {...props} />
  );
});

Input.displayName = "Input";
