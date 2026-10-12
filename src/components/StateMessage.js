import React from 'react';

export default function StateMessage({ changed }) {
  return (
    <p aria-live="polite">
      {changed ? 'Стан компонента успішно змінено!' : 'Натисніть кнопку, щоб змінити текст.'}
    </p>
  );
}
