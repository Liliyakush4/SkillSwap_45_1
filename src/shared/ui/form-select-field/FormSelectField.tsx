import { useState, useRef, useEffect } from 'react';
import styles from './FormSelectField.module.css';
import clsx from 'clsx';


export interface FormSelectFieldProps {
  /** Подпись над полем */
  label?: string;
  /** Placeholder для поля */
  placeholder?: string;
  /** Текущее выбранное значение */
  value: string;
  /** Callback при выборе значения */
  onChange: (value: string) => void;
  /** Список опций для выбора */
  options: { value: string; label: string; disabled?: boolean }[];
  /** Отключает всё поле */
  disabled?: boolean;
  /** Текст ошибки (если есть, поле становится в состоянии ошибки) */
  errorText?: string;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Имя поля для форм */
  name?: string;
}

const iconArrowDown = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 15.935a2.52 2.52 0 0 1-1.781-.738L4.2 9.179a.696.696 0 0 1 0-.978.696.696 0 0 1 .978 0l6.018 6.018a1.136 1.136 0 0 0 1.606 0L18.821 8.2a.696.696 0 0 1 .978 0 .696.696 0 0 1 0 .978l-6.018 6.018a2.5 2.5 0 0 1-1.781.738"
      fill="currentColor"
    />
  </svg>
);

export function FormSelectField({
  label,
  placeholder = 'Не указан',
  value,
  onChange,
  options,
  disabled = false,
  errorText,
  className = '',
  name,
}: FormSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);
  const hasError = !!errorText;

  return (
    <div className={`${styles.wrapper} ${className}`} ref={ref}>
      {label && <div className={styles.label}>{label}</div>}

      <button
        type="button"
        className={clsx(
          styles.trigger,
          hasError && styles.triggerError,
          disabled && styles.triggerDisabled,
          isOpen && styles.triggerOpen,
          className,
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        role="listbox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        aria-invalid={hasError}
      >
        <span className={selected ? styles.value : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={styles.arrow}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          {iconArrowDown}
        </span>
      </button>

      {isOpen && (
        <div className={clsx(styles.dropdown, styles.custom_scroll, className)} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={[
                styles.option,
                value === option.value && styles.selected,
                option.disabled && styles.optionDisabled,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
              role="option"
              aria-selected={value === option.value}
              aria-disabled={option.disabled}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {errorText && <div className={styles.errorText}>{errorText}</div>}

      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
