import React, { useState, type ChangeEvent, type DragEvent } from 'react';
import styles from './FileDropzone.module.css';
import iconPhotoAdd from '../../assets/icons/ui/icon_photo_add.svg';

export interface FileDropzoneProps {
  onChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  className?: string;
  errorText?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onChange,
  multiple = true,
  accept = 'image/*',
  disabled = false,
  className = '',
  errorText,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      onChange(files);
    }
    e.target.value = '';
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragActive(true);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    const files = e.dataTransfer.files ? Array.from(e.dataTransfer.files) : [];
    if (files.length > 0) {
      onChange(files);
    }
  };

  const rootClasses = [
    styles.dropzone,
    isDragActive ? styles.active : '',
    errorText ? styles.error : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .join(' ')
    .trim();

  return (
    <>
      <label
        className={rootClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled}
        />

        <p className={styles.mainText}>Перетащите или выберите изображения навыка</p>

        <div className={styles.selectImageContainer}>
          <img src={iconPhotoAdd} alt="Картинка выбрать изображения" className={styles.icon} />
          <span className={styles.selectImageText}>Выбрать изображения</span>
        </div>
      </label>

      {errorText && <span className={styles.errorMessage}>{errorText}</span>}
    </>
  );
};
