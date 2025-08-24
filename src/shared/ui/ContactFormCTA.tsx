import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from "@heroui/react";
import React, { useEffect, useState } from 'react';
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

const ContactFormCTA: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('✅ Form submitted:', data);
  };

  // Не рендерим форму на сервере
  if (!mounted) {
    return (
      <div className='space-y-4'>
        <Input label='Имя' placeholder='Введите ваше имя' variant='bordered' disabled />
        <Input label='Телефон' placeholder='+7 (999) 123-45-67' variant='bordered' disabled />
        <Button type='submit' color='primary' className='w-full bg-[#A0E7E5] text-white' disabled>
          Отправить заявку
        </Button>
      </div>
    );
  }

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

      <Button type='submit' color='primary' className='w-full bg-[#A0E7E5] text-white'>
        Отправить заявку
      </Button>
    </form>
  );
};

export default ContactFormCTA;
