// При натисканні на цю кнопку має відкриватись модальне вікно Modal з формою NoteForm. Компонент Modal має створювати DOM-елемент наступної структури:

// <div
//   className={css.backdrop}
//   role="dialog"
//   aria-modal="true"
// >
//   <div className={css.modal}>
//     {/* */}
//   </div>
// </div>

// Модальне вікно має створюватись через createPortal, щоб рендерити модалку поза межами основного дерева компонентів, та закриватися при кліку на бекдроп і натисканням на клавішу Escape.
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';

interface ModalProps {
  onClose: () => void;
  //   children: React.ReactNode;
}

export default function Modal({ onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {/* <button
          className={css.closeButton}
          
          aria-label="Close modal"
        >
          &times;
        </button> */}
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}
