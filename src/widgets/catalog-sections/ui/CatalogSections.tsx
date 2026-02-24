import React from 'react';
import { useAppSelector } from '@shared/lib/storeHooks';
import { selectDb } from '@app/store/db/selectors';
import { mapUserToUserCardProps } from '@entities/user/model/mappers';
import { UserCardSection } from '@widgets/user-card-section';

export const CatalogSections: React.FC = () => {
  const db = useAppSelector(selectDb);

  if (!db) {
    return null;
  }

  const users = db.users;

  const popularItems = users.map((user) => mapUserToUserCardProps(db, user));

  const sortedByNew = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const newItems = sortedByNew.map((user) => mapUserToUserCardProps(db, user));

  const recommendedItems = users.map((user) => mapUserToUserCardProps(db, user));

  return (
    <div>
      <UserCardSection title="Популярное" items={popularItems} variant="row" />
      <UserCardSection title="Новое" items={newItems} variant="row" />
      <UserCardSection title="Рекомендуем" items={recommendedItems} variant="grid" />
    </div>
  );
};
