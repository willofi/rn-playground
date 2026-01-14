import * as React from 'react';
import { View, Text, Image, ImageProps } from 'react-native';

interface AvatarProps {
  className?: string;
  children: React.ReactNode;
}

interface AvatarImageProps extends ImageProps {
  className?: string;
}

interface AvatarFallbackProps {
  className?: string;
  children: React.ReactNode;
}

const Avatar = React.forwardRef<View, AvatarProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <Image
      ref={ref}
      className={`aspect-square h-full w-full ${className}`}
      {...props}
    />
  )
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => (
    <View
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}
      {...props}
    >
      <Text className="text-sm font-medium text-gray-700">{children}</Text>
    </View>
  )
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
