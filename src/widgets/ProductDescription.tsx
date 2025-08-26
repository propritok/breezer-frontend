import React from 'react';

interface ProductDescriptionProps {
  description?: string;
  title?: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  title = 'Описание',
}) => {
  if (!description) {
    return null;
  }

  return (
    <div className='mb-10'>
      <h2 className='text-2xl font-bold mb-4'>{title}</h2>
      <div className='prose prose-gray max-w-none'>
        <p className='text-gray-700 leading-relaxed whitespace-pre-line'>{description}</p>
      </div>
    </div>
  );
};
