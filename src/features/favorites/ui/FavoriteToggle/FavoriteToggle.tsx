import { type FC } from 'react';
import clsx from 'clsx';
import styles from './FavoriteToggle.module.css';
import iconHeart from '../../../../shared/assets/icons/ui/icon_heart.svg';
import iconHeartClicked from '../../../../shared/assets/icons/ui/icon_heart_clicked.svg';

export interface FavoriteToggleProps {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export const FavoriteToggle: FC<FavoriteToggleProps> = ({
  isActive = false,
  onClick,
  className,
  'aria-label': ariaLabel = 'Добавить в избранное',
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.heartButton, className, isActive && styles.active)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <img
        src={isActive ? iconHeartClicked : iconHeart}
        alt={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
        className={styles.heartIcon}
      />
    </button>
  );
};
