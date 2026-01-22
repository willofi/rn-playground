import { useColorScheme } from '@/lib/color-scheme';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const variantClasses = {
      default: 'bg-blue-600 active:bg-blue-700',
      outline: isDark
        ? 'border border-[#3a3f4b] bg-transparent active:bg-[#2a2d35]'
        : 'border border-gray-300 bg-transparent active:bg-gray-100',
      ghost: isDark ? 'bg-transparent active:bg-[#2a2d35]' : 'bg-transparent active:bg-gray-100',
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3',
      lg: 'h-12 px-8',
    };

    // 텍스트 색상을 variant와 다크모드에 따라 결정
    const getTextColor = () => {
      if (variant === 'default') {
        return 'text-white'; // default 버튼은 항상 흰색 텍스트
      }
      // outline과 ghost는 다크모드에 따라 색상 변경
      return isDark ? 'text-white' : 'text-gray-900';
    };

    // children을 재귀적으로 처리하여 Text 컴포넌트의 색상을 수정
    const processChildren = (child: React.ReactNode): React.ReactNode => {
      if (React.isValidElement(child)) {
        // Text 컴포넌트인 경우
        if (child.type === Text) {
          // 기존 className이 있다면 텍스트 색상을 제거하고 새로운 색상 추가
          const existingClassName = child.props.className || '';
          const classNameWithoutColor = existingClassName
            .split(' ')
            .filter((cls: string) => !cls.startsWith('text-'))
            .join(' ');

          return React.cloneElement(child, {
            ...child.props,
            className: cn(classNameWithoutColor, 'font-medium', getTextColor()),
          } as any);
        }
        // 다른 컴포넌트의 children도 재귀적으로 처리
        if (child.props.children) {
          return React.cloneElement(child, {
            ...child.props,
            children: React.Children.map(child.props.children, processChildren),
          } as any);
        }
      }
      return child;
    };

    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          'items-center justify-center rounded-md',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}>
        {typeof children === 'string' ? (
          <Text className={cn('font-medium', getTextColor())}>{children}</Text>
        ) : (
          React.Children.map(children, processChildren)
        )}
      </TouchableOpacity>
    );
  }
);
Button.displayName = 'Button';

export { Button };
