import { type FC, useState } from 'react';
import { Button } from 'src/shared/ui/Button';
import { Input } from 'src/shared/ui/Input';
import { PasswordInput } from 'src/shared/ui/password-input';
import styles from './AuthForm.module.css';

export type AuthFormMode = 'login' | 'register';

export interface AuthFormProps {
  mode: AuthFormMode;
  onSubmit?: (data: any) => void;
}

export const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const isLogin = mode === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.authForm}>
      <div className={styles.authFormContent}>
        <div className={styles.socialButtons}>
          <Button variant="secondary" fullWidth>Google</Button>
          <Button variant="secondary" fullWidth>Apple</Button>
        </div>

        <div className={styles.divider}>
          <span>или</span>
        </div>

        <Input 
          placeholder="Введите email" 
          name="email"
          value={email}
          onChange={setEmail}
        />
        
        <PasswordInput 
          placeholder={isLogin ? "Пароль" : "Придумайте надежный пароль"}
          name="password"
          value={password}
          onChange={setPassword}
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
    </div>
  );
};