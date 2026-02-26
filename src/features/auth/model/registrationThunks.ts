import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  selectRegistrationStep1,
  selectRegistrationStep2,
  selectRegistrationStep3,
  resetRegistrationDraft,
  saveStep3, // Изменено: используем saveStep3 вместо setRegistrationStep3
  type RegistrationStep3, // Добавлено: импорт типа
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

// Тип для данных третьего шага (совместим с RegistrationStep3)
export interface Step3Data {
  skillName: string;
  category: string[];
  subcategory: string[];
  description: string;
  photos: File[];
  photoPreviewUrl?: string;
}

async function createProfileApi(profilePayload?: ProfilePayload): Promise<string> {
  console.log('Создаем профиль с данными:', profilePayload);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return 'mocked-user-id-12345';
}

// Thunk для сохранения данных третьего шага
export const saveRegistrationStep3 = createAsyncThunk<
  void,
  Step3Data,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string;
  }
>('auth/saveRegistrationStep3', async (step3Data, { dispatch, rejectWithValue }) => {
  try {
    // Здесь можно добавить валидацию данных
    if (!step3Data.skillName.trim()) {
      return rejectWithValue('Название навыка обязательно');
    }

    // Преобразуем Step3Data в RegistrationStep3
    const registrationStep3: RegistrationStep3 = {
      skillName: step3Data.skillName,
      category: step3Data.category,
      subcategory: step3Data.subcategory,
      description: step3Data.description,
      photos: step3Data.photos,
      photoPreviewUrl: step3Data.photoPreviewUrl,
    };

    // Сохраняем данные в Redux store
    dispatch(saveStep3(registrationStep3));
    return;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Ошибка при сохранении данных');
  }
});

// Thunk для завершения регистрации
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

  console.log('Данные для регистрации:', { step1, step2, step3 });

  if (!step1 || !step2 || !step3) {
    const missingSteps = [];
    if (!step1) missingSteps.push('шаг 1 (email)');
    if (!step2) missingSteps.push('шаг 2 (личные данные)');
    if (!step3) missingSteps.push('шаг 3 (навыки)');
    return rejectWithValue(`Заполнены не все шаги регистрации: ${missingSteps.join(', ')}`);
  }

  // Проверяем обязательные поля третьего шага
  if (!step3.skillName?.trim()) {
    return rejectWithValue('Название навыка обязательно');
  }

  if (!step3.category || step3.category.length === 0) {
    return rejectWithValue('Выберите хотя бы одну категорию');
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
      category: step3.category.join(', '), // Преобразуем массив в строку
      images: step3.photoPreviewUrl
        ? [
            {
              src: step3.photoPreviewUrl,
              alt: `Фото навыка: ${step3.skillName}`,
            },
          ]
        : [],
      tags: step3.subcategory || [],
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
