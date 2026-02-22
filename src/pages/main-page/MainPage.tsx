import { useState } from 'react';
import { SkillPreviewModal } from '@widgets/modals/skill-preview-modal';
import type { SkillCardProps } from '@entities/skill/ui/skill-card';

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(true);

  const skillData: SkillCardProps = {
    title: 'Тест SkillCard в модалке',
    category: 'Менеджмент',
    subcategory: 'PM',
    description:
      'Проверяем, что модалка открывается, SkillCard рендерится, а картинки в галерее отображаются.',
    images: [
      { src: 'https://picsum.photos/seed/skillswap2/900/600', alt: 'Demo 2' },
      { src: 'https://picsum.photos/seed/skillswap3/900/600', alt: 'Demo 3' },
      { src: 'https://picsum.photos/seed/skillswap2/900/600', alt: 'Demo 2' },
      { src: 'https://picsum.photos/seed/skillswap3/900/600', alt: 'Demo 3' },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => setIsOpen(true)}>Открыть модалку</button>

      <SkillPreviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        skillData={skillData}
        variant="static"
        onEdit={() => console.log('edit')}
        onConfirm={() => console.log('confirm')}
      />
    </div>
  );
}
