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

type SkillCategory = {
  id: number;
  name: string;
};

export const CATEGORIES: SkillCategory[] = [
  { id: 1, name: 'Бизнес и карьера' },
  { id: 2, name: 'Творчество и искусство' },
  { id: 3, name: 'Иностранные языки' },
  { id: 4, name: 'Образование и развитие' },
  { id: 5, name: 'Здоровье и лайфстайл' },
  { id: 6, name: 'Дом и уют' },
] as const;

export type TSkillCategory = (typeof CATEGORIES)[number];
