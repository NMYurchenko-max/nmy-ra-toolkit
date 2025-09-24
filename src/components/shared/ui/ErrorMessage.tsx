/**
 * Компонент для отображения ошибок
 * @module components/shared/ui/ErrorMessage
 */

import React from 'react';
import { Message } from 'primereact/message';

/**
 * Интерфейс для пропсов компонента ошибки
 */
interface ErrorMessageProps {
  message: string;
  severity?: 'error' | 'warn' | 'info' | 'success';
  className?: string;
  onRetry?: () => void;
}

/**
 * Компонент для отображения сообщений об ошибках
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  severity = 'error',
  className = '',
  onRetry
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Message
        severity={severity}
        text={message}
        className="w-full"
      />
      {onRetry && (
        <div className="mt-3 text-center">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Повторить
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
