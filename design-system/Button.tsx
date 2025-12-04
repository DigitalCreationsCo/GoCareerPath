import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all transition-transform shadow-sm max-w-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-xs',
        outline:
          'border border-input/50 bg-background hover:border-input',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        cta:
          "bg-gradient-transition bg-accent/90 hover:bg-accent-glow text-accent-foreground font-semibold border-0",
        hero: "bg-gradient-transition bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold text-lg border-0 transform transition-transform transition-shadow shadow-md hover:shadow-lg hover:translate-y-[-0.5px] hover:scale-103",
        ghost: 'hover:bg-secondary/80 shadow-none hover:inset-shadow-xs',
        link: 'text-primary underline-offset-4 hover:underline shadow-none',
        warning: "bg-warning text-warning-foreground hover:bg-warning/90"
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 rounded-md px-8 has-[>svg]:px-4',
        xl: "h-14 rounded-lg px-10 py-4 text-lg",
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
