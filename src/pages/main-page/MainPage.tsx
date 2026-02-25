import { useMemo } from 'react';
import styles from './MainPage.module.css';
import { FiltersSidebar } from '@widgets/filters-sidebar';
import { CatalogSections } from '@widgets/catalog-sections';
import { UserCardSection } from '@widgets/user-card-section';
import { mapUserToUserCardProps } from '@entities/user/model/mappers';
import { useAppSelector } from '@shared/lib/storeHooks';
import { selectDb } from '@app/store/db/selectors';
import { selectFilters } from '@features/filters/model/selectors';
import { countAppliedFilters, createDefaultFilterValues } from '@features/filters/model/utils';

import {
  // 🔥 NEW — объединённый селектор
  selectSearchQuery, // 🔥 NEW — чтобы понимать, есть ли поиск
} from '@features/search/model';
import { selectUsersByFiltersAndSearch } from '@features/search/model/selectors';

export default function MainPage() {
  const db = useAppSelector(selectDb);
  const filters = useAppSelector(selectFilters);

  // 🔁 CHANGED — теперь берём объединённый результат
  const filteredUsers = useAppSelector(selectUsersByFiltersAndSearch);

  // 🔥 NEW — нужен для логики отображения
  const searchQuery = useAppSelector(selectSearchQuery);

  const appliedFiltersCount = useMemo(() => {
    if (!db) return 0;
    const defaults = createDefaultFilterValues(db.categories);
    return countAppliedFilters(filters, defaults);
  }, [db, filters]);

  const hasAppliedFilters = appliedFiltersCount > 0;

  // 🔥 NEW — проверяем, есть ли текст поиска
  const hasSearch = searchQuery.trim().length > 0;

  // 🔥 NEW — теперь результаты показываем, если есть фильтры ИЛИ поиск
  const shouldShowResults = hasAppliedFilters || hasSearch;

  const filteredItems = useMemo(() => {
    if (!db) return [];
    return filteredUsers.map((user) => mapUserToUserCardProps(db, user));
  }, [db, filteredUsers]);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <FiltersSidebar />
      </aside>

      <main className={styles.content}>
        {!db && <div className={styles.state}>Загрузка каталога...</div>}

        {/* 🔁 CHANGED — теперь учитываем поиск тоже */}
        {db && !shouldShowResults && (
          <div className={styles.catalogWrap}>
            <CatalogSections />
          </div>
        )}

        {/* 🔁 CHANGED — показываем результаты если есть фильтры или поиск */}
        {db && shouldShowResults && (
          <section className={styles.resultsSection}>
            {filteredItems.length > 0 ? (
              <UserCardSection
                title=""
                items={filteredItems}
                variant="grid"
                renderHeader={false}
                className={styles.resultsGrid}
              />
            ) : (
              <div className={styles.emptyState}>Ничего не найдено</div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
