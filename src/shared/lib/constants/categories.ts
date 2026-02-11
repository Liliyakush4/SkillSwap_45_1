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

export const SKILL_CATEGORIES_COLORS = {
  // Бизнес и карьера
  'Бизнес и карьера': 'var(--color-tag-business)',

  // Творчество и искусство
  'Творчество и искусство': 'var(--color-tag-creativity)',

  // Иностранные языки
  'Иностранные языки': 'var(--color-tag-englih)',

  // Образование и развитие
  'Образование и развитие': 'var(--color-tag-education)',

  // Дом и уют
  'Дом и уют': 'var(--color-tag-home)',

  // Здоровье и лайфстайл
  'Здоровье и лайфстайл': 'var(--color-tag-health)',

} as const;

/* Используется для типизации в компонентах */
export type SkillCategories = keyof typeof SKILL_CATEGORIES_COLORS;

/* Вспомогательная функция для получения цвета по категории */
export const getTagColor = (category: string): string => {
  return SKILL_CATEGORIES_COLORS[category as SkillCategories] || 'var(--color-tag-plus)';
};
