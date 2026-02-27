import { useNavigate } from 'react-router-dom';
import {
  RegisterStep2Form,
  type RegisterStep2FormValues,
} from '@features/auth/ui/register-step-2-form';
import styles from './RegisterStepPage2.module.css';
import PersonImage from '@shared/assets/images/auth/registration_person.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';
import { useAppDispatch, useAppSelector } from '@shared/lib/storeHooks';
import { selectDb } from '@app/store/db/selectors';
import { useMemo, useState } from 'react';
import { saveStep2 } from '@features/auth/model/registrationSlice';

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('Не удалось прочитать файл'));
    r.readAsDataURL(file);
  });

const toYYYYMMDD = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const RegisterStep2Page: React.FC = () => {
  const db = useAppSelector(selectDb);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(undefined);
  const [avatarMetadata, setAvatarMetadata] = useState<Record<string, unknown> | undefined>(
    undefined,
  );

  const handleAvatarChange = async (file: File) => {
    const url = await fileToDataUrl(file);
    setAvatarPreviewUrl(url);
    setAvatarMetadata({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    });
  };

  const genderOptions = useMemo(
    () => [
      { value: '', label: 'Не указан' },
      { value: 'm', label: 'Мужской' },
      { value: 'f', label: 'Женский' },
    ],
    [],
  );

  const cityOptions = useMemo(() => {
    if (!db) return [];
    return db.cities.map((c) => ({ value: String(c.id), label: c.name }));
  }, [db]);

  const skillCategoryLearnOptions = useMemo(() => {
    if (!db) return [];
    return db.categories.map((cat) => ({ value: String(cat.id), label: cat.name }));
  }, [db]);

  const skillSubcategoryLearnOptions = useMemo(() => {
    if (!db) return [];
    return Object.values(db.subcategoriesByCategoryId)
      .flat()
      .map((sub) => ({
        value: String(sub.id),
        label: sub.name,
      }));
  }, [db]);

  if (!db) return null;

  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Расскажите немного о себе</h2>
      <p>Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена</p>
    </div>
  );

  const handleSubmit = (data: RegisterStep2FormValues) => {
    dispatch(
      saveStep2({
        name: data.name,
        birthDate: data.birthDate ? toYYYYMMDD(data.birthDate) : null,
        gender: data.gender,
        city: data.city,
        categorySkill: data.skillCategoryLearn,
        subcategorySkill: data.skillSubcategoryLearn,
        avatarPreviewUrl,
        avatarMetadata,
      }),
    );

    navigate('/auth/register/step-3');
  };

  return (
    <>
      <StepProgress currentStep={2} totalSteps={3} className={styles.stepProgress} />
      <ContentSection
        main={
          <RegisterStep2Form
            values={{
              name: '',
              birthDate: null,
              gender: '',
              city: null,
              skillCategoryLearn: [],
              skillSubcategoryLearn: [],
            }}
            genderOptions={genderOptions}
            cityOptions={cityOptions}
            skillCategoryLearnOptions={skillCategoryLearnOptions}
            skillSubcategoryLearnOptions={skillSubcategoryLearnOptions}
            onAvatarChange={handleAvatarChange}
            avatarSrc={avatarPreviewUrl}
            onSubmit={handleSubmit}
            onBack={() => navigate('/auth/register/step-1')}
          />
        }
        heroText={heroText}
        heroImage={<img src={PersonImage} alt="Картинка" />}
      />
    </>
  );
};
