import type { UserCardProps, SkillBadge } from './UserCard.types';
import styles from './UserCard.module.css';
import { Card } from '@shared/ui/Card';
import { Avatar } from '@shared/ui/Avatar'; // Компонент для отображения аватара с плейсхолдером

import clsx from 'clsx';

export const UserCard: React.FC<UserCardProps> = ({
  avatarSrc,
  name,
  city,
  age,
  skillsOffered,
  skillsWanted,
  about,
  showLike = true,
  onLikeClick,
  isLiked = false,
  onMore,
  moreLabel = 'Подробнее',
  className,
}) => {
  const renderSkills = (skills: SkillBadge[]) => {
    if (skills.length === 0) {
      return <div className={styles.noSkills}>Нет навыков</div>;
    }
    return skills.map((skill, _) => (
      <span className={styles.skillBadge} key={skill.id}>
        {skill.text}
      </span>
    ));
  };

  return (
    <Card className={clsx(styles.userCard, className)}>
      <div className={styles.avatarContainer}>
        <Avatar src={avatarSrc} alt={`Аватар пользователя ${name}`} />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.cityAge}>
          {city}, {age}
        </div>
      </div>
      <div className={styles.skillsSection}>
        <div>
          Может научить:
          {renderSkills(skillsOffered)}
        </div>
        <div>
          Хочет научиться:
          {renderSkills(skillsWanted)}
        </div>
      </div>
      {about && <div className={styles.about}>{about}</div>}
      <div className={styles.actions}>
        {showLike && (
          <button
            type="button"
            className={styles.likeButton}
            onClick={onLikeClick}
            aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            {isLiked ? '♡' : '♡'}
          </button>
        )}
        {onMore && (
          <button type="button" className={styles.moreButton} onClick={onMore}>
            {moreLabel}
          </button>
        )}
      </div>
    </Card>
  );
};
