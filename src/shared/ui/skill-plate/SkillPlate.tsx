import type { FC } from 'react';
import styles from './SkillPlate.module.css';
import clsx from 'clsx';

export type TSkillPlateVariant = 'default' | 'count';

export type TSkillPlateProps = {
  text: string;
  variant?: TSkillPlateVariant;
  className?: string;
}

export const SkillPlate: FC<TSkillPlateProps> = ({ text, variant = 'default', className }) => {
  // Формируем строку классов
  const combinedClassName = clsx(
    styles.skillPlate,
    styles[variant], // Добавляем класс для варианта
    className,
  );

  if (variant === 'default') {
    return <span className={combinedClassName}>{text}</span>;
  } else {
    return <span className={combinedClassName}>+{text}</span>;
  }
};
