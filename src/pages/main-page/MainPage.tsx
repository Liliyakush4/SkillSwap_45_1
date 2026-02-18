import { useState } from 'react';
import { UserCard } from '@entities/user/ui/user-card';

export default function MainPage() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(12);

  return (
    <div style={{ padding: 24 }}>
      <h1>Главная страница</h1>

      <div
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(324px, 1fr))',
          gap: 16,
          alignItems: 'start',
        }}
      >
        {/* Вариант 1: с описанием и БЕЗ лайка */}
        <UserCard
          avatarSrc="https://i.pravatar.cc/150?img=32"
          name="Аня"
          city="Москва"
          age={26}
          about="Frontend-разработка, люблю аккуратные компоненты и ненавижу непредсказуемые отступы. Могу научить базовой архитектуре и стилю кода."
          skillsOffered={[
            { id: 1, text: 'React' },
            { id: 2, text: 'TypeScript' },
            { id: 3, text: 'CSS Modules' },
            { id: 4, text: 'Storybook' },
          ]}
          skillsWanted={[
            { id: 101, text: 'Figma' },
            { id: 102, text: 'UX' },
          ]}
          showLike={false}
        />

        {/* Вариант 2: С лайком и БЕЗ описания */}
        <UserCard
          avatarSrc="https://i.pravatar.cc/150?img=12"
          name="Игорь"
          city="Рига"
          skillsOffered={[
            { id: 11, text: 'Node.js' },
            { id: 12, text: 'PostgreSQL' },
          ]}
          skillsWanted={[
            { id: 201, text: 'React' },
            { id: 202, text: 'Redux' },
            { id: 203, text: 'Testing' },
          ]}
          showLike
          isLiked={liked}
          likesCount={likes}
          onLikeClick={() => {
            setLiked((v) => !v);
            setLikes((c) => (liked ? Math.max(0, c - 1) : c + 1));
          }}
          onMore={() => console.log('Подробнее')}
          moreLabel="Подробнее"
        />
      </div>
    </div>
  );
}
