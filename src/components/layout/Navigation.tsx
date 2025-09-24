/**
 * Navigation компонент приложения
 * @module components/layout/Navigation
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';

/**
 * Navigation компонент с хлебными крошками
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Создаем хлебные крошки на основе текущего пути
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);

    const breadcrumbs: Array<{ label: string; command?: () => void }> = [
      { label: 'Главная', command: () => navigate('/') }
    ];

    pathnames.forEach((pathname, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;

      let label = pathname;

      // Преобразуем пути в читаемые названия
      switch (pathname) {
        case 'favorites':
          label = 'Избранное';
          break;
        case 'movie':
          label = 'Фильм';
          break;
        default:
          label = pathname.charAt(0).toUpperCase() + pathname.slice(1);
      }

      if (isLast) {
        breadcrumbs.push({ label });
      } else {
        breadcrumbs.push({
          label,
          command: () => navigate(routeTo)
        });
      }
    });

    return breadcrumbs;
  };

  return (
    <nav className="bg-gray-100 border-b">
      <div className="container mx-auto px-4 py-2">
        <BreadCrumb model={getBreadcrumbs()} home={{ icon: 'pi pi-home' }} />
      </div>
    </nav>
  );
};

export default Navigation;
