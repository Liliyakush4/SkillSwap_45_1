import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/storeHooks';
import { saveStep2 } from '@features/auth/model/registrationSlice';
import {
  RegisterStep2Form,
  type RegisterStep2FormValues,
} from '@features/auth/ui/register-step-2-form';
import styles from './RegisterStepPage2.module.css';
import PersonImage from '@shared/assets/images/auth/registration_person.svg';
import { ContentSection } from '@shared/ui/content-section/ContentSection';
import { StepProgress } from '@shared/ui/step-progress/StepProgress';
import React from 'react';

/* данные для проверки, потом уберем*/
const genderOptions: Array<{ value: string; label: string; disabled?: boolean }> = [
  { value: '', label: 'Не указан' },
  { value: 'm', label: 'Мужской' },
  { value: 'f', label: 'Женский' },
];

const cityOptions: Array<{ value: string; label: string; disabled?: boolean }> = [
  { value: 'msk', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'samara', label: 'Самара' },
  { value: 'saratov', label: 'Саратов' },
  { value: 'ekb', label: 'Екатеринбург' },
  { value: 'nnov', label: 'Нижний Новгород' },
  { value: 'kzn', label: 'Казань' },
  { value: 'chelyabinsk', label: 'Челябинск' },
  { value: 'omsk', label: 'Омск' },
  { value: 'rostov', label: 'Ростов-на-Дону' },
  { value: 'ufa', label: 'Уфа' },
  { value: 'krasnoyarsk', label: 'Красноярск' },
  { value: 'voronezh', label: 'Воронеж' },
  { value: 'perm', label: 'Пермь' },
  { value: 'volgograd', label: 'Волгоград' },
  { value: 'krasnodar', label: 'Краснодар' },
  { value: 'tyumen', label: 'Тюмень' },
  { value: 'tolyatti', label: 'Тольятти' },
  { value: 'izhevsk', label: 'Ижевск' },
  { value: 'barnaul', label: 'Барнаул' },
  { value: 'ulyanovsk', label: 'Ульяновск' },
  { value: 'irkutsk', label: 'Иркутск' },
  { value: 'khabarovsk', label: 'Хабаровск' },
  { value: 'yaroslavl', label: 'Ярославль' },
  { value: 'vladivostok', label: 'Владивосток' },
  { value: 'makhachkala', label: 'Махачкала' },
  { value: 'tomsk', label: 'Томск' },
  { value: 'orenburg', label: 'Оренбург' },
  { value: 'kemerovo', label: 'Кемерово' },
  { value: 'novokuznetsk', label: 'Новокузнецк' },
  { value: 'ryazan', label: 'Рязань' },
  { value: 'astrakhan', label: 'Астрахань' },
  { value: 'naberezhnye', label: 'Набережные Челны' },
  { value: 'penza', label: 'Пенза' },
  { value: 'lipetsk', label: 'Липецк' },
  { value: 'tula', label: 'Тула' },
  { value: 'kirov', label: 'Киров' },
  { value: 'cheboksary', label: 'Чебоксары' },
  { value: 'kaliningrad', label: 'Калининград' },
  { value: 'bryansk', label: 'Брянск' },
  { value: 'kursk', label: 'Курск' },
  { value: 'ivanovo', label: 'Иваново' },
  { value: 'magnitogorsk', label: 'Магнитогорск' },
  { value: 'tver', label: 'Тверь' },
  { value: 'stavropol', label: 'Ставрополь' },
  { value: 'sochi', label: 'Сочи' },
  { value: 'simferopol', label: 'Симферополь' },
];

type MultiSelectOption = { value: string; label: string };

const skillCategoryLearnOptions: MultiSelectOption[] = [
  { value: '1', label: 'Бизнес и карьера' },
  { value: '2', label: 'Творчество и искусство' },
  { value: '3', label: 'Иностранные языки' },
  { value: '4', label: 'Здоровье и лайфстайл' },
  { value: '5', label: 'Дом и уют' },
];

