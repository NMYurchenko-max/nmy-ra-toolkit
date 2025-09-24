/**
 * Компонент поисковой строки
 * @fileoverview src/components/shared/ui/SearchBar.tsx
 * @module components/shared/ui/SearchBar
 * @description
 * Универсальный компонент поисковой строки с поддержкой debounce задержки,
 * валидации ввода и состояний загрузки. Использует PrimeReact компоненты
 * для стилизации и функциональности.
 *
 * Особенности:
 * - Автоматический debounce поиск для оптимизации запросов
 * - Валидация минимальной длины поискового запроса
 * - Поддержка состояний загрузки и отключения
 * - Кнопки поиска и очистки с иконками
 * - Обработка Enter для быстрого поиска
 * - Кастомизация через CSS классы и placeholder
 *
 * @example
 * ```tsx
 * <SearchBar
 *   onSearch={(query) => console.log('Search:', query)}
 *   onClear={() => console.log('Cleared')}
 *   placeholder="Введите название фильма..."
 *   initialValue="Inception"
 *   loading={false}
 *   className="my-search-bar"
 * />
 * ```
 */

import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_DELAY } from '@/utils/constants';

/**
 * Свойства для компонента SearchBar
 * @interface SearchBarProps
 * @description
 * Определяет интерфейс для свойств компонента поисковой строки.
 *
 * @property {(query: string) => void} onSearch - Обработчик поискового запроса
 * @property {() => void} [onClear] - Обработчик очистки поиска
 * @property {string} [placeholder='Поиск фильмов...'] - Текст placeholder для поля ввода
 * @property {string} [initialValue=''] - Начальное значение поля ввода
 * @property {boolean} [loading=false] - Флаг состояния загрузки
 * @property {string} [className=''] - Дополнительные CSS классы
 *
 * @example
 * ```tsx
 * const props: SearchBarProps = {
 *   onSearch: (query) => handleSearch(query),
 *   onClear: () => clearResults(),
 *   placeholder: 'Поиск фильмов...',
 *   initialValue: '',
 *   loading: false,
 *   className: 'custom-search'
 * };
 * ```
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  initialValue?: string;
  loading?: boolean;
  className?: string;
}

/**
 * Компонент поисковой строки с debounce
 * @component
 * @description
 * Рендерит поисковую строку с кнопками поиска и очистки.
 * Автоматически выполняет поиск через заданную задержку после изменения ввода.
 *
 * Функциональность:
 * - Debounce задержка для оптимизации количества запросов
 * - Валидация минимальной длины запроса
 * - Обработка нажатия Enter для быстрого поиска
 * - Отключение элементов при загрузке
 * - Автоматическая очистка при пустом вводе
 *
 * @param {SearchBarProps} props - Свойства компонента
 * @param {(query: string) => void} props.onSearch - Функция, вызываемая при поиске
 * @param {() => void} [props.onClear] - Функция, вызываемая при очистке
 * @param {string} [props.placeholder='Поиск фильмов...'] - Placeholder для поля ввода
 * @param {string} [props.initialValue=''] - Начальное значение поля
 * @param {boolean} [props.loading=false] - Состояние загрузки
 * @param {string} [props.className=''] - Дополнительные CSS классы
 *
 * @returns {JSX.Element} Поисковая строка с кнопками управления
 *
 * @example
 * ```tsx
 * const handleSearch = (query: string) => {
 *   console.log('Searching for:', query);
 *   // Выполнить поиск
 * };
 *
 * const handleClear = () => {
 *   console.log('Search cleared');
 *   // Очистить результаты
 * };
 *
 * <SearchBar
 *   onSearch={handleSearch}
 *   onClear={handleClear}
 *   placeholder="Введите название фильма..."
 *   loading={isLoading}
 * />
 * ```
 */
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  placeholder = 'Поиск фильмов...',
  initialValue = '',
  loading = false,
  className = ''
}) => {
  const [searchInput, setSearchInput] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  /**
   * Debounce эффект для поискового запроса
   * @description
   * Создает задержку перед обновлением debouncedSearch для оптимизации запросов.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /**
   * Эффект автоматического поиска
   * @description
   * Выполняет поиск при изменении debouncedSearch или вызывает очистку при пустом вводе.
   */
  useEffect(() => {
    if (debouncedSearch.length >= MIN_SEARCH_LENGTH) {
      onSearch(debouncedSearch);
    } else if (debouncedSearch.length === 0 && onClear) {
      onClear();
    }
  }, [debouncedSearch, onSearch, onClear]);

  /**
   * Обрабатывает ручной поиск
   * @function handleSearch
   * @description
   * Выполняет поиск при нажатии кнопки или Enter.
   * Валидирует длину запроса перед выполнением.
   *
   * @example
   * handleSearch(); // Выполнит поиск с текущим значением
   */
  const handleSearch = () => {
    if (searchInput.trim().length >= MIN_SEARCH_LENGTH) {
      onSearch(searchInput.trim());
    }
  };

  /**
   * Обрабатывает очистку поиска
   * @function handleClear
   * @description
   * Очищает поле ввода и вызывает обработчик очистки.
   *
   * @example
   * handleClear(); // Очистит поиск и результаты
   */
  const handleClear = () => {
    setSearchInput('');
    onClear?.();
  };

  /**
   * Обрабатывает нажатие клавиш в поле ввода
   * @function handleKeyPress
   * @description
   * Выполняет поиск при нажатии Enter.
   *
   * @param {React.KeyboardEvent} e - Событие нажатия клавиши
   *
   * @example
   * handleKeyPress({ key: 'Enter' }); // Выполнит поиск
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {/**
       * Поле ввода для поискового запроса
       * @description
       * Основное поле ввода с поддержкой placeholder, отключения и обработки клавиш.
       */}
      <div className="flex-1">
        <InputText
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholder}
          className="w-full"
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      {/**
       * Кнопка поиска
       * @description
       * Кнопка для выполнения поиска с иконкой и состоянием загрузки.
       * Отключается при недостаточной длине запроса или загрузке.
       */}
      <Button
        label="Поиск"
        icon="pi pi-search"
        onClick={handleSearch}
        disabled={searchInput.length < MIN_SEARCH_LENGTH || loading}
        loading={loading}
      />

      {/**
       * Кнопка очистки
       * @description
       * Кнопка для очистки поискового запроса.
       * Показывается только при наличии текста и обработчика очистки.
       */}
      {searchInput && onClear && (
        <Button
          label="Очистить"
          icon="pi pi-times"
          onClick={handleClear}
          severity="secondary"
          disabled={loading}
        />
      )}
    </div>
  );
};

export default SearchBar;
