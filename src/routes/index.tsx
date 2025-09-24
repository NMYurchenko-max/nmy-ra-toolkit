/**
 * Конфигурация роутинга приложения
 * @module routes
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/components/pages/Home';
import Favorites from '@/components/pages/Favorites';
import MovieDetails from '@/components/pages/MovieDetails';
import Layout from '@/components/layout/Layout';

/**
 * Основной компонент роутинга приложения
 * Определяет все доступные маршруты и обертку Layout
 */
const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Главная страница с поиском фильмов */}
        <Route path="/" element={<Home />} />

        {/* Страница избранных фильмов */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Страница деталей фильма */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* 404 страница - будет добавлена позже */}
        <Route path="*" element={
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 mb-4">Страница не найдена</p>
            <a href="/" className="text-blue-600 hover:text-blue-800">
              Вернуться на главную
            </a>
          </div>
        } />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
