import { type FC, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from '../../shared/ui/Popover';
import { Avatar } from '../../shared/ui/Avatar';
import styles from './ProfileMenu.module.css';
import clsx from 'clsx';
import IconExit from '../../shared/assets/icons/ui/icon_exit.svg';

interface ProfileMenuProps {
  avatarUrl?: string;
  userName?: string;
  profilePath: string;
  onLogoutClick?: () => void;
  className?: string;
  exitIconSrc?: string;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
  avatarUrl,
  userName,
  profilePath,
  onLogoutClick,
  className,
  exitIconSrc,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  const handleLogout = useCallback(() => {
    handleClose();
    onLogoutClick?.();
  }, [handleClose, onLogoutClick]);

  return (
    <div className={clsx(styles.profileMenu, className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="profile-menu"
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={styles.triggerButton}
      >
        <Avatar src={avatarUrl} alt="Профиль" />
        {userName && <span className={styles.userName}>{userName}</span>}
      </button>

      <Popover
        isOpen={isOpen}
        onClose={handleClose}
        anchorRef={triggerRef}
        placement="bottom-end"
        role="menu"
        className={styles.menu}
      >
        <div className={styles.menuContent} role="menu" id="profile-menu">
          {/* Личный кабинет */}
          <Link to={profilePath} role="menuitem" className={styles.menuItem} onClick={handleClose}>
            Личный кабинет
          </Link>

          {/* Выйти */}
          <div
            role="menuitem"
            tabIndex={0}
            className={styles.menuItem}
            onClick={handleLogout}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogout();
              }
            }}
          >
            <div className={styles.menuItemContent}>
              <span className={styles.menuItemText}>Выйти из аккаунта</span>
              <img
                src={exitIconSrc ?? IconExit}
                alt="иконка выйти"
                className={styles.menuItemIcon}
              />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};
