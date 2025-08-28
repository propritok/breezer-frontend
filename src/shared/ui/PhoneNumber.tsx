import React from 'react';

interface PhoneNumberProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const normalizePhoneForTel = (raw: string): string => {
  return raw.replace(/\s|\(|\)|-|\./g, '');
};

const PhoneNumber: React.FC<PhoneNumberProps> = ({ className = '' }) => {
  const tel = process.env.NEXT_PUBLIC_TELEPHONE || '';
  const telHref = `tel:${normalizePhoneForTel(tel)}`;

  return (
    <a href={telHref} className={className}>
      {tel}
    </a>
  );
};

export default PhoneNumber;
