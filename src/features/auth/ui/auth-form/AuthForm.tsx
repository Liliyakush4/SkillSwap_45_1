import { type FC, useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/input';
import { PasswordInput } from '@shared/ui/password-input';
import styles from './AuthForm.module.css';

import googleIcon from '@shared/assets/images/auth/login_google.svg';
import appleIcon from '@shared/assets/images/auth/login_apple.svg';

export type AuthFormMode = 'login' | 'register';
export type AuthFormData = {
  email: string;
  password: string;
};

export interface AuthFormProps {
  mode: AuthFormMode;
  onSubmit?: (data: AuthFormData) => void;
  className?: string;
}

export const AuthForm: FC<AuthFormProps> = ({ mode, onSubmit, className }) => {
  const isLogin = mode === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <form className={`${styles.authForm} ${className || ''}`} onSubmit={handleSubmit}>
      <div className={styles.authFormContent}>
        <div className={styles.socialButtons}>
          <Button variant="secondary" fullWidth type="button">
            <img src={googleIcon} alt="" className={styles.socialIcon} />
            Продолжить с Google
          </Button>
          <Button variant="secondary" fullWidth type="button">
            <img src={appleIcon} alt="" className={styles.socialIcon} />
            Продолжить с Apple
          </Button>
        </div>

        <div className={styles.divider}>
          <span>или</span>
        </div>

        <Input
          label="Email"
          placeholder="Введите email"
          name="email"
          value={email}
          onChange={setEmail}
        />

        <PasswordInput
          label="Пароль"
          placeholder={isLogin ? 'Введите ваш пароль' : 'Придумайте надежный пароль'}
          name="password"
          value={password}
          onChange={setPassword}
          errorText="Пароль должен содержать не менее 8 знаков"
        />

        <Button type="submit" variant="primary" fullWidth>
          {isLogin ? 'Войти' : 'Далее'}
        </Button>

        {isLogin && (
          <div className={styles.registerLink}>
            <button type="button" className={styles.linkButton}>
              Зарегистрироваться
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
