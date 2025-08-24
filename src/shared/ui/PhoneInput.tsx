import { Input } from "@heroui/react";
import { Controller, Control } from "react-hook-form";
import InputMask from "react-input-mask";
import React, { useState, useEffect } from "react";

interface PhoneInputProps {
  control: Control<any>;
  name: string;
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  control,
  name,
  error,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Не рендерим InputMask на сервере
  if (!mounted) {
    return (
      <Input
        label="Телефон"
        placeholder="+7 (999) 123-45-67"
        variant="bordered"
        disabled
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputMask
          mask="+7 (999) 999-99-99"
          value={field.value || ""}
          onChange={field.onChange}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              label="Телефон"
              placeholder="+7 (999) 123-45-67"
              variant="bordered"
              isInvalid={!!error}
              errorMessage={error}
            />
          )}
        </InputMask>
      )}
    />
  );
};
