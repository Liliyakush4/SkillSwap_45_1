import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/storeHooks';
import {
  finishRegistration,
  saveRegistrationStep3,
  type Step3Data,
} from '@features/auth/model/registrationThunks';
import {
  RegisterStep3Form,
  type RegisterStep3FormValues,
} from '@features/auth/ui/register-step-3-form';
import styles from './RegisterStep3Page.module.css';
import RegistrBoardImage from '@shared/assets/images/auth/registration_board.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';
import React from 'react';

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
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<RegisterStep3FormValues>(() => {
    const savedData = localStorage.getItem('registerStep3Data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        parsed.photos = [];
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved form data:', e);
      }
    }

    return {
      skillName: '',
      category: [],
      subcategory: [],
      description: '',
      photos: [],
    };
  });

  const saveFormData = (data: RegisterStep3FormValues) => {
    setFormData(data);
    const dataToSave = {
      ...data,
      photos: [],
    };
    localStorage.setItem('registerStep3Data', JSON.stringify(dataToSave));
  };

  const handleBack = (data: RegisterStep3FormValues) => {
    saveFormData(data);
    navigate('/auth/register/step-2');
  };

  const handleFinishRegistration = async (data: RegisterStep3FormValues) => {
    try {
      saveFormData(data);

      const step3Data: Step3Data = {
        skillName: data.skillName,
        category: data.category,
        subcategory: data.subcategory,
        description: data.description,
        photos: data.photos,
        photoPreviewUrl: data.photos.length > 0 ? URL.createObjectURL(data.photos[0]) : undefined,
      };

      await dispatch(saveRegistrationStep3(step3Data)).unwrap();

      await dispatch(finishRegistration()).unwrap();

      localStorage.removeItem('registerStep3Data');
      localStorage.removeItem('registerStep2Data');

      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Ошибка при завершении регистрации:', error);

      if (error instanceof Error) {
        alert(`Ошибка: ${error.message}`);
      } else if (typeof error === 'string') {
        alert(`Ошибка: ${error}`);
      } else {
        alert('Произошла неизвестная ошибка при регистрации');
      }
    }
  };

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
              values={formData}
              categoryOptions={skillCategoryLearnOptions}
              subcategoryOptions={skillSubcategoryLearnOptions}
              onSubmit={handleFinishRegistration}
              onBack={() => handleBack(formData)}
            />
          </>
        }
        heroText={heroText}
        heroImage={<img src={RegistrBoardImage} alt="Картинка" />}
      />
    </>
  );
};
