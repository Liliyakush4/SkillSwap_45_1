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
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    className={styles.modal}
  >
    <div className={styles.container}>
      <img
        src={iconPerson}
        alt=""
        aria-hidden="true"
        className={styles.icon}
      />
      <h2 className={styles.title}>Ваше предложение создано</h2>

      <p className={styles.description}>
        Теперь вы можете предложить обмен
      </p>

      <div className={styles.buttonWrapper}>
        <Button fullWidth onClick={onClose}>
          Готово
        </Button>
      </div>
    </div>
  </Modal>
);
