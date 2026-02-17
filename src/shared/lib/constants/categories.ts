//тип + массив/объект, экспорт по именам
/* Бизнес и карьера
Творчество и искусство
Иностранные языки
Образование и развитие
Здоровье и лайфстайл
Дом и уют */

/* пример
export const SKILL_CATEGORIES = [...] as const;
export type TSkillCategory = typeof SKILL_CATEGORIES[number]; */

import type { Option } from '..//types/option';

export const SKILL_CATEGORIES: Option[] = [
  { value: '1', label: 'Бизнес и карьера' },
  { value: '2', label: 'Иностранные языки' },
  { value: '3', label: 'Дом и уют' },
  { value: '4', label: 'Творчество и искусство' },
  { value: '5', label: 'Образование и развитие' },
  { value: '6', label: 'Здоровье и лайфстайл' },
] as const;

export type TSkillCategory = (typeof SKILL_CATEGORIES)[number];
