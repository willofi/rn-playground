import * as React from 'react';
import { View, Text } from 'react-native';

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
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<Text, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<View, CardContentProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
