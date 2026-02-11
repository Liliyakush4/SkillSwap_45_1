import React from 'react';
import styles from './Avatar.module.css';
import placeholderImg from '../../assets/icons/common/icon_person.svg';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Аватар',
  size,
  className = '',
}) => {
  const sizeStyle = size ? { width: size, height: size } : {};

  return (
    <div
      className={`${styles.avatarWrapper} ${className}`}
      style={sizeStyle}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.avatarImage} />
      ) : (
        <div className={styles.Avatar_placeholder}>
          <img
            src={src ?? placeholderImg}
            alt="заглушка"
            className={styles.avatarImage}
          />
        </div>
      )}
    </div>
  );
};