import React from 'react';
import styles from './FileDropzone.module.css';
import iconPhotoAdd from '../../assets/icons/ui/icon_photo_add.svg';

// : React.FC<FileDropzoneProps>

export interface FileDropzoneProps {
  onChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  className?: string;
  errorText?: string;
}

export const FileDropzone = () =>
  // {
  // onChange,
  // multiple = true,
  // accept = 'image',
  // disabled = false,
  // className = '',
  // errorText = '',
  // },
  {
    return (
      <label className={styles.dropzone}>
        <input type="file" hidden />
        <p className={styles.mainText}>Перетащите или выберите изображения навыка</p>
        <div className={styles.selectImageContainer}>
          <img src={iconPhotoAdd} alt="Выбрать изоброжения" />
          <p className={styles.selectImageText}>Выбрать изображения</p>
        </div>
      </label>
    );
  };
