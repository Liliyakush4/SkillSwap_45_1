import { useMemo, useState } from 'react';
import styles from './MainPage.module.css';
import { FiltersSidebar } from '@widgets/filters-sidebar';
import { CatalogSections } from '@widgets/catalog-sections';
import { UserCardSection } from '@widgets/user-card-section';
import { mapUserToUserCardProps } from '@entities/user/model/mappers';
import { useAppSelector } from '@shared/lib/storeHooks';
import { selectDb } from '@app/store/db/selectors';
import { selectFilters, selectFilteredUsers } from '@features/filters/model/selectors';
import { countAppliedFilters, createDefaultFilterValues } from '@features/filters/model/utils';
import { useNavigate } from 'react-router-dom';

type SortOrder = 'newest' | 'oldest';

export default function MainPage() {
  const db = useAppSelector(selectDb);
  const navigate = useNavigate();
  const filters = useAppSelector(selectFilters);
  const filteredUsers = useAppSelector(selectFilteredUsers);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const appliedFiltersCount = useMemo(() => {
    if (!db) return 0;
    const defaults = createDefaultFilterValues(db.categories);
    return countAppliedFilters(filters, defaults);
  }, [db, filters]);

  const hasAppliedFilters = appliedFiltersCount > 0;

  const filteredItems = useMemo(() => {
    if (!db || !filteredUsers) return [];

    // Сортируем пользователей по дате регистрации (предполагаем, что есть поле createdAt)
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return sortedUsers.map((user) =>
      mapUserToUserCardProps(db, user, {
        onMore: () => navigate(`/skill/${user.id}`),
        moreLabel: 'Подробнее',
        showLike: true,
      }),
    );
  }, [db, filteredUsers, navigate, sortOrder]);

  const handleSortToggle = () => {
    setSortOrder((prev: string) => (prev === 'newest' ? 'oldest' : 'newest'));
  };

  const sortActionLabel = sortOrder === 'newest' ? 'Сначала новые' : 'Сначала старые';

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <FiltersSidebar />
      </aside>

      <main className={styles.content}>
        {!db && <div className={styles.state}>Загрузка каталога...</div>}

        {db && !hasAppliedFilters && (
          <div className={styles.catalogWrap}>
            <CatalogSections />
          </div>
        )}

        {db && hasAppliedFilters && (
          <section className={styles.resultsSection}>
            {filteredItems.length > 0 ? (
              <UserCardSection
                title={`Подходящие предложения: ${filteredItems.length}`}
                items={filteredItems}
                variant="grid"
                renderHeader={true}
                className={styles.resultsGrid}
                onActionClick={handleSortToggle}
                actionLabel={sortActionLabel}
                allGrid={true}
              />
            ) : (
              <div className={styles.emptyState}>Ничего не найдено по выбранным фильтрам</div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
