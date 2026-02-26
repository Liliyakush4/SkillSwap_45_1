import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RegisterStep3Form,
  type RegisterStep3FormValues,
} from '@features/auth/ui/register-step-3-form';
import styles from './RegisterStep3Page.module.css';
import RegistrBoardImage from '@shared/assets/images/auth/registration_board.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';
import { useAppDispatch, useAppSelector } from '@shared/lib/storeHooks';
import { selectDb } from '@app/store/db/selectors';
import type { MultiSelectOption } from '@shared/ui/form-multi-select-field';
import { saveStep3, selectRegistrationStep3 } from '@features/auth/model/registrationSlice';

const buildPhotoPayload = (files: File[]) => {
  const first = files[0];
  if (!first) return {};

  const photoPreviewUrl = URL.createObjectURL(first);

  const photoMetadata: Record<string, unknown> = {
    name: first.name,
    size: first.size,
    type: first.type,
    lastModified: first.lastModified,
  };

  return { photoPreviewUrl, photoMetadata };
};

export const RegisterStep3Page: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const db = useAppSelector(selectDb);
  const step3Draft = useAppSelector(selectRegistrationStep3);

  const categoryOptions = useMemo<MultiSelectOption[]>(() => {
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

  const initialValues = useMemo<RegisterStep3FormValues>(() => {
    if (!step3Draft) {
      return {
        skillName: '',
        category: [],
        subcategory: [],
        description: '',
        photos: [],
      };
    }

    return {
      skillName: step3Draft.skillName ?? '',
      category: step3Draft.categorySkill ?? [],
      subcategory: step3Draft.subcategorySkill ?? [],
      description: step3Draft.description ?? '',
      photos: [],
    };
  }, [step3Draft]);

  const handleSubmit = (data: RegisterStep3FormValues) => {
    if (data.category.length === 0 || data.subcategory.length === 0) return;
    const { photoPreviewUrl, photoMetadata } = buildPhotoPayload(data.photos);

    dispatch(
      saveStep3({
        skillName: data.skillName,
        categorySkill: data.category,
        subcategorySkill: data.subcategory,
        description: data.description,
        photoPreviewUrl,
        photoMetadata,
      }),
    );

    // после готовности thunk делать submit на "createUser" и только потом navigate.
    navigate('/', { replace: true });
  };

  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Укажите, чем вы готовы поделиться</h2>
      <p>Так другие люди смогут увидеть ваши предложения и предложить вам обмен!</p>
    </div>
  );

  if (!db) return null;

  return (
    <>
      <StepProgress currentStep={3} totalSteps={3} className={styles.stepProgress} />
      <ContentSection
        main={
          <>
            <RegisterStep3Form
              values={initialValues}
              categoryOptions={categoryOptions}
              subcategoryOptionsByCategoryId={subcategoryOptionsByCategoryId}
              onSubmit={handleSubmit}
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
