import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-[var(--shadow-cta-primary)] hover:bg-[var(--btn-primary-bg-hover)] hover:shadow-[var(--shadow-gold-glow)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-sm",
        outline:
          "border-2 border-[var(--btn-secondary-border)] bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover-bg)] hover:text-[var(--btn-secondary-hover-text)] hover:border-[var(--color-maroon)]",
        secondary:
          "bg-[var(--btn-secondary-bg)] border-2 border-[var(--btn-secondary-border)] text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover-bg)] hover:text-[var(--btn-secondary-hover-text)]",
        ghost:
          "text-[var(--btn-ghost-text)] hover:text-[var(--btn-ghost-hover-text)] hover:bg-transparent",
        link: "text-[var(--btn-ghost-text)] underline-offset-4 hover:underline hover:text-[var(--btn-ghost-hover-text)]",
        gold: "bg-[var(--btn-gold-bg)] text-[var(--btn-gold-text)] shadow-[var(--shadow-cta-primary)] hover:bg-[var(--btn-gold-hover-bg)] hover:text-[var(--btn-gold-hover-text)] hover:scale-[1.02]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base has-[>svg]:px-5",
        sm: "h-10 rounded-lg gap-1.5 px-4 text-sm has-[>svg]:px-3",
        lg: "h-14 rounded-xl px-8 text-lg has-[>svg]:px-7",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
