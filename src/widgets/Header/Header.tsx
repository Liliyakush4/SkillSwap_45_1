import cls from './Header.module.css';
import { HeaderBase } from './ui/header-base';
import { HeaderActionsPublic } from './ui/header-actions-public';
import { HeaderActionsUser } from './ui/header-actions-user';

export type HeaderActionsType = 'public' | 'user';

interface HeaderProps {
  actions?: HeaderActionsType;
}

export const Header = ({ actions = 'public' }: HeaderProps) => {
  return (
    <header className={cls.header}>
      <div className={cls.container}>
        <HeaderBase />

        <div className={cls.actions}>
          {actions === 'public' && <HeaderActionsPublic />}
          {actions === 'user' && <HeaderActionsUser />}
        </div>
      </div>
    </header>
  );
};