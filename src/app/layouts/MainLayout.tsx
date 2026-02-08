import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Здесь подставляется содержимое страниц */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;