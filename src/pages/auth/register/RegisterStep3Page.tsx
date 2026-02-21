import { RegisterStep3Form } from '@features/auth/ui/register-step-3-form';
import styles from './RegisterStep1Page.module.css';
import RegistrBoardImage from '@shared/assets/images/auth/registration_board.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';

export const RegisterStep3Page: React.FC = () => {
  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Укажите, чем вы готовы поделиться</h2>
      <p>Так другие люди смогут увидеть ваши предложения и предложить вам обмен!</p>
    </div>
  );

  return (
    <>
      <StepProgress currentStep={3} totalSteps={3} className={styles.stepProgress} />
      <ContentSection
        main={
          <>
            <RegisterStep3Form
              values={{
                skillName: '',
                category: [],
                subcategory: [],
                description: '',
                photos: [],
              }}
              categoryOptions={[]}
              subcategoryOptions={[]}
            />
          </>
        }
        heroText={heroText}
        heroImage={<img src={RegistrBoardImage} alt="Картинка" />}
      />
    </>
  );
};
