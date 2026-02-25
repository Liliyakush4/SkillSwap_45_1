import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  selectRegistrationStep1,
  selectRegistrationStep2,
  selectRegistrationStep3,
  resetRegistrationDraft,
} from './registrationSlice';
import { loginSuccess } from './authSlice';
import { profileSlice } from '../../profile/model/profileSlice';
import type { AppDispatch, RootState } from '@app/store/store';

interface ProfilePayload {
  profile: {
    email: string;
    name: string;
    birthDate: string | null;
    gender: string;
    city: string;
    about: string;
    avatarSrc: string | undefined;
  };
  skill: {
    title: string;
    description: string;
    level: number;
    category: string;
    images: Array<{ src: string; alt: string }>;
    tags: string[];
    isPublic: boolean;
  };
}

// Исправленная функция createProfileApi
async function createProfileApi(profilePayload?: ProfilePayload): Promise<string> {
  // Логируем переданные данные профиля
  console.log('Создаем профиль с данными:', profilePayload);

  // Имитация задержки, как будто происходит вызов API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Возвращаем фиктивный userId
  return 'mocked-user-id-12345';
}

export const finishRegistration = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string;
  }
>('auth/finishRegistration', async (_, { getState, dispatch, rejectWithValue }) => {
  const state = getState();
  const step1 = selectRegistrationStep1(state);
  const step2 = selectRegistrationStep2(state);
  const step3 = selectRegistrationStep3(state);

  if (!step1 || !step2 || !step3) {
    return rejectWithValue('Заполнены не все шаги регистрации');
  }

  const profilePayload: ProfilePayload = {
    profile: {
      email: step1.email,
      name: step2.name,
      birthDate: step2.birthDate,
      gender: step2.gender,
      city: step2.city,
      about: step3.description || '',
      avatarSrc: step3.photoPreviewUrl,
    },
    skill: {
      title: step3.skillName || '',
      description: step3.description || '',
      level: 1,
      category: String(step2.categorySkill.id || step2.categorySkill.name),
      images: step3.photoPreviewUrl
        ? [
            {
              src: step3.photoPreviewUrl,
              alt: `Фото навыка: ${step3.skillName}`,
            },
          ]
        : [],
      tags: [],
      isPublic: true,
    },
  };

  try {
    const userId = await createProfileApi(profilePayload);
    dispatch(profileSlice.actions.createProfile(profilePayload));
    dispatch(loginSuccess({ userId: Number(userId) }));
    dispatch(resetRegistrationDraft());
    return;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Ошибка при создании профиля');
  }
});
