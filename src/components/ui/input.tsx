import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';
import { useColorScheme } from '@/lib/color-scheme';

interface InputProps extends TextInputProps {
  className?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(({ className, ...props }, ref) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <TextInput
      ref={ref}
      className={cn(
        'h-10 w-full rounded-md border px-3 py-2 text-sm',
        isDark 
          ? 'border-[#3a3f4b] bg-[#242830] text-white' 
          : 'border-gray-300 bg-white text-gray-900',
        className
      )}
      placeholderTextColor={isDark ? '#6b7280' : '#9CA3AF'}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
