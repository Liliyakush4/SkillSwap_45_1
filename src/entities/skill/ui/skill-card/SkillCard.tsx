import React from 'react';
import { ImageGallery } from '@shared/ui/ImageGallery';
import { Button } from '@shared/ui/Button';
import styles from './SkillCard.module.css';
import clsx from 'clsx';

export type SkillGalleryImage = { src: string; alt?: string };

export interface SkillCardProps {
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  images: SkillGalleryImage[];
  actions?: React.ReactNode;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  title,
  category,
  subcategory,
  description,
  images,
  actions,
  className,
}) => {
  return (
    <div className={clsx(styles.skillCard, className)}>
      <div className={styles.contentContainer}>
        <div className={styles.headerColumn}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.category}>
            {category} / {subcategory ? subcategory : ''}
          </div>
        </div>

        <div className={styles.descriptionColumn}>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actionsColumn}>
          {actions && <div className={styles.actionsContainer}>{actions}</div>}
        </div>

        <div className={styles.galleryColumn}>
          <ImageGallery images={images} variant={images.length > 4 ? 'static' : 'interactive'} />
        </div>
      </div>
    </div>
  );
};
