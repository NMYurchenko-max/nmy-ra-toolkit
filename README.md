# 🎬 MovieSearch App

Современное веб-приложение для поиска фильмов с использованием OMDb API. Построено на React, TypeScript и Redux Toolkit с использованием PrimeReact для UI компонентов.

## ✨ Особенности

- 🔍 **Умный поиск фильмов** - Интеграция с OMDb API для поиска по названию, году, типу
- ⭐ **Управление избранными** - Добавляйте фильмы в избранное с постоянным хранением
- 📱 **Адаптивный дизайн** - Работает на всех устройствах (мобильные, планшеты, десктоп)
- ⚡ **Оптимизированная производительность** - Debounce поиск, lazy loading изображений
- 🎨 **Современный UI** - Использует PrimeReact компоненты с кастомными стилями
- 🔄 **State Management** - Redux Toolkit для управления состоянием приложения
- 📝 **TypeScript** - Полная типизация для лучшей разработки и поддержки
- 🧪 **Документированное API** - Подробная JSDoc документация всех компонентов

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+ 
- Yarn 1.22+ or npm 7+
- Vite 7.0+
- TypeScript 5.0+
- PrimeReact 5.0+
- Redux Toolkit 1.8+

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd nmy-ra-toolkit
   ```

2. **Установите зависимости**
   ```bash
   yarn install
   ```

3. **Готово к запуску**
   API ключ уже настроен в коде, дополнительные настройки не требуются.

4. **Запустите приложение**
   ```bash
   yarn dev
   ```

5. **Откройте браузер**
   Перейдите на `http://localhost:5173`

## 📁 Структура проекта

```
src/
├── components/                 # React компоненты
│   ├── entities/              # Бизнес-логика компоненты
│   │   ├── MovieCard/         # Карточка фильма
│   │   └── MovieList/         # Список фильмов
│   ├── layout/                # Layout компоненты
│   │   └── Layout/            # Главный layout
│   ├── pages/                 # Страницы приложения
│   │   ├── Home.tsx           # Главная страница
│   │   └── Favorites.tsx      # Страница избранных
│   └── shared/                # Переиспользуемые компоненты
│       └── ui/                # UI компоненты
│           └── SearchBar.tsx  # Поисковая строка
├── hooks/                     # Кастомные React хуки
│   ├── useMovieSearch.ts      # Хук для поиска фильмов
│   └── useFavorites.ts        # Хук для управления избранными
├── redux/                     # Redux store и slices
│   ├── slices/                # Redux slices
│   │   ├── moviesSlice.ts     # Состояние фильмов
│   │   ├── favoritesSlice.ts  # Состояние избранных
│   │   └── searchSlice.ts     # Состояние поиска
│   └── store/                 # Конфигурация store
│       └── store.ts           # Redux store
├── services/                  # Сервисы и API
│   └── types/                 # TypeScript типы
│       └── movie.ts           # Типы для фильмов
└── utils/                     # Утилиты
    └── constants.ts           # Константы приложения
```

## 🛠 Технологии

- **Frontend Framework**: React 19
- **TypeScript**: Полная типизация
- **State Management**: Redux Toolkit
- **UI Components**: PrimeReact
- **Styling**: Tailwind, CSS3
- **API Integration**: OMDb API
- **Build Tool**: Vite

## 📖 API Документация

### Основные компоненты

#### MovieCard
Карточка фильма с постером, информацией и кнопкой избранного.

```tsx
<MovieCard
  movie={movieData}
  isFavorite={true}
  onFavoriteToggle={(movie) => handleToggle(movie)}
  showFavoriteButton={true}
/>
```

#### MovieList
Адаптивная сетка карточек фильмов.

```tsx
<MovieList
  movies={movies}
  favorites={favoriteIds}
  onFavoriteToggle={(movie) => handleToggle(movie)}
  loading={false}
  className="custom-grid"
/>
```

#### SearchBar
Поисковая строка с debounce и валидацией.

```tsx
<SearchBar
  onSearch={(query) => handleSearch(query)}
  onClear={() => clearResults()}
  placeholder="Поиск фильмов..."
  loading={isLoading}
/>
```

### Кастомные хуки

#### useMovieSearch
Хук для поиска фильмов с пагинацией.

```tsx
const {
  movies,
  currentMovie,
  loading,
  error,
  searchMovies,
  loadMoreMovies,
  clearSearch
} = useMovieSearch();
```

#### useFavorites
Хук для управления избранными фильмами.

```tsx
const {
  favorites,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  isFavorite
} = useFavorites();
```

## 🔧 Конфигурация

### Константы приложения
Файл `src/utils/constants.ts` содержит все конфигурационные константы:

```typescript
export const OMDB_API_KEYS = [Ваш личный API ключ];
// мой тестовый ключ, согласован к использованию и зашит в код
export const OMDB_BASE_URL = 'https://www.omdbapi.com';
export const MIN_SEARCH_LENGTH = 3;
export const SEARCH_DEBOUNCE_DELAY = 500;
```

### Redux Store
Настроен с redux-persist для постоянного хранения избранных фильмов:

```typescript
// src/redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: persistReducer(persistConfig, favoritesReducer),
    search: searchReducer,
  },
});
```

### Сборка для продакшена
```bash
yarn build
```

### Запуск для разработки
```bash
yarn dev
```
## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для подробностей.

## 👤 Автор
 
**N.Yurchenko**

- Email: [NMYurchenko@outlook.com](mailto:NMYurchenko@outlook.com),
  [Yurch-nina@yandex.ru](mailto:yurch-nina@yandex.ru)
- Telegram: [@NMYurchenko](https://t.me/NMYurchenko)
- VK: [NMYurchenko](https://www.linkedin.com/in/n-yurchenko/)
- GitHub: [NMYurchenko-max](https://github.com/NMYurchenko-max)

## 🙏 Благодарности

- [OMDb API](http://www.omdbapi.com/) за предоставление данных о фильмах
- [Netogy](https://netology.ru/) за программу обучения FullStack разработчика

## План доработки 

- [ ] Добавить авторизацию и регистрацию, локацию пользователя
- [ ] Добавить комментарии к фильмам
- [ ] Добавить карусельный слайдер фильмов в избранном
- [ ] Добавить переход из статистики в фильмы
- [ ] Добавить поиск по актерам и жанрам
- [ ] Добавить поиск по жанрам и актерам

---

⭐ **Если вам понравилось это приложение, поставьте звезду на GitHub!**
