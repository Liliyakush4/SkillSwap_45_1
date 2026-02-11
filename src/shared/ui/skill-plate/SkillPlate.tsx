import type { FC } from 'react';
import { getTagColor } from '../../lib/constants/categories';
import styles from './SkillPlate.module.css';

export type TSkillPlateProps = {
  text: string;
  variant: 'default' | 'count';
  count?: number;
  className?: string;
  category: string;
};

export const SkillPlate: FC<TSkillPlateProps> = ({ text, variant, count, className, category }) => {
  // Получаем имя CSS-класса на основе цвета
  const colorClassName = getTagColor(category);

  // Формируем строку классов
  const combinedClassName = [styles.skillPlate, className]
    .filter(Boolean) // Удаляем пустые значения
    .join(' '); // Объединяем через пробел

  if (variant === 'default') {
    return (
      <span className={combinedClassName} style={{ backgroundColor: colorClassName }}>
        {text}
      </span>
    );
  } else {
    return (
      <span className={combinedClassName} style={{ backgroundColor: colorClassName }}>
        +{count}
      </span>
    );
  }
};
