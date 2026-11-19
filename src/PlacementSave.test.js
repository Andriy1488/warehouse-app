import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { requestService } from './services/requestService';

jest.mock('./services/requestService', () => ({
  requestService: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('зберігає введені дані після помилки та створює заявку при повторі', async () => {
  const savedRequest = {
    id: 'test-save-1',
    productId: 'p1',
    warehouseId: 'w1',
    quantity: 20,
    positions: 2,
    note: 'Розмістити товар на складі.',
  };

  // Спочатку список порожній, після створення містить заявку.
  requestService.getAll
    .mockResolvedValueOnce([])
    .mockResolvedValue([savedRequest]);

  // Перша спроба завершується помилкою, друга — успішно.
  requestService.create
    .mockRejectedValueOnce(new Error('Помилка збереження'))
    .mockResolvedValueOnce(savedRequest);

  render(
    <MemoryRouter initialEntries={['/placements/new']}>
      <App />
    </MemoryRouter>
  );

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

  // Перевіряємо помилку та збережені значення форми.
  expect(await screen.findByRole('alert')).toBeInTheDocument();

  expect(screen.getByLabelText('Товар')).toHaveValue('p1');
  expect(screen.getByLabelText('Склад')).toHaveValue('w1');
  expect(screen.getByLabelText(/Кількість товару/)).toHaveValue(20);
  expect(screen.getByLabelText('Потрібно місць зберігання')).toHaveValue(2);
  expect(screen.getByLabelText('Примітка до заявки')).toHaveValue(
    'Розмістити товар на складі.'
  );

  // Повторюємо збереження.
  fireEvent.click(
    screen.getByRole('button', { name: 'Сформувати заявку' })
  );

  expect(
    await screen.findByText('Заявку test-save-1 створено.')
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: 'Заявка test-save-1' })
  ).toBeInTheDocument();

  expect(requestService.create).toHaveBeenCalledTimes(2);
});