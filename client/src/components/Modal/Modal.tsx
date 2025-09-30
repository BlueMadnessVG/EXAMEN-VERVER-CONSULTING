import style from "./css/Modal.module.css";

import { useEffect, useRef, type ReactNode } from "react";
import { useModalContext } from "../../context/modal.context";
import { createPortal } from "react-dom";

const eventListener = "keydown";

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const ModalRef = useRef<HTMLDivElement>(null);
  const { state, setState } = useModalContext();

  const closeModal = () => setState(false);
  const modalRoot = document.getElementById("modal");

  const handleContextClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(false);
    };

    if (state) {
      document.addEventListener(eventListener, handleEsc);
    }

    return () => {
      document.removeEventListener(eventListener, handleEsc);
    };
  }, [state, setState]);

  if (!state || !modalRoot) return null;

  return createPortal(
    <div className={style.overlay} onClick={closeModal} ref={ModalRef}>
      <div className={style.modal} onClick={handleContextClick} ref={ModalRef}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
