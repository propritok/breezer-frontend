import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'var(--secondary-color)',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className='flex justify-center items-center'>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-[var(--secondary-color)] rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default LoadingSpinner;
