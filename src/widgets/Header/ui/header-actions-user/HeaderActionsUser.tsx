import { IconButton } from '@shared/ui/icon-button';
import cls from './HeaderActionsUser.module.css';
import iconThemeDark from '@shared/assets/icons/ui/icon_theme_dark.svg';
import iconHeart from '@shared/assets/icons/ui/icon_heart.svg';
import iconBell from '@shared/assets/icons/common/icon_bell_nosize.svg';
import { Avatar } from '@shared/ui/Avatar';

export const HeaderActionsUser = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.buttonGroup}>
        <IconButton icon={<img src={iconThemeDark} alt="" />} aria-label="Темная тема" />

        <IconButton
          icon={<img src={iconBell} alt="" width={24} height={24} />}
          aria-label="Избранное"
        />

        <IconButton icon={<img src={iconHeart} alt="" />} aria-label="Избранное" />
      </div>
      <div className={cls.profile}>
        <button type="button" className={cls.profileButton} aria-label="Профиль">
          <span className={cls.name}>Иван</span>
          <Avatar />
        </button>
      </div>
    </div>
  );
};
