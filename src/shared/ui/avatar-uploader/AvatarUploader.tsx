import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './AvatarUploader.module.css';

interface AvatarUploaderProps {
  src?: string;
  alt?: string;
  size?: number | string;
  onAddPhoto?: (file: File) => void;
  icon?: React.ReactNode;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  src,
  alt,
  size = 100,
  onAddPhoto,
  icon,
}) => {
  const handleButtonClick = () => {
    document.getElementById('file-input')?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleButtonClick();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (onAddPhoto) {
        onAddPhoto(file);
      }
    } else if (file) {
      console.warn('Выбранный файл не является изображением:', file.name);
    }
    e.target.value = '';
  };

  const defaultIcon = (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="2" y1="8" x2="14" y2="8" />
    </svg>
  );

  return (
    <div
      className={styles.avatarContainer}
      style={{ '--size': typeof size === 'number' ? `${size}px` : size } as React.CSSProperties}
    >
      <Avatar src={src} alt={alt} size={size} />

      <button
        aria-label={src ? 'Изменить аватар' : 'Добавить аватар'}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={styles.avatarButton}
      >
        {icon || defaultIcon} {/* Используем переданную иконку или дефолтную */}
      </button>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        className={styles.avatarInput}
        onChange={handleFileChange}
        aria-label="Загрузить аватар"
      />
    </div>
  );
};
