import type { FC, ReactNode } from 'react';
import styles from './SkillPreviewModal.module.css';
import { Modal } from '@shared/ui/Modal';

export interface SkillPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export const SkillPreviewModal: FC<SkillPreviewModalProps> = ({
  isOpen,
  onClose,
  title = 'Ваше предложение',
  description = 'Пожалуйста, проверьте и подтвердите правильность данных',
  children,
  className = '',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`${styles.modal} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </Modal>
  );
};
