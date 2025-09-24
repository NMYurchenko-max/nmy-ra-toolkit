/**
 * Основной layout компонент приложения
 * @fileoverview src/components/layout/Layout/Layout.tsx
 * @module components/layout/Layout
 * @description
 * Предоставляет общую структуру для всех страниц приложения:
 * - Шапку с логотипом и навигацией
 * - Основной контент для дочерних компонентов
 * - Активное состояние навигационных ссылок
 *
 * Особенности:
 * - Адаптивная навигация с выделением активной страницы
 * - Семантическая HTML структура
 * - Поддержка React Router для навигации
 * - Стилизованный интерфейс с CSS классами
 *
 * @example
 * ```tsx
 * <Layout>
 *   <Home />
 * </Layout>
 * // Рендерит: header + main с Home компонентом
 * ```
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

/**
 * Интерфейс пропсов для Layout компонента
 * @interface LayoutProps
 * @description
 * Определяет пропсы, которые принимает компонент Layout.
 */
interface LayoutProps {
  /** Дочерние React элементы для рендера в main */
  children: React.ReactNode;
}

/**
 * Основной layout компонент приложения
 * @component
 * @description
 * Создаёт общую структуру страницы с навигацией и контентом.
 * Использует React Router для определения активной страницы.
 *
 * Структура:
 * - header: Шапка с логотипом и навигацией
 * - main: Основной контент для дочерних компонентов
 *
 * @param {LayoutProps} props - Пропсы компонента
 * @returns {JSX.Element} Разметка layout с навигацией
 *
 * @example
 * ```tsx
 * const App = () => (
 *   <Layout>
 *     <HomePage />
 *   </Layout>
 * );
 * ```
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Получаем текущий путь для определения активной страницы
  const location = useLocation();

  /**
   * Проверяет, является ли указанный путь активным
   * @function isActive
   * @description
   * Сравнивает текущий путь с указанным для определения активной страницы.
   *
   * @param {string} path - Путь для проверки
   * @returns {boolean} true если путь активен, false иначе
   *
   * @example
   * const active = isActive('/'); // true если на главной странице
   */
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      {/**
       * Шапка приложения с логотипом и навигацией
       * @description
       * Содержит логотип приложения и навигационные ссылки.
       * Использует CSS классы для стилизации.
       */}
      <header className="header">
        <div className="header-content">
          {/**
           * Логотип приложения с ссылкой на главную страницу
           * @description
           * Кликабельный логотип, ведущий на главную страницу.
           * Использует emoji для визуального представления.
           */}
          <Link to="/" className="logo">
            🎬 MovieSearch
          </Link>

          {/**
           * Навигационное меню
           * @description
           * Содержит ссылки на основные разделы приложения.
           * Активная страница выделяется специальным CSS классом.
           */}
          <nav className="navigation">
            {/**
             * Ссылка на главную страницу (поиск фильмов)
             * @description
             * Навигационная ссылка на главную страницу с поиском.
             * Получает активный класс если текущая страница - главная.
             */}
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Поиск
            </Link>

            {/**
             * Ссылка на страницу избранных фильмов
             * @description
             * Навигационная ссылка на страницу с избранными фильмами.
             * Получает активный класс если текущая страница - избранное.
             */}
            <Link
              to="/favorites"
              className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
            >
              Избранное
            </Link>

            {/**
             * Ссылка на страницу статистики
             * @description
             * Навигационная ссылка на страницу со статистикой и графиками.
             * Получает активный класс если текущая страница - статистика.
             */}
            <Link
              to="/charts"
              className={`nav-link ${isActive('/charts') ? 'active' : ''}`}
            >
              Статистика
            </Link>
          </nav>
        </div>
      </header>

      {/**
       * Основной контент страницы
       * @description
       * Контейнер для дочерних компонентов страниц.
       * Содержит основное содержимое приложения.
       */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
