/**
 * Header компонент приложения
 * @module components/layout/Header
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

/**
 * Header компонент с навигацией и логотипом
 */
const Header: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Главная',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Избранное',
      icon: 'pi pi-star',
      command: () => navigate('/favorites')
    }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            🎬 MovieSearch
          </Link>

          <Menubar
            model={items}
            className="border-none bg-transparent p-0"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
