import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { dbReducer } from '@app/store/db/dbSlice';
import { sortReducer } from '@features/sort/model';
import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { favoritesReducer } from '@features/favorites/model';
import filtersReducer from '@features/filters/model/filtersSlice';
import authReducer from '@features/auth/model/authSlice';
import RegistrationReducer from '@features/auth/model/registrationSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['db', 'favorites'], // дописать сюда те редьюсеры, что не нужно в LocalStorage сохранять)
};

const rootReducer = combineReducers({
  db: dbReducer,
  sort: sortReducer,
  favorites: favoritesReducer,
  filters: filtersReducer,
  auth: authReducer, // добавила
  registration: RegistrationReducer,
  // сюда дописывать новые редьюсеры
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const persistor = persistStore(store);
export default store;
