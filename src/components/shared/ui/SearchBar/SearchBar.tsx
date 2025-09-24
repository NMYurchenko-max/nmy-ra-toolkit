import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store/store';
import { searchMoviesAsync } from '@/redux/slices/moviesSlice';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Введите название фильма..."
}) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    if (onSearch) {
      onSearch(q);
    } else {
      await dispatch(searchMoviesAsync({ query: q, page: 1 }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        Поиск
      </button>
    </form>
  );
};

export default SearchBar;
