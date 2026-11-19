import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

function renderPlacements() {
  render(
    <MemoryRouter initialEntries={['/placements']}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

test('показує завантаження, а потім список заявок', async () => {
  let completeRequest;

  requestService.getAll.mockImplementation(
    () =>
      new Promise((resolve) => {
        completeRequest = resolve;
      })
  );

  renderPlacements();

  expect(
    screen.getByText('Завантажуємо заявки…')
  ).toBeInTheDocument();

  await act(async () => {
    completeRequest([
      {
        id: 'test-1',
        productId: 'p1',
        warehouseId: 'w1',
        quantity: 20,
        positions: 2,
        note: 'Тестова заявка',
      },
    ]);
  });

  expect(
    await screen.findByRole('heading', { name: 'Заявка test-1' })
  ).toBeInTheDocument();

  expect(
    screen.queryByText('Завантажуємо заявки…')
  ).not.toBeInTheDocument();
});

test('показує помилку і повторно завантажує дані', async () => {
  requestService.getAll
    .mockRejectedValueOnce(new Error('Тестова помилка'))
    .mockResolvedValueOnce([]);

  renderPlacements();

  expect(
    await screen.findByRole('alert')
  ).toHaveTextContent('Не вдалося завантажити заявки.');

  fireEvent.click(
    screen.getByRole('button', { name: 'Спробувати ще раз' })
  );

  expect(
    await screen.findByText('Заявок поки немає.')
  ).toBeInTheDocument();

  expect(requestService.getAll).toHaveBeenCalledTimes(2);
});

test('показує повідомлення, якщо список заявок порожній', async () => {
  requestService.getAll.mockResolvedValue([]);

  renderPlacements();

  expect(
    await screen.findByText('Заявок поки немає.')
  ).toBeInTheDocument();
});

test('показує повідомлення для неіснуючої сторінки', () => {
  requestService.getAll.mockResolvedValue([]);

  render(
    <MemoryRouter initialEntries={['/unknown-page']}>
      <App />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: 'Сторінку не знайдено' })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('link', { name: 'На головну' })
  ).toHaveAttribute('href', '/');
});

test('показує повідомлення для неіснуючої заявки', async () => {
  requestService.getAll.mockResolvedValue([]);

  render(
    <MemoryRouter initialEntries={['/placements/unknown-id']}>
      <App />
    </MemoryRouter>
  );

  expect(
    await screen.findByRole('heading', { name: 'Заявку не знайдено' })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('link', { name: 'Повернутися до списку заявок' })
  ).toHaveAttribute('href', '/placements');
});