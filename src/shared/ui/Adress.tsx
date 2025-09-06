import React from "react";

interface AdressProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const Adress: React.FC<AdressProps> = ({ className = "" }) => {
  return <span className={className}>г. Москва</span>;
};

export default Adress;
