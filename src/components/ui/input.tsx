import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
  className?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
        className
      )}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
