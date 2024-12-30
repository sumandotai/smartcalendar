import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-lg transition-colors';
    const variants = {
      primary: 'bg-[#89A8B2] text-white hover:bg-[#B3C8CF]',
      secondary: 'text-gray-600 hover:bg-gray-100',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);