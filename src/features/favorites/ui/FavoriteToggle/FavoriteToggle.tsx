import { type FC } from 'react';
import clsx from 'clsx';
import styles from './FavoriteToggle.module.css';
import iconHeart from '../../../../shared/assets/icons/ui/icon_heart.svg';
import iconHeartClicked from '../../../../shared/assets/icons/ui/icon_heart_clicked.svg';

export interface LikeIconProps {
  isActive?: boolean;
  likesCount?: number;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export const LikeIcon: FC<LikeIconProps> = ({
  isActive = false,
  likesCount = 0,
  onClick,
  className,
  'aria-label': ariaLabel = 'Добавить в избранное',
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.likeButton, className, isActive && styles.active)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={styles.likesCount}>{likesCount}</span>
      <img
        src={isActive ? iconHeartClicked : iconHeart}
        alt={isActive ? 'Убрать из избранного' : 'Добавить в избранное'}
        className={styles.heartIcon}
      />
    </button>
  );
};

export interface FavoriteToggleProps {
  isActive?: boolean;
  likesCount?: number;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export const FavoriteToggle: FC<FavoriteToggleProps> = ({
  isActive = false,
  likesCount = 0,
  onClick,
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <LikeIcon
      isActive={isActive}
      likesCount={likesCount}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    />
  );
};
