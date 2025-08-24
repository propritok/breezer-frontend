import { Card, CardBody, CardProps } from "@heroui/react";
import React from 'react';

interface CustomCardProps extends CardProps {
  hover?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  hover = false,
  className = '',
  ...props
}) => {
  const hoverClasses = hover
    ? 'transition-transform duration-200 hover:scale-105 hover:shadow-lg'
    : '';

  return (
    <Card className={`${hoverClasses} ${className}`} {...props}>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CustomCard;
