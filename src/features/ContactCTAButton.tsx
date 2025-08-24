import { ContactFormCTA } from '@/shared';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React, { useEffect, useState } from 'react';

type ButtonProps = React.ComponentProps<typeof Button>;

interface ContactCTAButtonProps extends Omit<ButtonProps, 'children' | 'onPress'> {
  label?: string;
  modalTitle?: string;
}

const ContactCTAButton: React.FC<ContactCTAButtonProps> = ({
  label = 'Связаться с нами',
  modalTitle = 'Оставить заявку',
  ...buttonProps
}) => {
  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Button
        onPress={mounted ? onOpen : undefined}
        className='bg-[#A0E7E5] text-white'
        disabled={!mounted}
        {...buttonProps}>
        {label}
      </Button>
      {mounted && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
          <ModalContent className='p-2'>
            <ModalHeader className='flex flex-col gap-1'>{modalTitle}</ModalHeader>
            <ModalBody>
              <ContactFormCTA />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ContactCTAButton;
