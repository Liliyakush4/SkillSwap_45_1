import { SkillCard } from '@entities/skill/ui/skill-card';
import styles from './SkillPage.module.css';
import { UserCard } from '@entities/user/ui/user-card';
import { IconButton } from '@shared/ui/icon-button';
import shareIcon from '@shared/assets/icons/ui/icon_copy_link.svg';
import ellipsisIcon from '@shared/assets/icons/ui/icon_ellipsis.svg';
import { Button } from '@shared/ui/Button';
import { useCallback, useState } from 'react';
import { OfferCreatedModal } from '@widgets/modals/OfferCreatedModal';
import { UserCardSection } from '@widgets/user-card-section';
import { useSelector } from 'react-redux';
import { mapUserToUserCardProps } from '@entities/user/model';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/storeHooks';
import { selectFavoriteUserIds, toggleFavorite } from '@features/favorites/model/favoritesSlice';
import { selectDb } from '@app/store/db/selectors';
import { FavoriteToggle } from '@shared/ui/favorite-toggle';

export default function SkillPage() {
  const db = useSelector(selectDb);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isLikedData = useSelector(selectFavoriteUserIds);

  const handlerLike = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch],
  );

  // 2. Проверки и ранние return — только ПОСЛЕ всех хуков
  if (!db) {
    return <div>Загрузка данных...</div>;
  }

  const user = db.usersById[Number(id)];

  const userData = mapUserToUserCardProps(db, user, {
    onLikeClick: () => dispatch(toggleFavorite(user.id)),
    showLike: false,
  });

  const skillData = db.skillsById[user.skillsOfferedIds[0]];
  const skillCategory = db.categoriesById[skillData.categoryId];
  const skillSubcategory = db.subcategoriesById[skillData.subcategoryId];

  const users = db.users.filter((user) => {
    const hasOfferedSkill = user.skillsOfferedIds.some((id) => id === skillData.id);
    const hasWantedSkill = user.skillsWantedIds.some((id) => id === skillData.id);
    const notMe = user.id !== userData.id;
    const sameCity = user.cityId === Number(userData.city);
    return (notMe && hasOfferedSkill) || hasWantedSkill || sameCity;
  });

  const cards = users.map((user) =>
    mapUserToUserCardProps(db, user, {
      onMore: () => navigate(`/skill/${user.id}`),
      onLikeClick: () => handlerLike(user.id),
      showLike: true,
      likesCount: isLikedData.includes(user.id) ? 1 : undefined, // можно юзерам добавить поле со списком лайкнувших и приплюсовать сюда
      isLiked: isLikedData.includes(user.id),
      moreLabel: 'Подробнее',
    }),
  );

  // Функция для открытия модального окна
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Создаем кнопку с использованием компонента Button
  const actions = (
    <div className={styles.actions}>
      <Button
        variant="primary"
        className={styles.editButton}
        onClick={handleOpenModal} // Передаем функцию открытия
      >
        Предложить обмен
      </Button>
    </div>
  );

  return (
    <div className={styles.pageContent}>
      <div className={styles.skillSection}>
        <UserCard
          avatarSrc={userData.avatarSrc}
          name={userData.name}
          city={userData.city}
          age={userData.age}
          about={userData.about}
          skillsOffered={userData.skillsOffered}
          skillsWanted={userData.skillsWanted}
          showLike={userData.showLike}
          className={styles.skillSectionUserCard}
          height="compact"
        />
        <div className={styles.skillContainer}>
          <div className={styles.smallIconButton}>
            <FavoriteToggle
              isActive={isLikedData.includes(userData.id)}
              onClick={() => handlerLike(userData.id)}
              className={styles.favoriteToggle}
            />
            <IconButton
              icon={<img src={shareIcon} alt="" />}
              variant="ghost"
              isActive={false}
              className=""
              type="button"
              disabled={false}
              aria-label="ariaLabel"
            />
            <IconButton
              icon={<img src={ellipsisIcon} alt="" />}
              variant="ghost"
              isActive={false}
              className=""
              type="button"
              disabled={false}
              aria-label="ariaLabel"
            />
          </div>
          <SkillCard
            title={skillData.title}
            category={skillCategory.name}
            subcategory={skillSubcategory.name}
            description={skillData.description}
            images={skillData.images}
            className={styles.skillSectionCard}
            actions={actions} // Передаем кнопки в SkillCard
            variant="interactive"
          />
        </div>
      </div>
      <UserCardSection
        title="Похожие предложения"
        items={cards}
        limit={100}
        className={styles.section}
        variant="row"
        cardListClassName={styles.similarUserCard}
        showNavigation={true}
      />

      {/* Добавляем модальное окно */}
      <OfferCreatedModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
