import * as React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { useColorScheme } from '@/lib/color-scheme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<View, CardProps>(
  ({ className, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    return (
      <View
        ref={ref}
        className={cn(
          'rounded-lg border shadow-sm',
          isDark 
            ? 'border-[#3a3f4b] bg-[#242830]' 
            : 'border-gray-200 bg-white',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<Text, CardTitleProps>(
  ({ className, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    return (
      <Text
        ref={ref}
        className={cn(
          'text-2xl font-semibold leading-none tracking-tight',
          isDark ? 'text-white' : 'text-gray-900',
          className
        )}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    return (
      <Text 
        ref={ref} 
        className={cn(
          'text-sm',
          isDark ? 'text-gray-400' : 'text-gray-500',
          className
        )} 
        {...props} 
      />
    );
  }
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<View, CardContentProps>(
  ({ className, ...props }, ref) => <View ref={ref} className={cn('p-6', className)} {...props} />
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
