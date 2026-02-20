import { useState } from 'react';
import { RadioGroup } from '../../shared/ui/radio-group/RadioGroup';
import { CheckboxGroup } from '../../shared/ui/checkbox-group/CheckboxGroup';
import { Button } from '../../shared/ui/Button/Button';
import { CITIES } from '../../shared/lib/constants/cities';
import { CATEGORIES } from '@shared/lib/constants/categories';
import { SKILL_TYPE, GENDER } from '../../shared/lib/constants/filters';
import iconArrowDown from '../../shared/assets/icons/ui/icon_arrow_down.svg';
import styles from './FiltersSidebar.module.css';
import iconCross from '../../shared/assets/icons/ui/icon_close.svg';
import { Checkbox } from '@shared/ui/checkbox';
import { SUBCATEGORIES } from '@shared/lib/constants/subcategories';
import clsx from 'clsx';

// т.к. у нас категорию нельзя выбрать, если не выбрана подкатегория
// делаем объект с id всех категорий - ключами,
// а список айди подкатегорий - значениями
// айди подкатегорий строки из-за чекбокса
type TCategoriesSelected = {
  [key: number]: string[];
};

type FilterValues = {
  offerType: string;
  categories: TCategoriesSelected;
  gender: string;
  cities: string[];
};

const categories: TCategoriesSelected = CATEGORIES.reduce((acc, category) => {
  acc[category.id] = [];
  return acc;
}, {} as TCategoriesSelected);

const defaultFilterValues: FilterValues = {
  offerType: SKILL_TYPE[0].value,
  categories: categories,
  gender: GENDER[0].value,
  cities: [],
};

export const FiltersSidebar = () => {
  const [filterValues, setFilterValues] = useState(defaultFilterValues); // Выбранные фильтры
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0); // Количество применённых фильтров
  const [isCitiesExpanded, setIsCitiesExpanded] = useState(false); // Все города >
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false); // Все категории >
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]); // развернутые категории

  const countAppliedFilters = (filters: FilterValues): number => {
    let count = 0;
    if (filters.offerType !== SKILL_TYPE[0].value) {
      count++;
    }
    Object.values(filters.categories).forEach((subcategories) => {
      if (subcategories.length > 0) {
        count++;
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

  return (
    <div className={styles.filtersSidebar}>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterHeaderTitle}>
          Фильтры {appliedFiltersCount ? `(${appliedFiltersCount})` : ''}
        </h2>
        <Button
          variant="ghost"
          onClick={() => {
            setFilterValues(defaultFilterValues);
            setAppliedFiltersCount(0);
          }}
          className={styles.resetBtn}
        >
          Сбросить <img src={iconCross} className={styles.icon} alt="Сбросить" />
        </Button>
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
            {CATEGORIES.map((category) => (
              <>
                <Checkbox
                  key={category.id}
                  label={category.name}
                  checked={expandedCategories.includes(category.id)}
                  onChange={(
                    checked, // открываем-закрываем аккордеон
                  ) =>
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
                    value={filterValues.categories[category.id]} // id (string) выбранных подкатегорий
                    onChange={(values) =>
                      handleFilterChange('categories', {
                        ...filterValues.categories,
                        [category.id]: values,
                      })
                    }
                  />
                </div>
              </>
            ))}
            <Button
              variant="ghost"
              disabled
              className={styles.arrowBtn}
              aria-label="Показать все категории"
              onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
            >
              Все категории
              <img src={iconArrowDown} className={styles.icon} alt="icon" aria-hidden="true" />
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
              options={CITIES}
              value={filterValues.cities.slice(0, 6)}
              onChange={(values) => handleFilterChange('cities', values)}
            />
            <Button
              onClick={() => setIsCitiesExpanded(!isCitiesExpanded)}
              className={styles.arrowBtn}
            >
              {isCitiesExpanded ? 'Свернуть' : 'Все города'}
              <img src={iconArrowDown} className={styles.icon} alt="Развернуть" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
