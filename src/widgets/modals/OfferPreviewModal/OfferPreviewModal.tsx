import React from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { Button } from '../../../shared/ui/Button/Button';
import PersonCircleIcon from '../../../shared/assets/icons/common/icon_person_circle_nosize.svg';
import styles from './OfferPreviewModal.module.css';

export interface OfferPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferPreviewModal: React.FC<OfferPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <img
            src={PersonCircleIcon}
            alt=""
            aria-hidden="true"
            className={styles.icon}
          />
        </div>

        <h2 className={styles.title}>Ваше предложение создано</h2>

        <p className={styles.description}>
          Теперь вы можете предложить обмен
        </p>

        <div className={styles.buttonWrapper}>
          <Button fullWidth onClick={handleClose}>
            Готово
          </Button>
        </div>
      </div>
    </Modal>
  );
};

