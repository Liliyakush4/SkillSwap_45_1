import type { Option } from '../types/option';

type SubCategoriesOption = {
  [key: number]: Option[]; // key - id категории на number?
};

export const SUBCATEGORIES: SubCategoriesOption = {
  1: [
    { value: '1', label: 'Бизнес' },
    { value: '2', label: 'Карьера' },
  ],
  2: [
    { value: '3', label: 'Английский' },
    { value: '4', label: 'Немецкий' },
  ],
  3: [
    { value: '5', label: 'Дом' },
    { value: '6', label: 'Уют' },
  ],
  4: [
    { value: '7', label: 'Творчество' },
    { value: '8', label: 'Искусство' },
  ],
  5: [
    { value: '9', label: 'Образование' },
    { value: '10', label: 'Развитие' },
  ],
  6: [
    { value: '11', label: 'Здоровье' },
    { value: '12', label: 'Лайфстайл' },
  ],
} as const;

export type TSubCategory = (typeof SUBCATEGORIES)[number];
