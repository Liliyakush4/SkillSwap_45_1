import { type FC, type ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title?: string;
  text?: string;
  className?: string;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, icon, title, text, className }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose} data-testid='modal-overlay'>
      <div
        className={`${styles.modal} ${className || ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Первый блок: иконка */}
        <div className={styles.iconBlock}>
          {icon}
        </div>

        {/* Второй блок: заголовок, текст и кнопка */}
        <div className={styles.contentBlock}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {text && <p className={styles.text}>{text}</p>}
          <button
            className={styles.closeButton} /*пока ставлю такой стиль, т.к. не готовы кнопки и если что поправлю */
            type="button"
            onClick={onClose}
            data-testid='modal-close-button'
          >
            Готово
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};