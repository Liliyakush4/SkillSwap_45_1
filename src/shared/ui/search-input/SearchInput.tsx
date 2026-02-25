import { Input } from '../input';
import { type InputProps } from '@shared/ui/input';
import cls from './SearchInput.module.css';
import searchIcon from '@shared/assets/icons/ui/icon_search.svg';
import { useRef } from 'react';

export type SearchInputProps = Pick<
  InputProps,
  'value' | 'onChange' | 'placeholder' | 'className'
> & {
  onSearch?: () => void;
  onClear?: () => void;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  className,
  onSearch,
  onClear,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    inputRef.current?.focus();
    if (!value.trim()) return;
    onSearch?.();
  };

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={[cls.container, className ?? ''].join(' ')}>
      <button type="button" className={cls.iconButton} aria-label="Поиск" onClick={handleSearch}>
        <img src={searchIcon} alt="" aria-hidden="true" />
      </button>

      <Input
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cls.input}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />

      {value && (
        <button
          type="button"
          className={cls.clearButton}
          aria-label="Очистить поиск"
          onClick={handleClear}
        >
          Л
        </button>
      )}
    </div>
  );
};
