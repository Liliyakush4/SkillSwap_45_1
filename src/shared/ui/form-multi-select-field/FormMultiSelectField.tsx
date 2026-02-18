import { useState, useRef, useEffect, useId } from 'react';
import clsx from 'clsx';
import styles from './FormMultiSelectField.module.css';
import { CheckboxGroup } from '@shared/ui/checkbox-group';
import iconArrowDown from '../../assets/icons/ui/icon_arrow_down.svg';
import iconArrowUp from '../../assets/icons/ui/icon_arrow_up.svg';

export type MultiSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type FormMultiSelectFieldProps = {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  disabled?: boolean;
  errorText?: string;
  name?: string;
  className?: string;
};

export function FormMultiSelectField({
  label,
  placeholder = 'Не указано',
  value,
  onChange,
  options,
  disabled = false,
  errorText,
  name,
  className,
}: FormMultiSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const errorId = useId();
  const hasError = Boolean(errorText);

  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const triggerText = value.length === 0 ? placeholder : `Выбрано: ${value.length}`;
  const ArrowIcon = isOpen ? iconArrowUp : iconArrowDown;

  return (
    <div
      ref={containerRef}
      className={clsx(styles.wrapper, disabled && styles.disabled, className)}
    >
      {label && <label className={styles.label}>{label}</label>}

      <button
        type="button"
        className={clsx(
          styles.trigger,
          hasError && styles.triggerError,
          disabled && styles.triggerDisabled,
          isOpen && styles.triggerOpen,
        )}
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      >
        <span className={clsx(value.length === 0 && styles.placeholderText)}>{triggerText}</span>
        <img src={ArrowIcon} alt="" aria-hidden className={styles.arrow} />
      </button>

      {isOpen && (
        <div id={listId} className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            <CheckboxGroup
              options={options}
              value={value}
              onChange={onChange}
              disabled={disabled}
              name={name}
            />
          </div>
        </div>
      )}

      {hasError && (
        <p id={errorId} className={styles.errorText}>
          {errorText}
        </p>
      )}
    </div>
  );
}
