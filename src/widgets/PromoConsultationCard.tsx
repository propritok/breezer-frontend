import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import React from "react";

interface PromoConsultationCardProps {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaText?: string;
}

const PromoConsultationCard: React.FC<PromoConsultationCardProps> = ({
  title = "Подберите прибор под ваши задачи",
  subtitle = "Скидка 5% при заказе с консультацией",
  ctaHref = "/catalog",
  ctaText = "Перейти к подбору",
}) => {
  return (
    <Card className="bg-gradient-to-r from-[#A0E7E5] to-[#B8F0EE]">
      <CardBody>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white text-xl font-semibold mb-1">{title}</div>
            <div className="text-white/90">{subtitle}</div>
          </div>
          <Button as={Link} href={ctaHref} className="bg-white text-[#0f766e] font-semibold">
            {ctaText}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PromoConsultationCard;


