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
  ...buttonProps
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const variantClass =
    ctaVariant === "accent"
      ? "bg-[var(--secondary-color)] text-white"
      : "border-1 border-[var(--secondary-color)] bg-transparent text-[var(--secondary-color)]";

  return (
    <>
      <Button
        onPress={onOpen}
        className={`${variantClass} ${buttonProps.className ?? ""}`}
        {...buttonProps}
      >
        {label}
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent className="p-0 overflow-hidden rounded-lg">
            <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[#B8F0EE] px-6 py-4">
              <ModalHeader className="flex flex-col gap-1 p-0 text-white">
                {modalTitle}
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
