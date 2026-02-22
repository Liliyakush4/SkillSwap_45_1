import { type Category } from '@shared/api/mock/types';
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

export const countAppliedFilters = (
  filters: TFilterValues,
  defaultFilterValues: TFilterValues,
): number => {
  let count = 0;
  if (filters.offerType !== defaultFilterValues.offerType) {
    count++;
  }
  Object.values(filters.categories).forEach((subcategories) => {
    if (subcategories.length > 0) {
      count += subcategories.length;
    }
  });
  if (filters.gender !== defaultFilterValues.gender) {
    count++;
  }
  count += filters.cities.length;

  return count;
};
