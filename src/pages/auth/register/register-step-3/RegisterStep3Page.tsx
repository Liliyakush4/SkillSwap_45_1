import { useNavigate } from 'react-router-dom';
import { RegisterStep3Form } from '@features/auth/ui/register-step-3-form';
import styles from './RegisterStep3Page.module.css';
import RegistrBoardImage from '@shared/assets/images/auth/registration_board.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';

/* времененные данные чтобы проверить вывод данных в полях при регистрации*/
const skillCategoryLearnOptions = [
  { value: 'business', label: 'Бизнес и карьера' },
  { value: 'creativity', label: 'Творчество и искусство' },
  { value: 'languages', label: 'Иностранные языки' },
  { value: 'health', label: 'Здоровье и лайфстайл' },
  { value: 'home', label: 'Дом и уют' },
];

const skillSubcategoryLearnOptions = [
  { value: 'drawing', label: 'Рисование и иллюстрация' },
  { value: 'photography', label: 'Фотография' },
  { value: 'video', label: 'Видеомонтаж' },
  { value: 'music_sound', label: 'Музыка и звук' },
  { value: 'acting', label: 'Актёрское мастерство' },
  { value: 'writing', label: 'Креативное письмо' },
  { value: 'art_therapy', label: 'Арт-терапия' },
  { value: 'decor_diy', label: 'Декор и DIY' },
];

export const RegisterStep3Page: React.FC = () => {
  const navigate = useNavigate();

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
              categoryOptions={skillCategoryLearnOptions}
              subcategoryOptions={skillSubcategoryLearnOptions}
              onSubmit={() => navigate('/', { replace: true })}
              onBack={() => navigate('/auth/register/step-2')}
            />
          </>
        }
        heroText={heroText}
        heroImage={<img src={RegistrBoardImage} alt="Картинка" />}
      />
    </>
  );
};
