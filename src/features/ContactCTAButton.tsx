import { ContactFormCTA } from '@/shared';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import React from 'react';

type ButtonProps = React.ComponentProps<typeof Button>;

interface ContactCTAButtonProps extends Omit<ButtonProps, 'children' | 'onPress'> {
  label?: string;
  modalTitle?: string;
  action?: string;
  onSuccess?: () => void;
}

const ContactCTAButton: React.FC<ContactCTAButtonProps> = ({
  label = 'Связаться с нами',
  modalTitle = 'Оставить заявку',
  action,
  onSuccess,
  ...buttonProps
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className='bg-[var(--secondary-color)] text-white' {...buttonProps}>
        {label}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent className='p-2'>
          <ModalHeader className='flex flex-col gap-1'>{modalTitle}</ModalHeader>
          <ModalBody>
            <ContactFormCTA action={action} onSuccess={onSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactCTAButton;
