import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/storeHooks';
import { saveStep1 } from '@features/auth/model/registrationSlice';
import styles from './RegisterStep1Page.module.css';
import RegistrBoardImage from '@shared/assets/images/auth/registration_lightbulb.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { AuthForm } from '@features/auth/ui/auth-form/AuthForm';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';
import type { AuthFormData } from '@features/auth/ui/auth-form/AuthForm';

export const RegisterStep1Page: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Добро пожаловать в SkillSwap!</h2>
      <p>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми</p>
    </div>
  );

  const handleSubmit = (data: AuthFormData) => {
    console.log('Register data:', data);

    dispatch(
      saveStep1({
        email: data.email,
        password: data.password,
      }),
    );

    navigate('/auth/register/step-2');
  };

  return (
    <>
      <StepProgress currentStep={1} totalSteps={3} className={styles.stepProgress} />
      <ContentSection
        main={
          <>
            <AuthForm mode="register" onSubmit={handleSubmit} />
          </>
        }
        heroText={heroText}
        heroImage={<img src={RegistrBoardImage} alt="Картинка" />}
      />
    </>
  );
};
