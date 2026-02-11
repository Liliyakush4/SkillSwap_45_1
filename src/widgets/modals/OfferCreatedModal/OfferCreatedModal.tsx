import { type FC } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import iconPerson from '../../../shared/assets/icons/common/icon_person_circle_nosize.svg';
import styles from './OfferCreatedModal.module.css';

export interface OfferCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfferCreatedModal: FC<OfferCreatedModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.modal}
      icon={
        <img
          src={iconPerson}
          alt=""
          aria-hidden="true"
          className={styles.icon}
        />
      }
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Ваше предложение создано</h2>

        <p className={styles.description}>
          Теперь вы можете предложить обмен
        </p>

        <div className={styles.buttonWrapper}>
          <Button fullWidth onClick={handleClose} className={styles.button}>
            Готово
          </Button>
        </div>
      </div>
    </Modal>
  );
};
