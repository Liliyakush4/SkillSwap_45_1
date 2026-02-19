import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import MainPage from '../../pages/main-page/MainPage';
import Login from '../../pages/login/Login';
import RegisterStep1 from '../../pages/register/register-step-1/RegisterStep1';
import RegisterStep2 from '../../pages/register/register-step-2/RegisterStep2';
import RegisterStep3 from '../../pages/register/register-step-3/RegisterStep3';
import SkillPage from '../../pages/skill-page/SkillPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import FavoritesPage from '../../pages/favorites/FavoritesPage';
import { ErrorPage404 } from '../../pages/error404/ErrorPage404';
import { ErrorPage500 } from '../../pages/error500/ErrorPage500';

import { AuthLayout } from '../layouts/AuthLayout';

const StyleGuidePage = lazy(() =>
  import('../../pages/styleguide/StyleGuidePage').then((m) => ({ default: m.StyleGuidePage })),
);

export default function AppRouter() {
  return (
    <Routes>
      {/* Style Guide: только в dev, в проде редирект на /; динамический импорт — не в прод-бандле */}
      <Route
        path="/__ui"
        element={
          <Suspense fallback={null}>
            <StyleGuidePage />
          </Suspense>
        }
      />
      <Route
        path="/styleguide"
        element={
          <Suspense fallback={null}>
            <StyleGuidePage />
          </Suspense>
        }
      />

      {/* Auth-ветка без Header/Footer */}
      <Route path="/auth" element={<AuthLayout />}>
        {/* если зашли на /auth */}
        <Route index element={<Navigate to="/auth/login" replace />} />

        <Route path="login" element={<Login />} />
        <Route path="register/step-1" element={<RegisterStep1 />} />
        <Route path="register/step-2" element={<RegisterStep2 />} />
        <Route path="register/step-3" element={<RegisterStep3 />} />
      </Route>

      {/* Основная часть с Header/Footer */}
      <Route path="/" element={<MainLayout />}>
        {/* Главная */}
        <Route index element={<MainPage />} />

        {/* Основные страницы */}
        <Route path="skill/:id" element={<SkillPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="favorites" element={<FavoritesPage />} />

        {/* Страницы ошибок */}
        <Route path="404" element={<ErrorPage404 />} />
        <Route path="500" element={<ErrorPage500 />} />

        {/* Неизвестные URL */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
