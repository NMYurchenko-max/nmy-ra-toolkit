/**
 * Страница 404 - не найдено
 * @module components/pages/NotFound
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

/**
 * Компонент страницы 404
 */
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
        <div className="p-8 sm:p-12">
          {/* Анимированная 404 */}
          <div className="relative mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-8xl sm:text-9xl font-bold text-blue-500/20 animate-bounce">
              404
            </div>
          </div>

          {/* Основной контент */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                🚫 Страница не найдена
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                К сожалению, запрашиваемая страница не существует или была перемещена.
                Возможно, вы перешли по неверной ссылке или страница была удалена.
              </p>
            </div>

            {/* Предложения */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                💡 Что можно сделать?
              </h3>
              <ul className="text-left text-blue-700 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">🏠</span>
                  <Link to="/" className="hover:text-blue-900 transition-colors">
                    Вернуться на главную страницу
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔍</span>
                  <Link to="/" className="hover:text-blue-900 transition-colors">
                    Поискать интересные фильмы
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⭐</span>
                  <Link to="/favorites" className="hover:text-blue-900 transition-colors">
                    Посмотреть избранное
                  </Link>
                </li>
              </ul>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/">
                <Button
                  label="🏠 На главную"
                  icon="pi pi-home"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                />
              </Link>
              <Link to="/favorites">
                <Button
                  label="⭐ Избранное"
                  icon="pi pi-star"
                  severity="secondary"
                  outlined
                  className="px-8 py-3 text-lg rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
