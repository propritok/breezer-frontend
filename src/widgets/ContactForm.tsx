import { PhoneInput } from '@/shared/ui/PhoneInput';
import { Button, Card, CardBody, Input, Textarea } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ✅ схема валидации через zod
const contactFormSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z
    .string()
    .regex(
      /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
      'Введите телефон в формате +7 (999) 123-45-67',
    ),
  email: z.string().email('Некорректный email'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
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

  return (
    <Card>
      <CardBody>
        <h3 className='text-xl font-semibold mb-4'>Оставить заявку</h3>
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

          <Input
            {...register('email')}
            label='Email'
            placeholder='example@mail.com'
            type='email'
            variant='bordered'
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Textarea
            {...register('message')}
            label='Сообщение'
            placeholder='Опишите ваши потребности'
            variant='bordered'
            minRows={3}
            isInvalid={!!errors.message}
            errorMessage={errors.message?.message}
          />

          <Button type='submit' color='primary' className='w-full bg-[#A0E7E5] text-white'>
            Отправить заявку
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ContactForm;
