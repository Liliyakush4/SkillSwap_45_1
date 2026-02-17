import { Link } from 'react-router-dom';
import cls from './HeaderActionsPublic.module.css';
import { Button } from 'shared/ui/Button';

export const HeaderActionsPublic = () => {
  return (
    <div className={cls.wrapper}>
      <Link to="/auth/login">
        <Button variant="outline">Войти</Button>
      </Link>

      <Link to="/auth/register/step-1">
        <Button>Зарегистрироваться</Button>
      </Link>
    </div>
  );
};