const skillSubcategoryLearnOptions: MultiSelectOption[] = [
  { value: '101', label: 'Рисование и иллюстрация' },
  { value: '102', label: 'Фотография' },
  { value: '103', label: 'Видеомонтаж' },
  { value: '104', label: 'Музыка и звук' },
  { value: '105', label: 'Актёрское мастерство' },
  { value: '106', label: 'Креативное письмо' },
  { value: '107', label: 'Арт-терапия' },
  { value: '108', label: 'Декор и DIY' },
];

export const RegisterStep2Page: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<RegisterStep2FormValues>(() => {
    const savedData = localStorage.getItem('registerStep2Data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.birthDate) {
          parsed.birthDate = new Date(parsed.birthDate);
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved form data:', e);
      }
    }

    return {
      name: '',
      birthDate: null,
      gender: '',
      city: null,
      skillCategoryLearn: [],
      skillSubcategoryLearn: [],
    };
  });

  const saveFormData = (data: RegisterStep2FormValues) => {
    setFormData(data);
    const dataToSave = {
      ...data,
      birthDate: data.birthDate ? data.birthDate.toISOString() : null,
    };
    localStorage.setItem('registerStep2Data', JSON.stringify(dataToSave));
  };

  const handleContinue = (data: RegisterStep2FormValues) => {
    saveFormData(data);

    const selectedCategoryIdStr =
      data.skillCategoryLearn.length > 0 ? data.skillCategoryLearn[0] : '';

    const selectedSubcategoryIdStr =
      data.skillSubcategoryLearn.length > 0 ? data.skillSubcategoryLearn[0] : '';

    const selectedCategoryId = selectedCategoryIdStr ? parseInt(selectedCategoryIdStr, 10) : 0;
    const selectedSubcategoryId = selectedSubcategoryIdStr
      ? parseInt(selectedSubcategoryIdStr, 10)
      : 0;

    const categoryName = selectedCategoryIdStr
      ? skillCategoryLearnOptions.find((opt) => opt.value === selectedCategoryIdStr)?.label || ''
      : '';

    const subcategoryName = selectedSubcategoryIdStr
      ? skillSubcategoryLearnOptions.find((opt) => opt.value === selectedSubcategoryIdStr)?.label ||
        ''
      : '';

    dispatch(
      saveStep2({
        name: data.name,
        birthDate: data.birthDate ? data.birthDate.toISOString() : null,
        gender: data.gender,
        city: data.city || '',
        categorySkill: {
          id: selectedCategoryId,
          name: categoryName,
          color: '',
        },
        subcategorySkill: {
          id: selectedSubcategoryId,
          name: subcategoryName,
          categoryId: selectedCategoryId,
        },
      }),
    );

    navigate('/auth/register/step-3');
  };

  const handleBack = (data: RegisterStep2FormValues) => {
    saveFormData(data);
    navigate('/auth/register/step-1');
  };

  const handleAvatarChange = (file: File) => {
    console.log('Avatar file selected:', file);
  };

  const heroText = (
    <div className={styles.heroContainer}>
      <h2 className={styles.heroTitle}>Расскажите немного о себе</h2>
      <p>Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена</p>
    </div>
  );

  return (
    <>
      <StepProgress currentStep={2} totalSteps={3} className={styles.stepProgress} />
      <ContentSection
        main={
          <RegisterStep2Form
            values={formData}
            genderOptions={genderOptions}
            cityOptions={cityOptions}
            skillCategoryLearnOptions={skillCategoryLearnOptions}
            skillSubcategoryLearnOptions={skillSubcategoryLearnOptions}
            onSubmit={handleContinue}
            onBack={() => handleBack(formData)}
            onAvatarChange={handleAvatarChange}
          />
        }
        heroText={heroText}
        heroImage={<img src={PersonImage} alt="Картинка" />}
      />
    </>
  );
};
