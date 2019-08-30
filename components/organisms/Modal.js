import React, { useEffect } from 'react';
import { Card } from 'rebass';
import noScroll from 'no-scroll';
import styled from 'styled-components';
import { Close } from '../molecules';
import { Overlay } from '../base';

const ModalBase = ({ open, onClose, children, ...props }) => {
  const onKeyDown = e => {
    if (e.keyCode === 27) {
      onClose(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, []);

  useEffect(() => {
    if (open) {
      noScroll.on();
    } else {
      noScroll.off();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Overlay>
      <Card {...props} variant="white" borderRadius={3} p={4}>
        <Close width={30} height={30} onClick={onClose} position="absolute" top={8} right={12} />
        {children}
      </Card>
    </Overlay>
  );
};

const Modal = styled(ModalBase)`
  max-width: 100%;
  position: relative;
`;

export default Modal;
