import { Button, Card, CardBody, Input, Select, SelectItem, Textarea } from '@heroui/react';
import React, { useState } from 'react';

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    installation: 'yes',
    address: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки заказа
    console.log('Order submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardBody>
        <h3 className='text-xl font-semibold mb-4'>Оформить заказ</h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            label='Имя'
            placeholder='Введите ваше имя'
            variant='bordered'
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />

          <Input
            label='Телефон'
            placeholder='+7 (999) 123-45-67'
            variant='bordered'
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />

          <Input
            label='Email'
            placeholder='example@mail.com'
            variant='bordered'
            type='email'
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />

          <Select
            label='Выберите бризер'
            placeholder='Выберите модель'
            variant='bordered'
            value={formData.product}
            onChange={(e) => handleChange('product', e.target.value)}
            required>
            <SelectItem key='tion'>Бризер Tion</SelectItem>
            <SelectItem key='ballu'>Бризер Ballu</SelectItem>
            <SelectItem key='vakio'>Бризер Vakio</SelectItem>
          </Select>

          <Select
            label='Нужна ли установка?'
            variant='bordered'
            value={formData.installation}
            onChange={(e) => handleChange('installation', e.target.value)}>
            <SelectItem key='yes'>Да, нужна установка</SelectItem>
            <SelectItem key='no'>Нет, только оборудование</SelectItem>
          </Select>

          <Input
            label='Адрес установки'
            placeholder='Введите адрес'
            variant='bordered'
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />

          <Textarea
            label='Дополнительная информация'
            placeholder='Укажите дополнительные требования'
            variant='bordered'
            minRows={3}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
          />

          <Button
            type='submit'
            color='primary'
            className='w-full bg-[var(--secondary-color)] text-white'>
            Отправить заказ
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default OrderForm;
