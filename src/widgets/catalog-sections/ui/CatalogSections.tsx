import React from 'react';
import { useAppSelector } from '@shared/lib/storeHooks';
import { selectDb } from '@app/store/db/selectors';
import { mapUserToUserCardProps } from '@entities/user/model/mappers';
import { UserCardSection } from '@widgets/user-card-section';
import { useNavigate } from 'react-router-dom';

export const CatalogSections: React.FC = () => {
  const db = useAppSelector(selectDb);
  const navigate = useNavigate();

  if (!db) {
    return null;
  }

  const users = db.users;

  const popularItems = users.map((user) =>
    mapUserToUserCardProps(db, user, {
      onMore: () => navigate(`/skill/${user.id}`),
      moreLabel: 'Подробнее',
      showLike: true,
    }),
  );

  const sortedByNew = [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const newItems = sortedByNew.map((user) =>
    mapUserToUserCardProps(db, user, {
      onMore: () => navigate(`/skill/${user.id}`),
      moreLabel: 'Подробнее',
      showLike: true,
    }),
  );

  const recommendedItems = users.map((user) =>
    mapUserToUserCardProps(db, user, {
      onMore: () => navigate(`/skill/${user.id}`),
      moreLabel: 'Подробнее',
      showLike: true,
    }),
  );

  return (
    <>
      <UserCardSection
        title="Популярное"
        items={popularItems}
        variant="row"
        onActionClick={() => {}}
        actionLabel="Смотреть все"
      />
      <UserCardSection
        title="Новое"
        items={newItems}
        variant="row"
        onActionClick={() => {}}
        actionLabel="Смотреть все"
      />
      <UserCardSection title="Рекомендуем" items={recommendedItems} variant="grid" />
    </>
  );
};
