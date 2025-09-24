/**
 * Страница графиков фильмов (исправленная версия без inline-стилей)
 * @module components/pages/Charts/ChartsProper
 */

import React, { useMemo } from 'react';
import { Card } from 'primereact/card';
import { useFavorites } from '@/hooks/useFavorites';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store/store';
import './Charts.css';

/**
 * Страница с графиками и статистикой избранных фильмов
 */
const ChartsProper: React.FC = () => {
  const { favorites } = useFavorites();
  const { currentMovie } = useSelector((state: RootState) => state.movies);

  // Статистика по годам
  const yearStats = useMemo(() => {
    const years: { [key: string]: number } = {};
    favorites.forEach(movie => {
      const year = movie.Year;
      years[year] = (years[year] || 0) + 1;
    });

    return Object.entries(years)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .slice(0, 10); // Топ 10 годов
  }, [favorites]);

  // Статистика по типам
  const typeStats = useMemo(() => {
    const types: { [key: string]: number } = {};
    favorites.forEach(movie => {
      const type = movie.Type;
      types[type] = (types[type] || 0) + 1;
    });

    return Object.entries(types).sort(([,a], [,b]) => b - a);
  }, [favorites]);

  // Статистика по рейтингам (если есть детальная информация)
  const ratingStats = useMemo(() => {
    const ratings: { [key: string]: number } = {};
    favorites.forEach(movie => {
      // Используем год как пример рейтинга, так как у нас нет реальных рейтингов в базовых данных
      const rating = movie.Year;
      ratings[rating] = (ratings[rating] || 0) + 1;
    });

    return Object.entries(ratings)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .slice(0, 10);
  }, [favorites]);

  const maxYearCount = Math.max(...yearStats.map(([,c]) => c));
  const maxTypeCount = Math.max(...typeStats.map(([,c]) => c));
  const maxRatingCount = Math.max(...ratingStats.map(([,c]) => c));

  return (
    <div className="charts-page">
      <div className="charts-header">
        <h1 className="charts-title">
          Статистика фильмов
        </h1>
        <p className="charts-subtitle">
          Анализ {favorites.length} избранных фильмов
        </p>
      </div>

      <div className="charts-grid">
        {/* Статистика по годам */}
        <Card title="Распределение по годам" className="charts-card">
          <div className="stats-container">
            {yearStats.length > 0 ? (
              yearStats.map(([year, count]) => (
                <div key={year} className="stat-item">
                  <span className="stat-label">{year}</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar stat-bar-primary"
                      data-percentage={maxYearCount > 0 ? Math.round((count / maxYearCount) * 100) : 0}
                    ></div>
                  </div>
                  <span className="stat-value">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">
                Нет данных для отображения
              </p>
            )}
          </div>
        </Card>

        {/* Статистика по типам */}
        <Card title="Распределение по типам" className="charts-card">
          <div className="stats-container">
            {typeStats.length > 0 ? (
              typeStats.map(([type, count]) => (
                <div key={type} className="stat-item">
                  <span className="stat-label">{type}</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar stat-bar-success"
                      data-percentage={maxTypeCount > 0 ? Math.round((count / maxTypeCount) * 100) : 0}
                    ></div>
                  </div>
                  <span className="stat-value">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">
                Нет данных для отображения
              </p>
            )}
          </div>
        </Card>

        {/* Рейтинги */}
        <Card title="Популярные года" className="charts-card">
          <div className="stats-container">
            {ratingStats.length > 0 ? (
              ratingStats.map(([year, count]) => (
                <div key={year} className="stat-item">
                  <span className="stat-label">{year} год</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar stat-bar-info"
                      data-percentage={maxRatingCount > 0 ? Math.round((count / maxRatingCount) * 100) : 0}
                    ></div>
                  </div>
                  <span className="stat-value">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">
                Нет данных для отображения
              </p>
            )}
          </div>
        </Card>

        {/* Общая статистика */}
        <Card title="Общая статистика" className="charts-card">
          <div className="summary-stats">
            <div className="stats-grid">
              <div className="stat-card stat-card-blue">
                <div className="stat-number">
                  {favorites.length}
                </div>
                <div className="stat-label">
                  Всего фильмов
                </div>
              </div>

              <div className="stat-card stat-card-green">
                <div className="stat-number">
                  {yearStats.length}
                </div>
                <div className="stat-label">
                  Разных годов
                </div>
              </div>

              <div className="stat-card stat-card-purple">
                <div className="stat-number">
                  {typeStats.length}
                </div>
                <div className="stat-label">
                  Типов контента
                </div>
              </div>

              <div className="stat-card stat-card-orange">
                <div className="stat-number">
                  {Math.round(favorites.length / Math.max(typeStats.length, 1))}
                </div>
                <div className="stat-label">
                  В среднем на тип
                </div>
              </div>
            </div>

            {favorites.length > 0 && (
              <div className="popular-year">
                <h4 className="popular-year-title">Самый популярный год:</h4>
                <p className="popular-year-value">
                  {yearStats[0]?.[0]} ({yearStats[0]?.[1]} фильмов)
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Детальная информация о текущем фильме */}
      {currentMovie && (
        <Card title="Текущий просматриваемый фильм" className="charts-card">
          <div className="current-movie">
            {currentMovie.Poster && currentMovie.Poster !== 'N/A' ? (
              <img
                src={currentMovie.Poster}
                alt={currentMovie.Title}
                className="current-movie-poster"
              />
            ) : (
              <div className="no-poster">
                <span>Нет постера</span>
              </div>
            )}
            <div className="current-movie-info">
              <h3 className="current-movie-title">{currentMovie.Title}</h3>
              <p className="current-movie-year">{currentMovie.Year}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChartsProper;
