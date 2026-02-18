import { FormSelectField } from '@shared/ui/form-select-field';
import React, { useState } from 'react';

const TestFormPage = () => {
  const [formData, setFormData] = useState({
    country: '',
    city: ''
  });

  const [errors, setErrors] = useState({
    country: '',
    city: ''
  });

  // Примеры данных для select
  const countries = [
    { value: 'ru', label: 'Россия' },
    { value: 'us', label: 'США' },
    { value: 'gb', label: 'Великобритания' },
    { value: 'de', label: 'Германия' },
    { value: 'fr', label: 'Франция' },
    { value: 'it', label: 'Италия' },
    { value: 'es', label: 'Испания' },
    { value: 'cn', label: 'Китай' },
    { value: 'jp', label: 'Япония' },
    { value: 'kr', label: 'Южная Корея' },
  ];

  const cities = [
    { value: 'msk', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'ekb', label: 'Екатеринбург', disabled: true },
    { value: 'nsk', label: 'Новосибирск' },
    { value: 'kzn', label: 'Казань' },
    { value: 'sochi', label: 'Сочи', disabled: true },
    { value: 'vld', label: 'Владивосток' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Простая валидация
    const newErrors = {
      country: !formData.country ? 'Выберите страну' : '',
      city: !formData.city ? 'Выберите город' : '',
    };
    
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      alert('Форма успешно отправлена!\n' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '40px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ marginBottom: '30px' }}>Тестирование FormSelectField</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Обычное поле */}
        <div style={{ marginBottom: '24px' }}>
          <FormSelectField
            label="Страна"
            placeholder="не указан"
            value={formData.country}
            onChange={(value) => setFormData({ ...formData, country: value })}
            options={countries}
            errorText={errors.country}
            name="country"
          />
        </div>

        {/* Поле с disabled опциями */}
        <div style={{ marginBottom: '24px' }}>
          <FormSelectField
            label="Город"
            placeholder='не указан'
            value={formData.city}
            onChange={(value) => setFormData({ ...formData, city: value })}
            options={cities}
            errorText={errors.city}
            name="city"
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            * Екатеринбург и Сочи отключены для выбора
          </div>
        </div>

        {/* Задизейбленное поле */}
        <div style={{ marginBottom: '24px' }}>
          <FormSelectField
            label="Заблокированное поле"
            placeholder="Это поле недоступно"
            value=""
            onChange={() => {}}
            options={countries}
            disabled={true}
            name="disabled"
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            * Поле полностью отключено
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestFormPage;