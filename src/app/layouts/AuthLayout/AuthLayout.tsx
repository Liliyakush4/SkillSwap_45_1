import { Outlet, useNavigate } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export const AuthLayout = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        aria-label="Закрыть"
        className={styles.closeButton}
        onClick={handleClose}
      >
        Закрыть
      </button>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
