import { type FC, useState, useEffect } from 'react';
import { Input } from '@shared/ui/input';
import { FormMultiSelectField } from '@shared/ui/form-multi-select-field';
import { Textarea } from '@shared/ui/textarea';
import { FileDropzone } from '@shared/ui/file-dropzone';
import { Button } from '@shared/ui/Button';
import styles from './RegisterStep3Form.module.css';

export type RegisterStep3FormValues = {
  skillName: string;
  category: string[];
  subcategory: string[];
  description: string;
  photos: File[];
};

export interface RegisterStep3FormProps {
  values: RegisterStep3FormValues;
  onSubmit?: (data: RegisterStep3FormValues) => void;
  onBack?: (data: RegisterStep3FormValues) => void;
  className?: string;
  categoryOptions: Array<{ value: string; label: string }>;
  subcategoryOptions: Array<{ value: string; label: string }>;
}

export const RegisterStep3Form: FC<RegisterStep3FormProps> = ({
  values,
  onSubmit,
  onBack,
  className,
  categoryOptions,
  subcategoryOptions,
}) => {
  const [formData, setFormData] = useState<RegisterStep3FormValues>(values);

  useEffect(() => {
    setFormData(values);
  }, [values]);

  const { skillName, category, subcategory, description, photos } = formData;

  const handleChange = <K extends keyof RegisterStep3FormValues>(
    key: K,
    value: RegisterStep3FormValues[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleBack = () => {
    onBack?.(formData);
  };

  return (
    <form className={`${styles.registerForm} ${className || ''}`} onSubmit={handleSubmit}>
      <div className={styles.fieldsGroup}>
        <Input
          label="Название навыка"
          placeholder="Введите название вашего навыка"
          value={skillName}
          onChange={(value) => handleChange('skillName', value)}
        />
        <FormMultiSelectField
          label="Категория навыка"
          placeholder="Выберите категорию навыка"
          value={category}
          onChange={(value) => handleChange('category', value)}
          options={categoryOptions}
        />
        <FormMultiSelectField
          label="Подкатегория навыка"
          placeholder="Выберите подкатегорию навыка"
          value={subcategory}
          onChange={(value) => handleChange('subcategory', value)}
          options={subcategoryOptions}
        />
        <Textarea
          label="Описание"
          placeholder="Коротко опишите, чему можете научить"
          value={description}
          onChange={(value) => handleChange('description', value)}
          rows={4}
        />
        <FileDropzone
          value={photos}
          onChange={(value) => handleChange('photos', value)}
          multiple={true}
          accept="image/*"
        />
      </div>

      <div className={styles.buttonsContainer}>
        <Button variant="secondary" fullWidth type="button" onClick={handleBack}>
          Назад
        </Button>
        <Button type="submit" variant="primary" fullWidth>
          Продолжить
        </Button>
      </div>
    </form>
  );
};
