import cls from './HeaderBase.module.css';
import { Logo } from '@shared/ui/Logo';

export const HeaderBase = () => {
  return (
    <div className={cls.base}>

      <Logo />

      <nav className={cls.nav}>
        <span className={cls.linkStub}>О проекте</span>

        <button type="button" className={cls.skillsButton}>
          Все навыки
        </button>
      </nav>


    </div>
  );
};
