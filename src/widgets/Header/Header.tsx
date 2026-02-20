import cls from './Header.module.css';
import { HeaderBase } from '@widgets/header/ui/header-base';
import { HeaderActionsPublic } from '@widgets/header/ui/header-actions-public';
import { HeaderActionsUser } from '@widgets/header/ui/header-actions-user';
import { HeaderCenter } from './ui/header-center/HeaderCenter';

export type HeaderActionsType = 'public' | 'user';

interface HeaderProps {
  actions?: HeaderActionsType;
}

export const Header = ({ actions = 'public' }: HeaderProps) => {
  return (
    <header className={cls.header}>
      <div className={cls.container}>
        <div className={cls.baseHeader}>
          <HeaderBase />
        </div>

        <div className={cls.headerCenter}>
          <HeaderCenter />
        </div>

        <div className={cls.actions}>
          {actions === 'public' && <HeaderActionsPublic />}
          {actions === 'user' && <HeaderActionsUser />}
        </div>
      </div>
    </header>
  );
};
