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

test('створює заявку та показує її у списку', async () => {
  if (!window.crypto) {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      value: {},
    });
  }

  if (!window.crypto.randomUUID) {
    Object.defineProperty(window.crypto, 'randomUUID', {
      configurable: true,
      value: () => 'test-request-id',
    });
  }

  localStorage.clear();

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

  const notice = await screen.findByText(
    /Заявку pl-.+ створено\./,
    {},
    { timeout: 5000 }
  );

  expect(notice).toBeInTheDocument();

  const match = notice.textContent.match(/Заявку (pl-.+) створено\./);
  const requestId = match[1];

  expect(
    screen.getByRole('heading', { name: `Заявка ${requestId}` })
  ).toBeInTheDocument();
});