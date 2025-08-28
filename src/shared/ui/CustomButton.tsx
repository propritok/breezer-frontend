import { Button, ButtonProps } from '@heroui/react';
import React from 'react';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[var(--secondary-color)] text-white hover:bg-[#8DD8D6]';
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'outline':
        return 'border-2 border-[var(--secondary-color)] text-[var(--secondary-color)] hover:bg-[var(--secondary-color)] hover:text-white';
      default:
        return 'bg-[var(--secondary-color)] text-white hover:bg-[#8DD8D6]';
    }
  };

  return (
    <Button className={`${getVariantClasses()} ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
