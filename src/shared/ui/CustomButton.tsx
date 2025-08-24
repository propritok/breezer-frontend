import { Button, ButtonProps } from "@heroui/react";
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
        return 'bg-[#A0E7E5] text-white hover:bg-[#8DD8D6]';
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'outline':
        return 'border-2 border-[#A0E7E5] text-[#A0E7E5] hover:bg-[#A0E7E5] hover:text-white';
      default:
        return 'bg-[#A0E7E5] text-white hover:bg-[#8DD8D6]';
    }
  };

  return (
    <Button className={`${getVariantClasses()} ${className}`} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
