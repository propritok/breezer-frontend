import { Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react";
import React, { useState, useEffect } from 'react';

const Calculator: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    roomArea: '',
    roomType: 'bedroom',
    peopleCount: '',
    city: 'moscow',
  });

  const [result, setResult] = useState<{
    recommendedModel: string;
    estimatedPrice: string;
    installationPrice: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = () => {
    const area = parseFloat(formData.roomArea);
    const people = parseInt(formData.peopleCount);

    if (area && people) {
      let model = '';
      let basePrice = 0;

      if (area <= 20) {
        model = 'Бризер Ballu Air Master';
        basePrice = 35000;
      } else if (area <= 40) {
        model = 'Бризер Tion O2';
        basePrice = 45000;
      } else {
        model = 'Бризер Vakio Base';
        basePrice = 55000;
      }

      const installationPrice = 15000;

      setResult({
        recommendedModel: model,
        estimatedPrice: `${basePrice.toLocaleString()} ₽`,
        installationPrice: `${installationPrice.toLocaleString()} ₽`,
      });
    }
  };

  // Не рендерим интерактивные элементы на сервере
  if (!mounted) {
    return (
      <Card>
        <CardBody>
          <h3 className='text-xl font-semibold mb-4'>Калькулятор бризера</h3>
          <div className='space-y-4'>
            <Input
              label='Площадь помещения (м²)'
              placeholder='20'
              variant='bordered'
              type='number'
              disabled
            />
            <Select
              label='Тип помещения'
              variant='bordered'
              disabled
            >
              <SelectItem key='bedroom'>
                Спальня
              </SelectItem>
            </Select>
            <Input
              label='Количество человек'
              placeholder='2'
              variant='bordered'
              type='number'
              disabled
            />
            <Select
              label='Город'
              variant='bordered'
              disabled
            >
              <SelectItem key='moscow'>
                Москва
              </SelectItem>
            </Select>
            <Button color='primary' className='w-full bg-[#A0E7E5] text-white' disabled>
              Рассчитать
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <h3 className='text-xl font-semibold mb-4'>Калькулятор бризера</h3>

        <div className='space-y-4'>
          <Input
            label='Площадь помещения (м²)'
            placeholder='20'
            variant='bordered'
            type='number'
            value={formData.roomArea}
            onChange={(e) => setFormData((prev) => ({ ...prev, roomArea: e.target.value }))}
          />

          <Select
            label='Тип помещения'
            variant='bordered'
            selectedKeys={[formData.roomType]}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setFormData((prev) => ({ ...prev, roomType: selectedKey }));
            }}>
            <SelectItem key='bedroom'>
              Спальня
            </SelectItem>
            <SelectItem key='living'>
              Гостиная
            </SelectItem>
            <SelectItem key='kitchen'>
              Кухня
            </SelectItem>
            <SelectItem key='office'>
              Офис
            </SelectItem>
          </Select>

          <Input
            label='Количество человек'
            placeholder='2'
            variant='bordered'
            type='number'
            value={formData.peopleCount}
            onChange={(e) => setFormData((prev) => ({ ...prev, peopleCount: e.target.value }))}
          />

          <Select
            label='Город'
            variant='bordered'
            selectedKeys={[formData.city]}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setFormData((prev) => ({ ...prev, city: selectedKey }));
            }}>
            <SelectItem key='moscow'>
              Москва
            </SelectItem>
            <SelectItem key='spb'>
              Санкт-Петербург
            </SelectItem>
            <SelectItem key='other'>
              Другой город
            </SelectItem>
          </Select>

          <Button
            color='primary'
            className='w-full bg-[#A0E7E5] text-white'
            onPress={handleCalculate}>
            Рассчитать
          </Button>

          {result && (
            <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
              <h4 className='font-semibold mb-2'>Результат расчета:</h4>
              <div className='space-y-2'>
                <div>
                  <span className='text-gray-600'>Рекомендуемая модель:</span>
                  <span className='ml-2 font-medium'>{result.recommendedModel}</span>
                </div>
                <div>
                  <span className='text-gray-600'>Стоимость бризера:</span>
                  <span className='ml-2 font-medium'>{result.estimatedPrice}</span>
                </div>
                <div>
                  <span className='text-gray-600'>Стоимость установки:</span>
                  <span className='ml-2 font-medium'>{result.installationPrice}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Calculator;
