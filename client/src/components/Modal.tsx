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
  display: flex;
  flex-direction: column;
  z-index: 5;
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
  padding: 0px 40px;
  padding-bottom: 80px;
`;

const ModalContainer: React.FC<{ setOpen: (arg: boolean) => void }> = ({
  setOpen,
  children
}) => {
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={() => setOpen(false)} />
      <Modal>
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default ModalContainer;
