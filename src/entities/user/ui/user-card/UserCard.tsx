import { useCallback } from 'react';
import clsx from 'clsx';
import type { UserCardProps, SkillBadge } from './UserCard.types';
import styles from './UserCard.module.css';
import { Card } from '@shared/ui/Card';
import { Avatar } from '@shared/ui/Avatar';
import { LikesCounter } from '@features/favorites/ui/LikesCounter';
import { SkillPlate } from '@shared/ui/skill-plate/SkillPlate';
import { Button } from '@shared/ui/Button';
import { getSkillColorVar } from '@shared/ui/skill-plate/utils/getSkillColorVar';

const SKILLS_VISIBLE_LIMIT = 2;

export const UserCard: React.FC<UserCardProps> = ({
  avatarSrc,
  name,
  city,
  age,
  skillsOffered,
  skillsWanted,
  about,
  showLike = true,
  likesCount,
  onLikeClick,
  isLiked = false,
  onMore,
  moreLabel = 'Подробнее',
  className,
  height = 'regular', // новый проп с дефолтным значением
}) => {
  const renderSkills = useCallback((skills: SkillBadge[]) => {
    if (skills.length === 0) {
      return <SkillPlate className={styles.emptySkill} variant="default" text="Нет навыков" />;
    }

    const visible = skills.slice(0, SKILLS_VISIBLE_LIMIT);
    const hiddenCount = skills.length - SKILLS_VISIBLE_LIMIT;

    return (
      <>
        {visible.map((skill) => (
          <SkillPlate
            key={skill.id}
            variant="default"
            text={skill.text}
            colorVar={getSkillColorVar(skill.categoryId)}
          />
        ))}

        {hiddenCount > 0 && <SkillPlate variant="count" text={`${hiddenCount}`} />}
      </>
    );
  }, []);

  return (
    <Card
      className={clsx(styles.userCard, className)}
      data-height={height} // data-атрибут для управления высотой
    >
      <div className={styles.header}>
        <Avatar src={avatarSrc} size={100} alt={`Аватар пользователя ${name}`} />
        <div className={styles.userInfo}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.cityAge}>{age === undefined ? `${city}` : `${city}, ${age}`}</div>
        </div>
        {showLike && (
          <LikesCounter
            showCount={likesCount !== undefined}
            isActive={isLiked}
            likesCount={likesCount}
            className={styles.favoriteToggle}
            onClick={onLikeClick}
            aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
          />
        )}
      </div>

      <div className={styles.skillsSection}>
        {about && !onMore && <div className={styles.about}>{about}</div>}
        <div className={styles.skill}>
          <h4 className={styles.skillsLabel}>Может научить:</h4>
          <div className={styles.skillsRow}>{renderSkills(skillsOffered)}</div>
        </div>
        <div className={styles.skill}>
          <h4 className={styles.skillsLabel}>Хочет научиться:</h4>
          <div className={styles.skillsRow}>{renderSkills(skillsWanted)}</div>
        </div>
      </div>

      {onMore && (
        <Button fullWidth={true} onClick={onMore}>
          {moreLabel}
        </Button>
      )}
    </Card>
  );
};
