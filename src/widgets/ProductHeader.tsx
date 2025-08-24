import React from "react";

interface ProductHeaderProps {
  title?: string;
  rating?: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ title, rating = 0 }) => {
  const full = Math.round(rating || 0);
  const stars = new Array(5).fill(0).map((_, i) => (
    <span key={i} className={i < full ? "text-yellow-400" : "text-gray-300"}>
      ★
    </span>
  ));

  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex text-lg leading-none">{stars}</div>
        <span className="text-sm text-gray-500">{rating.toFixed(1)} / 5</span>
      </div>
    </>
  );
};

export default ProductHeader;
