import { useState } from 'react';
import { Input } from '@shared/ui/input';
import { PasswordInput } from '../../shared/ui/password-input';
import { SearchInput } from '../../shared/ui/search-input/SearchInput';

export default function MainPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1>Главная страница</h1>

      <div style={{ marginTop: 20 }}>
        <Input label="Имя" value={name} onChange={setName} placeholder="Введите ваше имя" />
      </div>

      <div style={{ marginTop: 20 }}>
        <PasswordInput
          label="Пароль"
          value={password}
          onChange={setPassword}
          placeholder="Введите пароль"
          errorText={password.length < 6 ? 'Минимум 6 символов' : ''}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Искать навык" />
      </div>
    </div>
  );
}
