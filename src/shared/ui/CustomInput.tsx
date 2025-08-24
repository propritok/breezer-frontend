import { Input, InputProps } from "@heroui/react";
import React from 'react';

interface CustomInputProps extends InputProps {
  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ error, className = '', ...props }) => {
  return (
    <div className='w-full'>
      <Input className={`${className} ${error ? 'border-red-500' : ''}`} {...props} />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default CustomInput;
