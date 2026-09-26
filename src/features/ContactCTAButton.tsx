import { ContactFormCTA } from "@/shared";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React from "react";

type ButtonProps = React.ComponentProps<typeof Button>;

interface ContactCTAButtonProps
  extends Omit<ButtonProps, "children" | "onPress"> {
  label?: string;
  modalTitle?: string;
  action?: string;
  onSuccess?: () => void;
  formButtonLabel?: string;
  showMessageField?: boolean;
  ctaVariant?: "accent" | "secondary";
}

const ContactCTAButton: React.FC<ContactCTAButtonProps> = ({
  label = "Связаться с нами",
  modalTitle = "Оставить заявку",
  formButtonLabel = "Отправить заявку",
  showMessageField = false,
  action,
  onSuccess,
  ctaVariant = "accent",
  className,
  ...buttonProps
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const variantClass =
    ctaVariant === "accent"
      ? "bg-brand-700 text-white font-bold rounded-full shadow-glow data-[hover=true]:!opacity-100 hover:bg-[#0a6f7a]"
      : "border-1 border-line bg-white text-ink font-bold rounded-full hover:border-brand-700 hover:text-brand-700";

  return (
    <>
      <Button
        onPress={onOpen}
        {...buttonProps}
        className={`${variantClass} ${className ?? ""}`}
      >
        {label}
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent className="p-0 overflow-hidden rounded-[32px]">
            <div className="relative bg-brand-900 px-6 py-6 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-700 animate-breathe" />
              <ModalHeader className="relative flex flex-col gap-1 p-0 text-white text-2xl font-bold tracking-[-0.02em]">
                {modalTitle}
                <span className="text-sm font-medium text-white/70">
                  Перезвоним и ответим на вопросы
                </span>
              </ModalHeader>
            </div>
            <ModalBody className="p-6">
              <ContactFormCTA
                buttonLabel={formButtonLabel}
                showMessageField={showMessageField}
                action={action}
                onSuccess={onSuccess}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ContactCTAButton;
