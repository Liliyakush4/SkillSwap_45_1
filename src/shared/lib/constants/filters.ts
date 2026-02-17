//тип + массив/объект, экспорт по именам
/* тип навыка: all | teach | learn; пол: any | male | female */

import type { Option } from '..//types/option';

export const SKILL_TYPE: Option[] = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
] as const;

export const GENDER: Option[] = [
  { value: 'all', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;

export type TSkillType = (typeof SKILL_TYPE)[number];
export type TGender = (typeof GENDER)[number];
