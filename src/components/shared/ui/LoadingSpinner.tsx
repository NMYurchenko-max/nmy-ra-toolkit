/**
 * Компонент загрузки
 * @module components/shared/ui/LoadingSpinner
 */

import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

/**
 * Интерфейс для пропсов компонента загрузки
 */
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
}

/**
 * Компонент для отображения состояния загрузки
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'Загрузка...',
  className = ''
}) => {
  const sizeMap = {
    small: 30,
    medium: 50,
    large: 70
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <ProgressSpinner
        style={{ width: sizeMap[size], height: sizeMap[size] }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      {message && (
        <p className="mt-3 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
