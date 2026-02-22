import { useState } from 'react';
import { RadioGroup } from '@shared/ui/radio-group/RadioGroup';
import { CheckboxGroup } from '@shared/ui/checkbox-group/CheckboxGroup';
import { Button } from '@shared/ui/Button/Button';
import { CITIES } from '@shared/lib/constants/cities';
import { CATEGORIES } from '@shared/lib/constants/categories';
import { SKILL_TYPE, GENDER } from '@features/filters/model/defaults';
import iconArrowDown from '@shared/assets/icons/ui/icon_arrow_up.svg';
import styles from './FiltersSidebar.module.css';
import iconCross from '@shared/assets/icons/ui/icon_close.svg';
import { Checkbox } from '@shared/ui/checkbox';
import { SUBCATEGORIES } from '@shared/lib/constants/subcategories';
import clsx from 'clsx';
import type { TFilterValues, TCategoriesSelected } from '@features/filters/model/types';

// т.к. у нас категорию нельзя выбрать, если не выбрана подкатегория
// делаем объект с id всех категорий - ключами,
// а список айди подкатегорий - значениями
// айди подкатегорий строки из-за чекбокса

const categories: TCategoriesSelected = CATEGORIES.reduce((acc, category) => {
  acc[category.id] = [];
  return acc;
}, {} as TCategoriesSelected);

const defaultFilterValues: TFilterValues = {
  offerType: SKILL_TYPE[0].value,
  categories: categories,
  gender: GENDER[0].value,
  cities: [],
};

export const FiltersSidebar = () => {
  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  const [isCitiesExpanded, setIsCitiesExpanded] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(6);
  const [visibleCitiesCount, setVisibleCitiesCount] = useState(5);

  const countAppliedFilters = (filters: TFilterValues): number => {
    let count = 0;
    if (filters.offerType !== SKILL_TYPE[0].value) {
      count++;
    }
    Object.values(filters.categories).forEach((subcategories) => {
      if (subcategories.length > 0) {
        count += subcategories.length;
      }
    });
    if (filters.gender !== GENDER[0].value) {
      count++;
    }
    count += filters.cities.length;

    return count;
  };

  const handleFilterChange = (name: string, value: string | string[] | TCategoriesSelected) => {
    setFilterValues((prevValues) => {
      const newFilterValues = {
        ...prevValues,
        [name]: value,
      };
      setAppliedFiltersCount(countAppliedFilters(newFilterValues));
      return newFilterValues;
    });
  };

  const toggleCategoriesVisibility = () => {
    if (isCategoriesExpanded) {
      setIsCategoriesExpanded(false);
      setVisibleCategoryCount(6);
    } else {
      setIsCategoriesExpanded(true);
      setVisibleCategoryCount(CATEGORIES.length);
    }
  };

  const toggleCitiesVisibility = () => {
    if (isCitiesExpanded) {
      setIsCitiesExpanded(false);
      setVisibleCitiesCount(5);
    } else {
      setIsCitiesExpanded(true);
      setVisibleCitiesCount(CITIES.length);
    }
  };

  return (
    <div className={styles.filtersSidebar}>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterHeaderTitle}>
          Фильтры {appliedFiltersCount ? `(${appliedFiltersCount})` : ''}
        </h2>
        {appliedFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={() => {
              setFilterValues(defaultFilterValues);
              setAppliedFiltersCount(0);
              setExpandedCategories([]);
            }}
            className={styles.resetBtn}
          >
            Сбросить <img src={iconCross} className={styles.icon} alt="Сбросить" />
          </Button>
        )}
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.section}>
          <RadioGroup
            name="offerType"
            options={SKILL_TYPE}
            value={filterValues.offerType}
            onChange={(value) => handleFilterChange('offerType', value)}
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Навыки</h3>
          <div className={styles.checkboxGroup}>
            {CATEGORIES.slice(0, visibleCategoryCount).map((category) => (
              <div key={category.id}>
                <Checkbox
                  label={category.name}
                  checked={expandedCategories.includes(category.id)}
                  onChange={(checked) =>
                    checked
                      ? setExpandedCategories((prev) => [...prev, category.id])
                      : setExpandedCategories((prev) => prev.filter((id) => id !== category.id))
                  }
                  checkedMark="dash"
                />
                <div
                  className={clsx(
                    styles.subcategoriesContainer,
                    !expandedCategories.includes(category.id) && styles.hidden,
                  )}
                >
                  <CheckboxGroup
                    name="subCategories"
                    options={SUBCATEGORIES[category.id]}
                    value={filterValues.categories[category.id]}
                    onChange={(values) =>
                      handleFilterChange('categories', {
                        ...filterValues.categories,
                        [category.id]: values,
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              className={styles.arrowBtn}
              aria-label={isCategoriesExpanded ? 'Свернуть категории' : 'Показать все категории'}
              onClick={toggleCategoriesVisibility}
            >
              {isCategoriesExpanded ? 'Свернуть' : 'Все категории'}
              <img
                src={iconArrowDown}
                className={clsx(styles.icon, isCategoriesExpanded && styles.iconRotated)}
                alt="Развернуть/свернуть"
              />
            </Button>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Пол автора</h3>
          <RadioGroup
            name="gender"
            options={GENDER}
            value={filterValues.gender}
            onChange={(value) => handleFilterChange('gender', value)}
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Город</h3>
          <div className={styles.checkboxGroup}>
            <CheckboxGroup
              name="cities"
              options={CITIES.slice(0, visibleCitiesCount)}
              value={filterValues.cities}
              onChange={(values) => handleFilterChange('cities', values)}
            />
            <Button
              variant="ghost"
              className={styles.arrowBtn}
              aria-label={isCitiesExpanded ? 'Свернуть города' : 'Показать все города'}
              onClick={toggleCitiesVisibility}
            >
              {isCitiesExpanded ? 'Свернуть' : 'Все города'}
              <img
                src={iconArrowDown}
                className={clsx(styles.icon, isCitiesExpanded && styles.iconRotated)}
                alt="Развернуть/свернуть"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
