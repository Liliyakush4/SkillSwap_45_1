import type { Db } from '@shared/api/mock/normalize';
import type { User } from '@shared/api/mock/types';
import type {
  UserCardProps,
  CardHeight,
  SkillBadge,
} from '@entities/user/ui/user-card/UserCard.types';

export interface MapUserToUserCardOpts {
  about?: string;
  showAbout?: boolean;
  showLike?: boolean;
  likesCount?: number;
  isLiked?: boolean;
  onLikeClick?: () => void;
  onMore?: () => void;
  moreLabel?: string;
  height?: CardHeight;
  className?: string;
  exchangeOffered?: boolean; // Добавляем новый опциональный параметр
}

export const mapUserToUserCardProps = (
  db: Db,
  user: User,
  opts?: MapUserToUserCardOpts,
): UserCardProps & { id: number } => {
  const city = db.citiesById[user.cityId].name ?? '';
  const birth = new Date(user.birthDate);
  const today = new Date();
  let age: number | undefined;

  if (!isNaN(birth.getTime())) {
    age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 0) age = undefined;
  }

  const categoryColorMap = new Map<number, string>(
    db.categories.map((category) => [category.id, category.color]),
  );

  const mapSkillToBadge = (skillId: number): SkillBadge | null => {
    const skill = db.skillsById[skillId];
    if (!skill) return null;

    return {
      id: skill.id,
      text: skill.title,
      categoryId: skill.categoryId,
      colorVar: categoryColorMap.get(skill.categoryId),
    };
  };

  const skillsOffered: SkillBadge[] = user.skillsOfferedIds
    .map(mapSkillToBadge)
    .filter((skill): skill is SkillBadge => skill !== null);

  const skillsWanted: SkillBadge[] = user.skillsWantedIds
    .map(mapSkillToBadge)
    .filter((skill): skill is SkillBadge => skill !== null);

  const baseProps: UserCardProps = {
    avatarSrc: user.avatar,
    name: user.name,
    city,
    age,
    about: opts?.about ?? user.about,
    skillsOffered,
    skillsWanted,
  };

  const finalProps: UserCardProps = {
    ...baseProps,
    ...opts,
    // Явно добавляем exchangeOffered, если он есть в opts
    ...(opts?.exchangeOffered !== undefined ? { exchangeOffered: opts.exchangeOffered } : {}),
  };

  return {
    id: user.id,
    ...finalProps,
  };
};
