import { type FC } from 'react';
import clsx from 'clsx';
import { FavoriteToggle } from '../FavoriteToggle';
import styles from './LikesCounter.module.css';

export interface LikesCounterProps {
  isActive?: boolean;
  likesCount?: number;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export const LikesCounter: FC<LikesCounterProps> = ({
  isActive = false,
  likesCount = 0,
  onClick,
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <div className={clsx(styles.likesContainer, className)}>
      <span className={clsx(styles.likesCount, isActive && styles.active)}>
        {likesCount}
      </span>
      <FavoriteToggle
        isActive={isActive}
        onClick={onClick}
        aria-label={ariaLabel || 'Добавить в избранное'}
      />
    </div>
  );
};
