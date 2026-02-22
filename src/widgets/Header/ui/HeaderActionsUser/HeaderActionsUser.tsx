import { useRef, useState } from 'react';
import { IconButton } from '../../../../shared/ui/icon-button';
import bellIcon from '../../../../shared/assets/icons/common/icon_bell_nosize.svg';
import { NotificationsPopover } from '../../../notificationsPopover';
import styles from './HeaderActionsUser.module.css';

export const HeaderActionsUser = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.root}>
      <IconButton
        ref={bellRef}
        icon={<img src={bellIcon} alt="" aria-hidden="true" />}
        aria-label="Уведомления"
        onClick={() => setIsNotificationsOpen((prev) => !prev)}
        isActive={isNotificationsOpen}
      />

      <NotificationsPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        anchorRef={bellRef}
      />
    </div>
  );
};
