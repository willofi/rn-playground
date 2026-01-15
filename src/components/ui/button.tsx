import * as React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { cn } from '@/lib/utils';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-blue-600 active:bg-blue-700',
      outline: 'border border-gray-300 bg-transparent active:bg-gray-100',
      ghost: 'bg-transparent active:bg-gray-100',
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-12 px-8',
    };

    const textColorClasses = {
      default: 'text-white',
      outline: 'text-gray-900',
      ghost: 'text-gray-900',
    };

    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          'rounded-md items-center justify-center',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text className={cn('font-medium', textColorClasses[variant])}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);
Button.displayName = 'Button';

export { Button };
