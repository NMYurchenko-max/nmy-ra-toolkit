/**
 * Точка входа в React-приложение для поиска фильмов
 * @fileoverview src/main.tsx
 * @module main
 * @description
 * Главная точка входа в приложение. Инициализирует корневой элемент React
 * и рендерит главный компонент `App` с полной настройкой приложения.
 *
 * Функциональность:
 * 1. Импортирует глобальные стили из `index.css` для базовой настройки
 * 2. Создаёт корневой DOM-элемент с id="root" из index.html
 * 3. Рендерит компонент `App` в этом элементе
 * 4. Запускает всё React-приложение для поиска фильмов
*/

import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
