import { ReactNode, useRef, useState } from "react";
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#App');

export default function Modal({ children }: {
  children: ReactNode | ReactNode[]
}) {
  const subtitle = useRef<null | HTMLElement>(null)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if(subtitle.current?.style)
      subtitle.current.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={""}
      >
        <h2 ref={(_subtitle) => (subtitle.current = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        {children}
      </ReactModal>
    </div>
  );
}