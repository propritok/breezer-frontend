import React from "react";

interface ProductPurchaseSectionProps {
  price?: string | number;
  children?: React.ReactNode;
}

const ProductPurchaseSection: React.FC<ProductPurchaseSectionProps> = ({
  price,
  children,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl font-bold text-[#0f766e]">{price}</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{children}</div>
    </div>
  );
};

export default ProductPurchaseSection;
