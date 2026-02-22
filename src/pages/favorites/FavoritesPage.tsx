import { useMemo } from 'react';
import { UserCardSection } from '@widgets/user-card-section';
import { useAppDispatch, useAppSelector } from '@shared/lib/storeHooks';
import { selectFavoriteUserIds, toggleFavorite } from '@features/favorites/model/favoritesSlice';
import { mapUserToUserCardProps } from '@entities/user/model';
import styles from './FavoritesPage.module.css';

import { selectDb } from '@app/store/db/selectors';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const db = useAppSelector(selectDb);
  const favoriteUserIds = useAppSelector(selectFavoriteUserIds);

  const favoriteIdsSet = useMemo(() => new Set(favoriteUserIds.map(Number)), [favoriteUserIds]);

  if (!db) {
    return <div className={styles.empty}>Загрузка...</div>;
  }

  const users = db.users;

  const items = users
    .filter((user) => favoriteIdsSet.has(user.id))
    .map((user) =>
      mapUserToUserCardProps(db, user, {
        showLike: true,
        isLiked: true,
        onLikeClick: () => dispatch(toggleFavorite(user.id)),
      }),
    );

  if (items.length === 0) {
    return <div className={styles.empty}>В избранном пока пусто</div>;
  }

  return (
    <UserCardSection
      title=""
      items={items}
      variant="grid"
      className={styles.container}
      renderHeader={false}
    />
  );
}
