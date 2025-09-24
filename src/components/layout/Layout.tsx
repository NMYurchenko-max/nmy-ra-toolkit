/**
 * Основной layout компонент приложения
 * @module components/layout/Layout
 */

import React from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout компонент, содержащий общую структуру страницы
 * Включает header, navigation и основное содержимое
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
