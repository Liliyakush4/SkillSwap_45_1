import { Link } from 'react-router-dom';
import cls from './HeaderBase.module.css';

export const HeaderBase = () => {
  return (
    <div className={cls.base}>
      <Link to="/" className={cls.logo}>
        <div className={cls.logoIcon} />
        <span className={cls.logoText}>SkillSwap</span>
      </Link>

      <nav className={cls.nav}>
        <span className={cls.linkStub}>О проекте</span>

        <button type="button" className={cls.skillsButton}>
          Все навыки
        </button>
      </nav>
    </div>
  );
};
