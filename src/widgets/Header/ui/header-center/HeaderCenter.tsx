import cls from './HeaderCenter.module.css';
import { SearchInput } from '@shared/ui/search-input';
import { useAppDispatch, useAppSelector } from '@shared/lib/storeHooks';
import { selectSearchQuery, setQuery } from '@features/search/model/searchSlice';

export const HeaderCenter = () => {
  //const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();
  const query = useAppSelector(selectSearchQuery);

  const handleChange = (value: string) => {
    dispatch(setQuery(value));
  };

  // const handleClear = () => {
  //   dispatch(clearQuery());
  // };

  return (
    <div className={cls.center}>
      <div className={cls.searchWrapper}>
        <SearchInput value={query} onChange={handleChange} placeholder="Искать навык" />
      </div>
    </div>
  );
};
