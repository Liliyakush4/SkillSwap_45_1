import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Button';
import styles from './BirthDateInput.module.css';
import { ru } from 'date-fns/locale/ru';

registerLocale('ru', ru);

import calendarIcon from '../../assets/icons/ui/icon_calendar.svg';

const BirthDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setTempDate(selectedDate);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
    }
    setIsOpen(false);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';

    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="дд.мм.гггг"
          value={formatDate(selectedDate)}
          readOnly
          onClick={() => {
            setTempDate(selectedDate);
            setIsOpen(true);
          }}
          className={styles.inputField}
        />

        <div
          className={styles.iconWrapper}
          onClick={() => {
            setTempDate(selectedDate);
            setIsOpen(true);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setTempDate(selectedDate);
              setIsOpen(true);
            }
          }}
        >
          <img src={calendarIcon} alt="Открыть календарь" className={styles.calendarIcon} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.calendarPopup}>
          <DatePicker
            selected={tempDate}
            onChange={(date: Date | null) => setTempDate(date)}
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

export default BirthDatePicker;
