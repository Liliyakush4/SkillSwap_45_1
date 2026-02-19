import { useState, useEffect, useRef, useCallback } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Button';
import styles from './BirthDateInput.module.css';
import { ru } from 'date-fns/locale/ru';
import calendarIcon from '../../assets/icons/ui/icon_calendar.svg';

registerLocale('ru', ru);

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const BirthDateInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputValue = formatDate(selectedDate);

  const handleCancel = useCallback(() => {
    setTempDate(selectedDate);
    setIsOpen(false);
  }, [selectedDate]);

  const handleConfirm = useCallback(() => {
    if (tempDate) {
      setSelectedDate(tempDate);
    }
    setIsOpen(false);
  }, [tempDate]);

  const handleDateChange = (date: Date | null) => {
    setTempDate(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setSelectedDate(null);
      setTempDate(null);
      return;
    }

    const dateMatch = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setTempDate(parsedDate);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, handleCancel]);

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          placeholder="дд.мм.гггг"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => {
            setTempDate(selectedDate);
            setIsOpen(true);
          }}
          className={styles.inputField}
        />

        <button
          type="button"
          className={styles.iconWrapper}
          onClick={() => {
            setTempDate(selectedDate);
            setIsOpen(true);
          }}
          aria-label="Открыть календарь"
        >
          <img src={calendarIcon} alt="Открыть календарь" className={styles.calendarIcon} />
        </button>
      </div>

      {isOpen && (
        <div ref={popupRef} className={styles.calendarPopup}>
          <DatePicker
            selected={tempDate}
            onChange={handleDateChange}
            inline
            locale="ru"
            showMonthYearPicker={false}
            monthsShown={1}
            showWeekNumbers={false}
            fixedHeight
            dayClassName={(date) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = tempDate && date.toDateString() === tempDate.toDateString();
              let className = '';
              if (isToday && isSelected) {
                className = 'react-datepicker__day--selected react-datepicker__day--today';
              } else if (isToday) {
                className = 'react-datepicker__day--today';
              } else if (isSelected) {
                className = 'react-datepicker__day--selected';
              }
              return className;
            }}
          />
          <div className={styles.buttonGroup}>
            <Button variant="secondary" onClick={handleCancel}>
              Отменить
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthDateInput;
