import { ContactFormCTA } from '@/shared';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import React from 'react';

type ButtonProps = React.ComponentProps<typeof Button>;

interface ContactCTAButtonProps extends Omit<ButtonProps, 'children' | 'onPress'> {
  label?: string;
  modalTitle?: string;
  action?: string;
  onSuccess?: () => void;
  ctaVariant?: 'accent' | 'secondary';
}

const ContactCTAButton: React.FC<ContactCTAButtonProps> = ({
  label = 'Связаться с нами',
  modalTitle = 'Оставить заявку',
  action,
  onSuccess,
  ctaVariant = 'accent',
  ...buttonProps
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const variantClass =
    ctaVariant === 'accent'
      ? 'bg-[var(--secondary-color)] text-white'
      : 'border-1 border-[var(--secondary-color)] bg-transparent text-[var(--secondary-color)]';

  return (
    <>
      <Button
        onPress={onOpen}
        className={`${variantClass} ${buttonProps.className ?? ''}`}
        {...buttonProps}>
        {label}
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
          <ModalContent className='p-2'>
            <ModalHeader className='flex flex-col gap-1'>{modalTitle}</ModalHeader>
            <ModalBody>
              <ContactFormCTA action={action} onSuccess={onSuccess} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ContactCTAButton;
