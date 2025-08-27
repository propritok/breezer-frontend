'use client';

import { handleCallbackForm } from '@/app/api/actions/send-email';
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PhoneInput } from './PhoneInput';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z
    .string()
    .regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, 'Введите телефон в формате +7 (999) 123-45-67'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormCTAProps {
  action?: string;
  onSuccess?: () => void;
}

const ContactFormCTA: React.FC<ContactFormCTAProps> = ({ action, onSuccess }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const result = await handleCallbackForm(
        { name: data.name, phone: data.phone },
        action || 'Хочет обратный звонок',
      );

      if (result?.success) {
        setIsSuccess(true);
        reset();
        onSuccess?.();
      } else {
        setIsError((result as any)?.message || 'Не удалось отправить заявку');
      }
    } catch (e) {
      setIsError('Ошибка отправки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input
        {...register('name')}
        label='Имя'
        placeholder='Введите ваше имя'
        variant='bordered'
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />

      <PhoneInput control={control} name='phone' error={errors.phone?.message} />

      <Button
        type='submit'
        isLoading={isLoading}
        color='primary'
        className='w-full bg-[#A0E7E5] text-white'>
        Отправить заявку
      </Button>

      {isSuccess && (
        <p className='text-success text-sm'>Заявка успешно отправлена. Мы свяжемся с вами.</p>
      )}
      {isError && <p className='text-danger text-sm'>Ошибка: {isError}</p>}
    </form>
  );
};

export default ContactFormCTA;
