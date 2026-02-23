import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';
import LoginBoardImage from '@shared/assets/images/auth/registration_lightbulb.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { AuthForm } from '@features/auth/ui/auth-form/AuthForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>С возвращением в SkillSwap!</h2>
      <p>Обменивайтесь знаниями и навыками с другими людьми</p>
    </div>
  );

  const handleLogin = (data: { email: string; password: string }) => {
    console.log('Login data:', data);
    navigate(from, { replace: true });
  };

  return (
    <>
      <h2 className={styles.title}>Вход</h2>
      <ContentSection
        main={
          <>
            <AuthForm mode="login" onSubmit={handleLogin} />
          </>
        }
        heroText={heroText}
        heroImage={<img src={LoginBoardImage} alt="Картинка" />}
      />
    </>
  );
};
