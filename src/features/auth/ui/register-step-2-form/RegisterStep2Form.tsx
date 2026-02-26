import { type FC, useState, useEffect, useMemo } from 'react';
import { AvatarUploader } from '@shared/ui/avatar-uploader/AvatarUploader';
import { Input } from '@shared/ui/input';
import { BirthDateInput } from '@shared/ui/birth-date-input';
import { FormSelectField } from '@shared/ui/form-select-field';
import { FormAutocompleteField } from '@shared/ui/form-autocomplete-field';
import { FormMultiSelectField } from '@shared/ui/form-multi-select-field';
import { Button } from '@shared/ui/Button';
import type { MultiSelectOption } from '@shared/ui/form-multi-select-field';
import { getLinkedOptions, sanitizeLinkedSelection } from '@shared/lib/linkedMultiselect';
import styles from './RegisterStep2Form.module.css';

export type RegisterStep2FormValues = {
  name: string;
  birthDate: Date | null;
  gender: string;
  city: string | null;
  skillCategoryLearn: string[];
  skillSubcategoryLearn: string[];
};

export interface RegisterStep2FormProps {
  values: RegisterStep2FormValues;
  onSubmit?: (data: RegisterStep2FormValues) => void;
  onBack?: (data: RegisterStep2FormValues) => void;
  onAvatarChange?: (file: File) => void;
  avatarSrc?: string;

  genderOptions: Array<{ value: string; label: string; disabled?: boolean }>;
  cityOptions: Array<{ value: string; label: string; disabled?: boolean }>;

  skillCategoryLearnOptions: MultiSelectOption[];
  subcategoryOptionsByCategoryId: Record<string, MultiSelectOption[]>;

  className?: string;
}

export const RegisterStep2Form: FC<RegisterStep2FormProps> = ({
  values,
  onSubmit,
  onBack,
  onAvatarChange,
  avatarSrc,
  genderOptions,
  cityOptions,
  skillCategoryLearnOptions,
  subcategoryOptionsByCategoryId,
  className,
}) => {
  const [formData, setFormData] = useState<RegisterStep2FormValues>(values);

  useEffect(() => {
    setFormData(values);
  }, [values]);

  // 1) доступные подкатегории = только для выбранных категорий
  const filteredSubcategoryOptions = useMemo(() => {
    return getLinkedOptions(skillCategoryLearn, subcategoryOptionsByCategoryId);
  }, [skillCategoryLearn, subcategoryOptionsByCategoryId]);

  // 2) если категории поменялись, чистим выбранные подкатегории от невалидных
  useEffect(() => {
    setSkillSubcategoryLearn((prev) => sanitizeLinkedSelection(prev, filteredSubcategoryOptions));
  }, [filteredSubcategoryOptions]);

  const formData: RegisterStep2FormValues = {
    name,
    birthDate,
    gender,
    city,
    skillCategoryLearn,
    skillSubcategoryLearn,
  };

  const handleChange = <K extends keyof RegisterStep2FormValues>(
    key: K,
    value: RegisterStep2FormValues[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    onSubmit?.(formData);
  };

  const handleBack = () => {
    onBack?.(formData);
  };

  return (
    <form
      className={`${styles.form} ${className ?? ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleContinue();
      }}
      noValidate
    >
      <div className={styles.formContent}>
        <div className={styles.avatarWrap}>
          <AvatarUploader src={avatarSrc} alt="Аватар" size={72} onAddPhoto={onAvatarChange} />
        </div>
        <div className={styles.field}>
          <Input
            label="Имя"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(value) => handleChange('name', value)}
          />
        </div>
        <div className={styles.twoColRow}>
          <div className={styles.field}>
            <span className={styles.standaloneLabel}>Дата рождения</span>
            <BirthDateInput
              value={birthDate}
              onChange={(date) => handleChange('birthDate', date)}
              disabled={false}
            />
          </div>
          <div className={styles.field}>
            <FormSelectField
              label="Пол"
              placeholder="Не указан"
              value={gender}
              onChange={(value) => handleChange('gender', value)}
              options={genderOptions}
              disabled={false}
              className={styles.genderField}
            />
          </div>
        </div>
        <div className={styles.field}>
          <FormAutocompleteField
            label="Город"
            placeholder="Не указан"
            value={city}
            onChange={(value) => handleChange('city', value)}
            options={cityOptions}
            disabled={false}
          />
        </div>
        <div className={styles.field}>
          <FormMultiSelectField
            label="Категория навыка, которому хотите научиться"
            placeholder="Выберите категорию"
            value={skillCategoryLearn}
            onChange={(value) => handleChange('skillCategoryLearn', value)}
            options={skillCategoryLearnOptions}
            disabled={false}
          />
        </div>
        <div className={styles.field}>
          <FormMultiSelectField
            label="Подкатегория навыка, которому хотите научиться"
            placeholder={
              skillCategoryLearn.length === 0
                ? 'Сначала выберите категорию'
                : 'Выберите подкатегорию'
            }
            value={skillSubcategoryLearn}
            onChange={setSkillSubcategoryLearn}
            options={filteredSubcategoryOptions}
            disabled={skillCategoryLearn.length === 0}
          />
        </div>
        <div className={styles.buttonsWrapper}>
          <div className={styles.buttonsRow}>
            <Button type="button" variant="secondary" fullWidth onClick={handleBack}>
              Назад
            </Button>
            <Button type="button" variant="primary" fullWidth onClick={handleContinue}>
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
