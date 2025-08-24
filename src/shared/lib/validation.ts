// Валидация форм

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validatePrice = (price: number): boolean => {
  return price > 0 && price < 1000000;
};

export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      if (!validateRequired(value)) return 'Email обязателен';
      if (!validateEmail(value)) return 'Введите корректный email';
      break;
    case 'phone':
      if (!validateRequired(value)) return 'Телефон обязателен';
      if (!validatePhone(value)) return 'Введите корректный номер телефона';
      break;
    case 'name':
      if (!validateRequired(value)) return 'Имя обязательно';
      if (!validateMinLength(value, 2)) return 'Имя должно содержать минимум 2 символа';
      break;
    case 'message':
      if (!validateRequired(value)) return 'Сообщение обязательно';
      if (!validateMinLength(value, 10)) return 'Сообщение должно содержать минимум 10 символов';
      break;
    default:
      return null;
  }
  return null;
};
