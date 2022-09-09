/* eslint-disable no-unused-expressions */
import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, textarea, error, transparent, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-dark-2`;
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `w-full py-2 px-4 rounded-md text-black placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className} `;

    return textarea ? (
      <textarea
        ref={ref as any}
        className={cn}
        {...(props as any)}
        data-testid="textarea"
      />
    ) : (
      <input ref={ref} className={cn} {...props} data-testid="input" />
    );
  }
);

Input.displayName = "Input";
