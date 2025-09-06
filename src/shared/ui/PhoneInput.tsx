'use client';

import { Input } from '@heroui/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
const InputMaskComponent = InputMask as any;

interface PhoneInputProps {
  control: Control<any>;
  name: string;
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ control, name, error }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputMaskComponent
          mask='+7 (999) 999-99-99'
          value={field.value || ''}
          onChange={field.onChange}>
          {(inputProps: any) => (
            <Input
              {...inputProps}
              label='Телефон'
              placeholder='+7 (999) 123-45-67'
              variant='bordered'
              isInvalid={!!error}
              errorMessage={error}
              classNames={{
                inputWrapper:
                  'focus-within:!border-[var(--secondary-color)] focus-within:!ring-1 focus-within:!ring-[var(--secondary-color)]',
              }}
            />
          )}
        </InputMaskComponent>
      )}
    />
  );
};
