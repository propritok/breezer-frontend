'use client';

import { Button, Checkbox, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import LoadingSpinner from './LoadingSpinner';
import { PhoneInput } from './PhoneInput';
import PhoneNumber from './PhoneNumber';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  message: z.string().optional(),
  phone: z.string().min(11, 'Обязательное поле'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormCTAProps {
  action?: string;
  showMessageField?: boolean | number;
  buttonLabel?: string;
  onSuccess?: () => void;
}

const ContactFormCTA: React.FC<ContactFormCTAProps> = ({
  action,
  showMessageField = false,
  buttonLabel = 'Отправить заявку',
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', phone: '', message: '', privacyConsent: true },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message,
          action: action || 'Хочет обратный звонок',
        }),
      });

      const result = await response.json();

      if (result?.success) {
        setIsSuccess(true);
        reset();
        onSuccess?.();
      } else {
        setIsError(result?.message || 'Не удалось отправить заявку');
      }
    } catch (e) {
      setIsError('Ошибка отправки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <div className='space-y-4'>
        <Input
          {...register('name')}
          label='Имя'
          placeholder='Введите ваше имя'
          variant='bordered'
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          classNames={{
            inputWrapper:
              'focus-within:!border-[var(--secondary-color)] focus-within:!ring-1 focus-within:!ring-[var(--secondary-color)]',
          }}
        />

        <PhoneInput control={control} name='phone' error={errors.phone?.message} />

        {showMessageField && (
          <Textarea
            {...register('message')}
            label='Сообщение'
            placeholder='Введите текст сообщения'
            variant='bordered'
            minRows={showMessageField ? (showMessageField as number) : 3}
            classNames={{
              inputWrapper:
                'focus-within:!border-[var(--secondary-color)] focus-within:!ring-1 focus-within:!ring-[var(--secondary-color)]',
            }}
          />
        )}

        <Checkbox
          {...register('privacyConsent')}
          color='secondary'
          isInvalid={!!errors.privacyConsent}
          defaultSelected={true}
          className='mb-4'></Checkbox>
        <span className='text-sm text-gray-700'>
          Я согласен на{' '}
          <a
            href='/privacy'
            target='_blank'
            rel='noopener noreferrer'
            className='  underline text-[var(--secondary-color)]'>
            обработку персональных данных
          </a>
        </span>

        {errors.privacyConsent && (
          <p className='text-red-500 text-sm mb-2'>{errors.privacyConsent.message}</p>
        )}

        <Button
          type='submit'
          color='primary'
          size='lg'
          className='w-full bg-[var(--secondary-color)] text-white'>
          {buttonLabel}
        </Button>
      </div>

      {(isLoading || isSuccess || isError) && (
        <div className='absolute inset-0 z-20 flex items-center justify-center bg-white'>
          {isLoading && (
            <div className='flex flex-col items-center gap-3'>
              <LoadingSpinner size='lg' />
            </div>
          )}

          {isSuccess && (
            <div className='text-center px-6 py-8'>
              <p className='text-xl font-semibold text-[var(--secondary-color)] mb-2'>
                Заявка успешно отправлена!
              </p>
              <p className='text-gray-700'>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          )}

          {isError && (
            <div className='text-center px-6 py-8 max-w-md'>
              <p className='text-base mb-3'>Произошла ошибка. Свяжитесь с нами по телефону:</p>
              <PhoneNumber className='text-xl font-bold text-[var(--secondary-color)]' />
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default ContactFormCTA;
