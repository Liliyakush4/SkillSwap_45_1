import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../../pages/main-page/MainPage';
import Login from '../../pages/login/Login';
import RegisterStep1 from '../../pages/register/register-step-1/RegisterStep1';
import RegisterStep2 from '../../pages/register/register-step-2/RegisterStep2';
import RegisterStep3 from '../../pages/register/register-step-3/RegisterStep3';
import SkillPage from '../../pages/skill-page/SkillPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import FavoritesPage from '../../pages/favorites/FavoritesPage';
import ErrorPage404 from '../../pages/error404/ErrorPage404';
import ErrorPage500 from '../../pages/error500/ErrorPage500';

export default function AppRouter() {
  return (
    <Routes>
      {/* Главная */}
      <Route path="/" element={<MainPage />} />

      {/* Авторизация */}
      <Route path="/auth/login" element={<Login />} />

      {/* Регистрация */}
      <Route path="/auth/register/step-1" element={<RegisterStep1 />} />
      <Route path="/auth/register/step-2" element={<RegisterStep2 />} />
      <Route path="/auth/register/step-3" element={<RegisterStep3 />} />

      {/* Основные страницы */}
      <Route path="/skill/:id" element={<SkillPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      {/* Ошибки */}
      <Route path="/404" element={<ErrorPage404 />} />
      <Route path="/500" element={<ErrorPage500 />} />

      {/* Неизвестные URL */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
