import { type InputHTMLAttributes, forwardRef } from 'react';
import cls from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  errorText?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder,
      name,
      type = 'text',
      disabled,
      errorText,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasError = Boolean(errorText);

    return (
      <div
        className={[
          cls.wrapper,
          disabled ? cls.disabled : '',
          hasError ? cls.error : '',
          className ?? '',
        ].join(' ')}
      >
        {label && <label className={cls.label}>{label}</label>}

        <input
          ref={ref}
          className={cls.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          name={name}
          type={type}
          disabled={disabled}
          aria-invalid={hasError}
          {...rest}
        />

        {hasError && <span className={cls.errorText}>{errorText}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
