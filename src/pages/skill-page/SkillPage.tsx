import { SkillCard } from '@entities/skill/ui/skill-card';
import styles from './SkillPage.module.css';
import { UserCard, type UserCardProps } from '@entities/user/ui/user-card';
import { IconButton } from '@shared/ui/icon-button';
import heartIcon from '@shared/assets/icons/ui/icon_heart.svg';
import shareIcon from '@shared/assets/icons/ui/icon_copy_link.svg';
import ellipsisIcon from '@shared/assets/icons/ui/icon_ellipsis.svg';
import { Button } from '@shared/ui/Button';
import { useState } from 'react';
import { OfferCreatedModal } from '@widgets/modals/OfferCreatedModal';
import { UserCardSection } from '@widgets/user-card-section';

export default function SkillPage() {
  // Состояние для управления модальным окном
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Состояние для выбранного пользователя
  const [selectedUser, setSelectedUser] = useState<UserCardProps | null>(null);

  // Моковые данные для заполнения карточки навыков
  const skillData = {
    title: 'Игра на барабанах',
    category: 'Творчество и искусство',
    subcategory: 'Музыка и звук',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет —от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    images: [
      { src: '/image1.jpg', alt: 'Скриншот проекта 1' },
      { src: '/image2.jpg', alt: 'Скриншот проекта 2' },
      { src: '/image2.jpg', alt: 'Скриншот проекта 2' },
      { src: '/image2.jpg', alt: 'Скриншот проекта 2' },
      { src: '/image1.jpg', alt: 'Скриншот проекта 1' },
      { src: '/image2.jpg', alt: 'Скриншот проекта 2' },
    ],
  };

  // Моковые данные для заполнения карточки пользователя (по умолчанию)
  const defaultUserData = {
    avatarSrc: 'https://i.pravatar.cc/150?img=32',
    name: 'Аня',
    city: 'Москва',
    age: 26,
    about:
      'Frontend-разработка, люблю аккуратные компоненты и ненавижу непредсказуемые отступы. Могу научить базовой архитектуре и стилю кода.',
    skillsOffered: [
      { id: 1, text: 'React' },
      { id: 2, text: 'TypeScript' },
      { id: 3, text: 'CSS Modules' },
      { id: 4, text: 'Storybook' },
    ],
    skillsWanted: [
      { id: 101, text: 'Figma' },
      { id: 102, text: 'UX' },
    ],
    showLike: false,
  };

  // Используем выбранного пользователя или данные по умолчанию
  const userData = selectedUser || defaultUserData;

  // Моковые данные для карточек
  const cards: Array<UserCardProps & { id: string | number }> = [
    {
      id: 1,
      name: 'Анна Иванова',
      city: 'Москва',
      age: 25,
      skillsOffered: [
        { id: 1, text: 'React' },
        { id: 2, text: 'TypeScript' },
        { id: 3, text: 'Next.js' },
      ],
      skillsWanted: [
        { id: 4, text: 'Vue.js' },
        { id: 5, text: 'Node.js' },
      ],
      about: 'Frontend разработчик с опытом работы 3 года',
      showLike: true,
      likesCount: 15,
      isLiked: false,
      height: 'regular',
    },
    {
      id: 2,
      name: 'Петр Сидоров',
      city: 'Санкт-Петербург',
      age: 30,
      skillsOffered: [
        { id: 6, text: 'Python' },
        { id: 7, text: 'Django' },
        { id: 8, text: 'PostgreSQL' },
      ],
      skillsWanted: [
        { id: 9, text: 'React' },
        { id: 10, text: 'Docker' },
      ],
      about: 'Backend разработчик, ищу команду для интересных проектов',
      showLike: true,
      likesCount: 8,
      isLiked: true,
      height: 'regular',
    },
    {
      id: 3,
      name: 'Елена Козлова',
      city: 'Казань',
      age: 28,
      skillsOffered: [
        { id: 11, text: 'UI/UX дизайн' },
        { id: 12, text: 'Figma' },
        { id: 13, text: 'Adobe XD' },
      ],
      skillsWanted: [
        { id: 14, text: 'HTML/CSS' },
        { id: 15, text: 'JavaScript' },
      ],
      about: 'Продуктовый дизайнер, хочу прокачать фронтенд',
      showLike: true,
      likesCount: 23,
      isLiked: false,
      height: 'regular',
    },
    {
      id: 4,
      name: 'Михаил Новиков',
      city: 'Новосибирск',
      age: 32,
      skillsOffered: [
        { id: 16, text: 'Java' },
        { id: 17, text: 'Spring' },
        { id: 18, text: 'Kotlin' },
      ],
      skillsWanted: [
        { id: 19, text: 'Go' },
        { id: 20, text: 'Kubernetes' },
      ],
      about: 'Senior Java разработчик, интересуюсь микросервисами',
      showLike: true,
      likesCount: 42,
      isLiked: false,
      height: 'regular',
    },
    {
      id: 5,
      name: 'Анна Иванова',
      city: 'Москва',
      age: 54,
      skillsOffered: [
        { id: 1, text: 'React' },
        { id: 2, text: 'TypeScript' },
        { id: 3, text: 'Next.js' },
      ],
      skillsWanted: [
        { id: 4, text: 'Vue.js' },
        { id: 5, text: 'Node.js' },
      ],
      about: 'Frontend разработчик с опытом работы 3 года',
      showLike: true,
      likesCount: 15,
      isLiked: false,
      height: 'regular',
    },
  ];

  // Функция для открытия модального окна
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Функция для обработки клика по кнопке "Подробнее"
  const handleUserMoreClick = (userData: UserCardProps) => {
    setSelectedUser({
      ...userData,
      showLike: false, // Убираем лайк в верхней карточке
    });
  };

  // Подготавливаем карточки с обработчиком onMore
  const cardsWithHandlers = cards.map((card) => ({
    ...card,
    onMore: () => handleUserMoreClick(card),
    moreLabel: 'Подробнее', // Добавляем текст кнопки
  }));

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
            <IconButton
              icon={<img src={heartIcon} alt="" />}
              variant="ghost"
              isActive={false}
              className=""
              type="button"
              disabled={false}
              aria-label="ariaLabel"
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
            category={skillData.category}
            subcategory={skillData.subcategory}
            description={skillData.description}
            images={skillData.images}
            className={styles.skillSectionCard}
            actions={actions} // Передаем кнопки в SkillCard
            // variant='interactiv'
          />
        </div>
      </div>
      <UserCardSection
        title="Похожие предложения"
        items={cardsWithHandlers}
        limit={10}
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
