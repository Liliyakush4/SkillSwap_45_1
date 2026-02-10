import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css';
import CloseIcon from '../../../shared/assets/icons/ui/icon_close.svg';
import logo from '../../../shared/assets/images/common/header_logo.svg';

export const AuthLayout = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <img src={logo} alt="SkillSwap Logo" className={styles.logoImg} />
            SkillSwap
          </div>
          <button
            type="button"
            aria-label="Закрыть"
            className={styles.closeButton}
            onClick={handleClose}
          >
            Закрыть
            <img src={CloseIcon} alt="" aria-hidden="true" className={styles.icon} />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
