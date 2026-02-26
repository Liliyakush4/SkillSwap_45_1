import { type FC, useState, useEffect, useMemo } from 'react';
import { Input } from '@shared/ui/input';
import { FormMultiSelectField } from '@shared/ui/form-multi-select-field';
import type { MultiSelectOption } from '@shared/ui/form-multi-select-field';
import { getLinkedOptions, sanitizeLinkedSelection } from '@shared/lib/linkedMultiselect';
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
  onBack?: () => void;
  className?: string;
  categoryOptions: MultiSelectOption[];
  subcategoryOptionsByCategoryId: Record<string, MultiSelectOption[]>;
}

export const RegisterStep3Form: FC<RegisterStep3FormProps> = ({
  values,
  onSubmit,
  onBack,
  className,
  categoryOptions,
  subcategoryOptionsByCategoryId,
}) => {
  const [skillName, setSkillName] = useState(values.skillName);
  const [category, setCategory] = useState(values.category);
  const [subcategory, setSubcategory] = useState(values.subcategory);
  const [description, setDescription] = useState(values.description);
  const [photos, setPhotos] = useState(values.photos);

  // синхронизация со значениями из стора/пропсов при переключении по шагам
  useEffect(() => {
    setSkillName(values.skillName);
    setCategory(values.category);
    setSubcategory(values.subcategory);
    setDescription(values.description);
    setPhotos(values.photos);
  }, [values]);

  // доступные подкатегории = только для выбранных категорий
  const filteredSubcategoryOptions = useMemo(() => {
    return getLinkedOptions(category, subcategoryOptionsByCategoryId);
  }, [category, subcategoryOptionsByCategoryId]);

  // чистим выбранные подкатегории, если они больше не подходят выбранной категории
  useEffect(() => {
    setSubcategory((prev) => sanitizeLinkedSelection(prev, filteredSubcategoryOptions));
  }, [filteredSubcategoryOptions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ skillName, category, subcategory, description, photos });
  };

  return (
    <form className={`${styles.registerForm} ${className || ''}`} onSubmit={handleSubmit}>
      {/* Группа полей — все поля внутри одного div */}
      <div className={styles.fieldsGroup}>
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
          placeholder={
            category.length === 0 ? 'Сначала выберите категорию' : 'Выберите подкатегорию навыка'
          }
          value={subcategory}
          onChange={setSubcategory}
          options={filteredSubcategoryOptions}
          disabled={category.length === 0}
        />

        <Textarea
          label="Описание"
          placeholder="Коротко опишите, чему можете научить"
          value={description}
          onChange={setDescription}
          rows={4}
        />

        <FileDropzone onChange={setPhotos} multiple={true} accept="image/*" />
      </div>

      {/* Кнопки — отдельный блок */}
      <div className={styles.buttonsContainer}>
        <Button variant="secondary" fullWidth type="button" onClick={onBack}>
          Назад
        </Button>
        <Button type="submit" variant="primary" fullWidth>
          Продолжить
        </Button>
      </div>
    </form>
  );
};
