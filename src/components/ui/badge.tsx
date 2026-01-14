import * as React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'success' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

const Badge = React.forwardRef<View, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-blue-600',
      secondary: 'bg-gray-200',
      success: 'bg-green-600',
      destructive: 'bg-red-600',
    };

    const textColorClasses = {
      default: 'text-white',
      secondary: 'text-gray-900',
      success: 'text-white',
      destructive: 'text-white',
    };

    return (
      <View
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        <Text className={`text-xs font-semibold ${textColorClasses[variant]}`}>
          {children}
        </Text>
      </View>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
