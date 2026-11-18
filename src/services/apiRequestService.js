import { ServiceError } from './ServiceError';
import {
  toRequest,
  toRequestInput,
  toRequestList,
} from './requestContract';

const BASE_URL = process.env.REACT_APP_API_URL;

function getUrl(id) {
  if (!BASE_URL) {
    throw new ServiceError(
      'Не вказано адресу API. Перевірте REACT_APP_API_URL.',
      { code: 'CONFIG' }
    );
  }

  const base = BASE_URL.replace(/\/+$/, '');

  return id === undefined
    ? `${base}/placements`
    : `${base}/placements/${encodeURIComponent(id)}`;
}

async function sendRequest(url, options = {}) {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }

    throw new ServiceError(
      'Не вдалося підключитися до сервера.',
      { code: 'NETWORK' }
    );
  }

  if (!response.ok) {
    throw new ServiceError(
      `Помилка сервера: ${response.status}.`,
      {
        code: 'HTTP_ERROR',
        status: response.status,
      }
    );
  }

  if (response.status === 204) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    throw new ServiceError(
      'Сервер повернув некоректні дані.',
      { code: 'BAD_DATA' }
    );
  }
}

export const apiRequestService = {
  async getAll({ signal } = {}) {
    const data = await sendRequest(getUrl(), { signal });

    return toRequestList(data);
  },

  async getById(id, { signal } = {}) {
    const data = await sendRequest(getUrl(id), { signal });

    return toRequest(data);
  },

  async create(input) {
    const value = toRequestInput(input);

    const data = await sendRequest(getUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    return toRequest(data);
  },

  async update(id, input) {
    const value = toRequestInput(input);

    const data = await sendRequest(getUrl(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    return toRequest(data);
  },

  async delete(id) {
    await sendRequest(getUrl(id), {
      method: 'DELETE',
    });
  },
};