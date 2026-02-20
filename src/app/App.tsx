import { useEffect } from 'react';
import AppRouter from './router/router';

import { initDb } from '../entities/db/model/dbSlice';
import { selectDbStatus, selectDbError } from '../entities/db/model/selectors';
import { useAppDispatch, useAppSelector } from '../shared/lib/storeHooks';

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectDbStatus);
  const error = useAppSelector(selectDbError);

  useEffect(() => {
    // В dev под StrictMode useEffect может вызываться дважды.
    // Проверка status === 'idle' гарантирует, что initDb не дернется повторно.
    if (status === 'idle') {
      dispatch(initDb());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <div>Загрузка данных…</div>;
  if (status === 'failed') return <div>Ошибка загрузки данных: {error}</div>;

  return <AppRouter />;
}
