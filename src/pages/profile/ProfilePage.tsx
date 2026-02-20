import { useState } from 'react';
import {
  ProfileEditForm,
  type ProfileEditFormValues,
} from '@features/profile/ui/profile-edit-form';

const GENDER_OPTIONS = [
  { value: 'female', label: 'Женский' },
  { value: 'male', label: 'Мужской' },
];

const CITY_OPTIONS = [
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  { value: 'Казань', label: 'Казань' },
  { value: 'Новосибирск', label: 'Новосибирск' },
  { value: 'Екатеринбург', label: 'Екатеринбург' },
];

const INITIAL_VALUES: ProfileEditFormValues = {
  email: 'Mariia@gmail.com',
  name: 'Мария',
  birthDate: new Date(1995, 9, 28),
  gender: 'female',
  city: 'Москва',
  about:
    'Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем-то интересным!',
};

export default function ProfilePage() {
  const [values, setValues] = useState<ProfileEditFormValues>(INITIAL_VALUES);

  return (
    <div>
      <h1 className="visually-hidden">Личные данные</h1>
      <ProfileEditForm
        values={values}
        onEmailChange={(v) => setValues((prev) => ({ ...prev, email: v }))}
        onNameChange={(v) => setValues((prev) => ({ ...prev, name: v }))}
        onBirthDateChange={(v) => setValues((prev) => ({ ...prev, birthDate: v }))}
        onGenderChange={(v) => setValues((prev) => ({ ...prev, gender: v }))}
        onCityChange={(v) => setValues((prev) => ({ ...prev, city: v }))}
        onAboutChange={(v) => setValues((prev) => ({ ...prev, about: v }))}
        onSave={() => {}}
        onChangePassword={() => {}}
        onAvatarChange={(file: File) => {
          void file;
        }}
        genderOptions={GENDER_OPTIONS}
        cityOptions={CITY_OPTIONS}
        avatarSrc={undefined}
      />
    </div>
  );
}
