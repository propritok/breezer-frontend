import { Chip } from "@heroui/react";
import React from "react";

interface ProductStatusChipsProps {
  inStock?: boolean;
}

const ProductStatusChips: React.FC<ProductStatusChipsProps> = ({ inStock }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {inStock ? (
        <Chip color="success" variant="flat">
          В наличии
        </Chip>
      ) : (
        <Chip color="warning" variant="flat">
          Ожидается
        </Chip>
      )}
    </div>
  );
};

export default ProductStatusChips;
