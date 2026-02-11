import { type FC, type ReactNode, type RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Popover.module.css';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  placement?: 'bottom-start' | 'bottom-end';
  className?: string;
}

export const Popover: FC<PopoverProps> = ({
  isOpen,
  onClose,
  anchorRef,
  children,
  placement = 'bottom-start',
  className,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  // Вычисление позиции панели
  useEffect(() => {
    if (!isOpen || !anchorRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      if (!anchorRef.current) return;

      const anchorRect = anchorRef.current.getBoundingClientRect();
      const offset = 8; // Отступ от триггера

      let left = 0;
      const top = anchorRect.bottom + offset;

      if (placement === 'bottom-start') {
        left = anchorRect.left;
      } else if (placement === 'bottom-end') {
        // Для bottom-end используем правый край окна минус позиция правого края триггера
        // Это позволит выровнять правый край панели с правым краем триггера
        // Временно устанавливаем left = anchorRect.right, потом скорректируем
        left = anchorRect.right;
      }

      setPosition({ top, left });
    };

    updatePosition();

    // Обновляем позицию при скролле и ресайзе
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, anchorRef, placement]);

  // Корректировка позиции для bottom-end после получения ширины панели
  useEffect(() => {
    if (!isOpen || !popoverRef.current || !position || placement !== 'bottom-end' || !anchorRef.current) {
      return;
    }

    // Используем requestAnimationFrame для измерения после рендера
    const frameId = requestAnimationFrame(() => {
      const popoverWidth = popoverRef.current?.offsetWidth || 0;
      const anchorRect = anchorRef.current?.getBoundingClientRect();
      
      if (anchorRect && popoverWidth > 0) {
        setPosition((prevPosition) => {
          if (!prevPosition) return prevPosition;
          return {
            top: prevPosition.top,
            left: anchorRect.right - popoverWidth,
          };
        });
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen, placement, anchorRef]);

  // Обработка клика вне панели
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Проверяем, что клик не по панели и не по триггеру
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    };

    // Используем capture фазу для более раннего перехвата
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isOpen, onClose, anchorRef]);

  // Обработка Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  const popoverRoot = document.getElementById('popover-root');
  if (!popoverRoot) {
    console.error("Элемент с id 'popover-root' не найден в DOM");
    return null;
  }

  return createPortal(
    <div
      ref={popoverRef}
      className={clsx(styles.popover, className)}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      role="dialog"
      aria-modal="false"
    >
      {children}
    </div>,
    popoverRoot
  );
};
