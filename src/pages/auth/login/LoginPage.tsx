import styles from './LoginPage.module.css';
import LoginBoardImage from '@shared/assets/images/auth/registration_lightbulb.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { AuthForm } from '@features/auth/ui/auth-form/AuthForm';

export const LoginPage: React.FC = () => {
  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Добро пожаловать в SkillSwap!</h2>
      <p>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми</p>
    </div>
  );

  return (
    <>
      <ContentSection
        main={
          <>
            <AuthForm mode="login" onSubmit={(data) => console.log('Login data:', data)} />
          </>
        }
        heroText={heroText}
        heroImage={<img src={LoginBoardImage} alt="Картинка" />}
        className={styles.container}
      />
    </>
  );
};
