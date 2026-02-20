import cls from './HeaderBase.module.css';
import { Logo } from '@shared/ui/Logo';

export const HeaderBase = () => {
  return (
    <div className={cls.base}>
      <Logo />

      <nav className={cls.nav}>
        <span className={cls.about}>О проекте</span>

        <button type="button" className={cls.skillsButton}>
          <span>Все навыки</span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 15.935a2.52 2.52 0 0 1-1.781-.738L4.2 9.179a.696.696 0 0 1 0-.978.696.696 0 0 1 .978 0l6.018 6.018a1.136 1.136 0 0 0 1.606 0L18.821 8.2a.696.696 0 0 1 .978 0 .696.696 0 0 1 0 .978l-6.018 6.018a2.5 2.5 0 0 1-1.781.738"
              fill="currentColor"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};
