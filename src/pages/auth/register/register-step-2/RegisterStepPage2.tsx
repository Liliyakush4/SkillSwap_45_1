import React, { useMemo } from 'react';
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
import { saveStep2 } from '@features/auth/model/registrationSlice';
import { selectDb } from '@app/store/db/selectors';
import type { MultiSelectOption } from '@shared/ui/form-multi-select-field';
import { GENDER } from '@features/filters/model/defaults';
import type { Option } from '@shared/types';

const buildGenderOptionsForForm = (gender: Option[]) => [
  { value: '', label: 'Не указан' },
  ...gender.filter((g) => g.value !== 'all').map((g) => ({ value: g.value, label: g.label })),
];

// чтобы предотвратить сдвиг даты из-за timezone при toISOString()
const toYYYYMMDD = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const RegisterStep2Page: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const db = useAppSelector(selectDb);

  const genderOptions = useMemo(() => buildGenderOptionsForForm(GENDER), []);

  const cityOptions = useMemo(() => {
    if (!db) return [];
    return db.cities.map((city) => ({ value: String(city.id), label: city.name }));
  }, [db]);

  const skillCategoryLearnOptions = useMemo<MultiSelectOption[]>(() => {
    if (!db) return [];
    return db.categories.map((cat) => ({ value: String(cat.id), label: cat.name }));
  }, [db]);

  const subcategoryOptionsByCategoryId = useMemo<Record<string, MultiSelectOption[]>>(() => {
    if (!db) return {};
    return Object.fromEntries(
      Object.entries(db.subcategoriesByCategoryId).map(([categoryId, subs]) => [
        String(categoryId),
        subs.map((sub) => ({ value: String(sub.id), label: sub.name })),
      ]),
    );
  }, [db]);

  const handleSubmit = (data: RegisterStep2FormValues) => {
    dispatch(
      saveStep2({
        name: data.name,
        birthDate: data.birthDate ? toYYYYMMDD(data.birthDate) : null,
        gender: data.gender,
        city: data.city, // строковый id города
        categorySkill: data.skillCategoryLearn, // строковые id категорий
        subcategorySkill: data.skillSubcategoryLearn, // строковые id подкатегорий
      }),
    );

    navigate('/auth/register/step-3');
  };

  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Расскажите немного о себе</h2>
      <p>Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена</p>
    </div>
  );

  if (!db) return null;

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
            subcategoryOptionsByCategoryId={subcategoryOptionsByCategoryId}
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
