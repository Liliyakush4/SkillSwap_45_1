export type SkillBadge = { id: number; text: string };

export interface UserCardProps {
  avatarSrc?: string;
  name: string;
  city: string;
  age?: number | string;
  skillsOffered: SkillBadge[];
  skillsWanted: SkillBadge[];
  about?: string;
  showLike?: boolean;
  likesCount?: number;
  onLikeClick?: () => void;
  isLiked?: boolean;
  onMore?: () => void;
  moreLabel?: string;
  className?: string;
}
