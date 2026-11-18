import { products, warehouses } from '../data/inventory';
import { validatePlacementRequest } from '../domain/placementValidation';
import { ServiceError } from './ServiceError';

export function toRequestInput(input) {
  const result = validatePlacementRequest(input, products, warehouses);

  if (!result.ok) {
    throw new ServiceError('Перевірте поля заявки.', {
      code: 'VALIDATION',
      errors: result.errors,
    });
  }

  return result.value;
}

export function toRequest(value) {
  const valid =
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    typeof value.productId === 'string' &&
    typeof value.warehouseId === 'string' &&
    Number.isSafeInteger(value.quantity) &&
    value.quantity > 0 &&
    Number.isSafeInteger(value.positions) &&
    value.positions > 0 &&
    typeof value.note === 'string';

  if (!valid) {
    throw new ServiceError('Джерело повернуло некоректну заявку.', {
      code: 'BAD_DATA',
    });
  }

  return {
    id: value.id,
    productId: value.productId,
    warehouseId: value.warehouseId,
    quantity: value.quantity,
    positions: value.positions,
    note: value.note,
  };
}

export function toRequestList(value) {
  if (!Array.isArray(value)) {
    throw new ServiceError('Джерело повернуло некоректний список.', {
      code: 'BAD_DATA',
    });
  }

  const requests = value.map(toRequest);
  const ids = requests.map((request) => request.id);

  if (new Set(ids).size !== ids.length) {
    throw new ServiceError('У списку є повторні ID заявок.', {
      code: 'BAD_DATA',
    });
  }

  return requests;
}