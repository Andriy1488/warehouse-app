import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderNewPlacementPage() {
  render(
    <MemoryRouter initialEntries={['/placements/new']}>
      <App />
    </MemoryRouter>
  );
}

test('показує помилки для порожньої заявки', () => {
  renderNewPlacementPage();

  fireEvent.click(
    screen.getByRole('button', { name: 'Сформувати заявку' })
  );

  expect(
    screen.getByText('Виберіть товар із каталогу.')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Виберіть склад.')
  ).toBeInTheDocument();
});

test('створює заявку та показує її у списку', () => {
  renderNewPlacementPage();

  fireEvent.change(screen.getByLabelText('Товар'), {
    target: { value: 'p1' },
  });
  fireEvent.change(screen.getByLabelText('Склад'), {
    target: { value: 'w1' },
  });
  fireEvent.change(screen.getByLabelText(/Кількість товару/), {
    target: { value: '20' },
  });
  fireEvent.change(screen.getByLabelText('Потрібно місць зберігання'), {
    target: { value: '2' },
  });
  fireEvent.change(screen.getByLabelText('Примітка до заявки'), {
    target: { value: 'Розмістити товар на складі.' },
  });

  fireEvent.click(
    screen.getByRole('button', { name: 'Сформувати заявку' })
  );

  expect(screen.getByRole('status')).toHaveTextContent(
    'Заявку pl3 створено.'
  );
  expect(screen.getByText('Заявка pl3')).toBeInTheDocument();
});