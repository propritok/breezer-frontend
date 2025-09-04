import React from "react";

interface AdressProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const Adress: React.FC<AdressProps> = ({ className = "" }) => {
  return <span className={className}>г. Москва, ул. Примерная, д. 123</span>;
};

export default Adress;
