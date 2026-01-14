import * as React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

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
      sm: 'h-8 px-3 text-sm',
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
        className={`rounded-md items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <Text className={`font-medium ${textColorClasses[variant]}`}>{children}</Text>
      </TouchableOpacity>
    );
  }
);
Button.displayName = 'Button';

export { Button };
