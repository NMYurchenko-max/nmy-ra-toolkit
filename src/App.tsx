import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store/store';
import Layout from '@/components/layout/Layout/Layout';
import Home from '@/components/pages/Home';
import Favorites from '@/components/pages/Favorites';
import Charts from '@/components/pages/Charts/Charts';
import MovieDetails from '@/components/pages/MovieDetails';
import NotFound from '@/components/pages/NotFound';
import './App.css';

/**
 * Главный компонент React-приложения для поиска фильмов
 * @fileoverview src/App.tsx
 * @module App
 * @description
 * Корневой компонент приложения, который настраивает всю инфраструктуру:
 * - Маршрутизацию с React Router
 * - Управление состоянием с Redux и redux-persist
 * - Основной layout и навигацию
 * - Все основные страницы приложения
 *
 * Архитектура приложения:
 * - Provider: Обёртка Redux для глобального состояния
 * - PersistGate: Восстановление состояния из localStorage
 * - Router: Маршрутизация между страницами
 * - Layout: Общий layout с навигацией
 * - Routes: Определение всех маршрутов
 */
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
