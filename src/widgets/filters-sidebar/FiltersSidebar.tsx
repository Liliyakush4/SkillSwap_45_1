import { useState } from 'react';
import { RadioGroup } from '../../shared/ui/radio-group/RadioGroup';
import { CheckboxGroup } from '../../shared/ui/checkbox-group/CheckboxGroup';
import { Button } from '../../shared/ui/Button/Button';
import { CITIES } from '../../shared/lib/constants/cities';
import { SKILL_CATEGORIES } from '../../shared/lib/constants/categories';
import { SKILL_TYPE, GENDER } from '../../shared/lib/constants/filters';
import iconArrowDown from '../../shared/assets/icons/ui/icon_arrow_down.svg';
import styles from './FiltersSidebar.module.css';

type FilterValues = {
  offerType: string;
  categories: string[];
  gender: string;
  cities: string[];
};

const defaultFilterValues: FilterValues = {
  offerType: SKILL_TYPE[0].value,
  categories: [],
  gender: GENDER[0].value,
  cities: [],
};

const FiltersSidebar = () => {
  const [filterValues, setFilterValues] = useState(defaultFilterValues);

  // минимальный функционал для тестирования
  const handleFilterChange = (name: string, value: string | string[]) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={styles.filtersSidebar}>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterHeaderTitle}>Фильтры</h2>
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
            <CheckboxGroup
              name="categories"
              options={SKILL_CATEGORIES}
              value={filterValues.categories}
              onChange={(values) => handleFilterChange('categories', values)}
            />
            <Button disabled className={styles.arrowBtn} aria-label="Показать все категории">
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
              value={filterValues.cities}
              onChange={(values) => handleFilterChange('cities', values)}
            />
            <Button disabled className={styles.arrowBtn}>
              Все города
              <img src={iconArrowDown} className={styles.icon} alt="icon" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
