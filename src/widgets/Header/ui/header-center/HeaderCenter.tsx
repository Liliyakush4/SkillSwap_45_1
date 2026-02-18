import { useState } from 'react';
import cls from './HeaderCenter.module.css';
import { SearchInput } from '@shared/ui/search-input';

export const HeaderCenter = () => {
  const [search, setSearch] = useState('');

  return (
    <div className={cls.center}>
      <div className={cls.searchWrapper}>
<SearchInput value={search} onChange={setSearch} placeholder="Искать навык" />
      </div>
    </div>
  );
};