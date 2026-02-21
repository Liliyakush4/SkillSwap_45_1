import { UserCardSection } from '@widgets/user-card-section';
import type { UserCardProps } from '@entities/user/ui/user-card';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  // Демо данные - в реальном приложении их нужно будет получать с сервера
  const users: Array<UserCardProps & { id: number }> = [
    {
      id: 1,
      avatarSrc: 'https://i.pravatar.cc/150?img=32',
      name: 'Аня',
      city: 'Москва',
      age: 26,
      about: 'Frontend-разработка',
      skillsOffered: [
        { id: 1, text: 'React' },
        { id: 2, text: 'TypeScript' },
      ],
      skillsWanted: [
        { id: 101, text: 'Figma' },
        { id: 102, text: 'UX' },
      ],
      showLike: true,
      isLiked: true,
      likesCount: 12,
    },
    {
      id: 2,
      avatarSrc: 'https://i.pravatar.cc/150?img=12',
      name: 'Игорь',
      city: 'Рига',
      skillsOffered: [
        { id: 11, text: 'Node.js' },
        { id: 12, text: 'PostgreSQL' },
      ],
      skillsWanted: [
        { id: 201, text: 'React' },
        { id: 202, text: 'Redux' },
      ],
      showLike: true,
      isLiked: true,
      likesCount: 8,
    },
    {
      id: 3,
      avatarSrc: 'https://i.pravatar.cc/150?img=20',
      name: 'Мария',
      city: 'Санкт-Петербург',
      age: 28,
      about: 'Дизайнер интерфейсов',
      skillsOffered: [
        { id: 31, text: 'Figma' },
        { id: 32, text: 'Adobe XD' },
      ],
      skillsWanted: [{ id: 301, text: 'React' }],
      showLike: true,
      isLiked: false,
      likesCount: 24,
    },
    {
      id: 4,
      avatarSrc: 'https://i.pravatar.cc/150?img=8',
      name: 'Алексей',
      city: 'Новосибирск',
      skillsOffered: [
        { id: 41, text: 'Python' },
        { id: 42, text: 'Django' },
      ],
      skillsWanted: [
        { id: 401, text: 'JavaScript' },
        { id: 402, text: 'React' },
      ],
      showLike: true,
      isLiked: true,
      likesCount: 5,
    },
    {
      id: 5,
      avatarSrc: 'https://i.pravatar.cc/150?img=25',
      name: 'Елена',
      city: 'Екатеринбург',
      age: 30,
      about: 'PM с 5-летним опытом',
      skillsOffered: [
        { id: 51, text: 'Управление проектами' },
        { id: 52, text: 'Agile' },
      ],
      skillsWanted: [{ id: 501, text: 'SQL' }],
      showLike: true,
      isLiked: false,
      likesCount: 18,
    },
  ];

  const favoriteUsers = users.filter((user) => user.isLiked);

  return (
    <UserCardSection
      title=""
      items={favoriteUsers}
      variant="grid"
      className={styles.container}
      renderHeader={false}
    />
  );
}
