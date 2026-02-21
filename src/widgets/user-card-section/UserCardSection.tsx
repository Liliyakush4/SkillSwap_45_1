import React from 'react';
import styles from './UserCardSection.module.css';
import { UserCard, type UserCardProps } from '@entities/user/ui/user-card';
import { Button } from '@shared/ui/Button';

export interface UserCardSectionProps {
  title?: string;
  items: Array<UserCardProps & { id: string | number }>;
  variant?: 'row' | 'grid';
  limit?: number;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
  renderHeader?: boolean;
}

// Иконка стрелки > (оптимизированный SVG)
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" fill="none">
    <path
      fill="#253017"
      d="M.69 16a.685.685 0 0 1-.49-.203.696.696 0 0 1 0-.978l6.018-6.017a1.136 1.136 0 0 0 0-1.606L.2 1.179A.696.696 0 0 1 .2.2a.696.696 0 0 1 .978 0l6.017 6.017c.47.47.738 1.107.738 1.78 0 .675-.258 1.311-.738 1.782l-6.017 6.017a.725.725 0 0 1-.49.203Z"
    />
  </svg>
);

export const UserCardSection: React.FC<UserCardSectionProps> = ({
  title,
  items,
  variant = 'row',
  limit = 3,
  actionLabel = 'Смотреть все',
  onActionClick,
  className = '',
  renderHeader = true,
}) => {
  const displayedItems = variant === 'row' ? items.slice(0, limit) : items;

  return (
    <section className={`${styles.section} ${className}`}>
      {renderHeader && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {onActionClick && (
            <Button variant="ghost" onClick={onActionClick} className={styles.actionButton}>
              <span className={styles.buttonContent}>
                {actionLabel}
                <ArrowIcon />
              </span>
            </Button>
          )}
        </div>
      )}

      {displayedItems.length > 0 && (
        <div className={`${styles.cardList} ${variant === 'grid' ? styles.grid : styles.row}`}>
          {displayedItems.map(({ id, ...cardProps }) => (
            <UserCard key={id} {...cardProps} />
          ))}
        </div>
      )}
    </section>
  );
};
