import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Modal = styled.div`
  background-color: white;
  max-width: 400px;
  width: 80%;
  position: fixed;
  left: calc(50vw - 0.4 * 400px);
  top: calc(30vh);
  margin: 0 auto;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  z-index: 5;
  box-shadow: 0px 9px 13px -8px rgba(0, 0, 0, 0.75);
`;

const ModalShadow = styled.div`
  position: fixed;
  top: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

const ModalContent = styled.div`
  overflow: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ModalContainer: React.FC<{
  open: boolean;
  setOpen: (arg: boolean) => void;
}> = ({ open, setOpen, children }) => {
  if (!open) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={() => setOpen(false)} />
      <Modal className="modal">
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default ModalContainer;
