/**
 * Компонент загрузки (исправленная версия без inline-стилей)
 * @module components/shared/ui/LoadingSpinnerFixed
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
const LoadingSpinnerFixed: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'Загрузка...',
  className = ''
}) => {
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <ProgressSpinner
        className={getSizeClass(size)}
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

export default LoadingSpinnerFixed;
