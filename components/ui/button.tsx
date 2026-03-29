import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm",
        "border-[var(--surface-border)] bg-[var(--surface-2)] text-foreground shadow-surface",
        "transition hover:-translate-y-[1px] hover:border-[var(--surface-border-strong)] hover:shadow-surface-hover",
        "focus:outline-none focus:ring-2 focus:ring-accent/45 focus:ring-offset-1 focus:ring-offset-background",
        className
      )}
      {...props}
    />
  );
});
