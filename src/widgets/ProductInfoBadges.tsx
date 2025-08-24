import { Card, CardBody } from "@heroui/react";
import React from "react";

export interface InfoBadgeItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface ProductInfoBadgesProps {
  items?: InfoBadgeItem[];
}

const defaultItems: InfoBadgeItem[] = [
  {
    icon: <span className="text-2xl">🛡️</span>,
    title: "Гарантия",
    subtitle: "2 года официальной поддержки",
  },
  {
    icon: <span className="text-2xl">💸</span>,
    title: "Выгода",
    subtitle: "Дешевле, чем на маркетплейсах",
  },
  {
    icon: <span className="text-2xl">🎯</span>,
    title: "Преимущества",
    subtitle: "Консультация, онлайн‑оплата, покраска",
  },
];

const ProductInfoBadges: React.FC<ProductInfoBadgesProps> = ({
  items = defaultItems,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <Card key={item.title}>
          <CardBody>
            <div className="flex items-center gap-3">
              {item.icon}
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-600">{item.subtitle}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ProductInfoBadges;
