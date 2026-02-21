import { type Category } from 'src/shared/api/mock/types';
import type { TCategoriesSelected, TFilterValues } from '@features/filters/model/types';
import { GENDER, SKILL_TYPE } from '@features/filters/model/defaults';

export const createDefaultCategoriesSelected = (categories: Category[]) =>
  categories.reduce((acc, category) => ({ ...acc, [category.id]: [] }), {} as TCategoriesSelected);

export const createDefaultFilterValues = (categories: Category[]) =>
  ({
    offerType: SKILL_TYPE[0].value,
    categories: createDefaultCategoriesSelected(categories),
    gender: GENDER[0].value,
    cities: [],
  }) as TFilterValues;
