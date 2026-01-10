import React from 'react';
import { motion } from 'framer-motion';

export const buttonVariants = {
  primary:
    'bg-accent-action text-white hover:bg-accent-action-hover active:bg-accent-action-active',
  subtle:
    'bg-neutral-3 dark:bg-neutral-dark-3 text-neutral-11 dark:text-neutral-dark-11 hover:bg-neutral-4 dark:hover:bg-neutral-dark-4',
  ghost:
    'text-neutral-11 dark:text-neutral-dark-11 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 active:bg-neutral-4 dark:active:bg-neutral-dark-4',
  danger: 'text-semantic-error-text hover:bg-semantic-error-bg',
} as const;

export const buttonSizes = {
  sm: 'h-7 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'subtle',
      size = 'md',
      iconOnly = false,
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-8 dark:focus-visible:ring-neutral-dark-8 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

    const variantClass = buttonVariants[variant];
    const sizeClass = iconOnly ? 'p-2' : buttonSizes[size];
    const widthClass = fullWidth ? 'w-full' : '';

    const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className}`;

    return (
      <motion.button
        ref={ref}
        disabled={disabled || loading}
        className={combinedClasses}
        whileTap={{ scale: 0.95 }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
