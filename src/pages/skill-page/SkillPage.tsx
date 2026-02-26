import { SkillCard } from '@entities/skill/ui/skill-card';
import styles from './SkillPage.module.css';
import { UserCard } from '@entities/user/ui/user-card';
import { IconButton } from '@shared/ui/icon-button';
import shareIcon from '@shared/assets/icons/ui/icon_copy_link.svg';
import ellipsisIcon from '@shared/assets/icons/ui/icon_ellipsis.svg';
import { Button } from '@shared/ui/Button';
import { useCallback, useState } from 'react';
import { UserCardSection } from '@widgets/user-card-section';
import { useSelector } from 'react-redux';
import { mapUserToUserCardProps } from '@entities/user/model';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/storeHooks';
import { selectFavoriteUserIds, toggleFavorite } from '@features/favorites/model/favoritesSlice';
import { selectDb } from '@app/store/db/selectors';
import { FavoriteToggle } from '@shared/ui/favorite-toggle';
import { selectIsAuthenticated } from '@features/auth/model/selectors';
import { OfferLoginModal } from '@widgets/modals/OfferLoginModal';
import { OfferPreviewModal } from '@widgets/modals/OfferPreviewModal';
import clockIcon from '@shared/assets/icons/common/icon_clock.svg';

export default function SkillPage() {
  const db = useSelector(selectDb);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferSent, setIsOfferSent] = useState(false);
  const { id } = useParams<{ id: string }>();
  const isLikedData = useSelector(selectFavoriteUserIds);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handlerLike = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch],
  );

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
      likesCount: isLikedData.includes(user.id) ? 1 : undefined,
      isLiked: isLikedData.includes(user.id),
      moreLabel: 'Подробнее',
    }),
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSendOffer = () => {
    if (isAuthenticated) {
      setIsOfferSent(true);
      // Здесь можно добавить логику отправки предложения на сервер
    }
  };

  // Новый обработчик для клика по кнопке
  const handleButtonClick = () => {
    if (isOfferSent) {
      // Если предложение уже отправлено - переходим на главную
      navigate('/');
    } else {
      // Если предложение еще не отправлено - открываем модальное окно
      handleOpenModal();
    }
  };

  // Определяем текст и вариант кнопки в зависимости от состояния
  const getButtonConfig = () => {
    if (isAuthenticated && isOfferSent) {
      return {
        text: 'Обмен предложен',
        variant: 'secondary' as const,
        disabled: false,
        icon: <img src={clockIcon} alt="" className={styles.buttonIcon} />,
      };
    }
    return {
      text: 'Предложить обмен',
      variant: 'primary' as const,
      disabled: false,
      icon: null,
    };
  };

  const buttonConfig = getButtonConfig();

  const actions = (
    <div className={styles.actions}>
      <Button
        variant={buttonConfig.variant}
        className={`${styles.editButton} ${isOfferSent ? styles.sentButton : ''}`}
        onClick={handleButtonClick} // Используем новый обработчик
        disabled={buttonConfig.disabled}
      >
        {buttonConfig.icon && <span className={styles.iconWrapper}>{buttonConfig.icon}</span>}
        {buttonConfig.text}
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
            actions={actions}
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

      {isAuthenticated && (
        <OfferPreviewModal
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
            handleSendOffer(); // Вызываем при закрытии модального окна
          }}
        />
      )}
      {!isAuthenticated && <OfferLoginModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
}
