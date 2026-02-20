import { type FC, useState } from 'react';
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
  className?: string;
  categoryOptions: Array<{ value: string; label: string }>;    // ← обязательные пропсы
  subcategoryOptions: Array<{ value: string; label: string }>; // ← обязательные пропсы
}

export const RegisterStep3Form: FC<RegisterStep3FormProps> = ({ 
  values, 
  onSubmit, 
  className,
  categoryOptions,
  subcategoryOptions 
}) => {
  const [skillName, setSkillName] = useState(values.skillName);
  const [category, setCategory] = useState(values.category);
  const [subcategory, setSubcategory] = useState(values.subcategory);
  const [description, setDescription] = useState(values.description);
  const [photos, setPhotos] = useState(values.photos);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ skillName, category, subcategory, description, photos });
  };

  return (
    <form className={`${styles.registerForm} ${className || ''}`} onSubmit={handleSubmit}>
      <div className={styles.registerFormContent}>
        <Input
          label="Название навыка"
          placeholder="Введите название вашего навыка"
          value={skillName}
          onChange={setSkillName}
        />

        <FormMultiSelectField
          label="Категория навыка"
          placeholder="Выберите категорию навыка"
          value={category}
          onChange={setCategory}
          options={categoryOptions}
        />

        <FormMultiSelectField
          label="Подкатегория навыка"
          placeholder="Выберите подкатегорию навыка"
          value={subcategory}
          onChange={setSubcategory}
          options={subcategoryOptions}
        />

        <Textarea
          label="Описание"
          placeholder="Коротко опишите, чему можете научить"
          value={description}
          onChange={setDescription}
          rows={4}
        />

        <FileDropzone
          onChange={setPhotos}
          multiple={true}
          accept="image/*"
        />

        <div className={styles.buttonsContainer}>
          <Button variant="secondary" fullWidth type="button">
            Назад
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Продолжить
          </Button>
        </div>
      </div>
    </form>
  );
};