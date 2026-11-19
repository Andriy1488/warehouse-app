import { validatePlacementRequest } from './placementValidation';

const products = [
  { id: 'p1', name: 'Цегла' },
];

const warehouses = [
  {
    id: 'w1',
    name: 'Основний склад',
    capacity: 100,
    occupied: 90,
  },
];

const validDraft = {
  productId: 'p1',
  warehouseId: 'w1',
  quantity: '1',
  positions: '1',
  note: 'Примітка до заявки',
};

function validate(changes = {}) {
  return validatePlacementRequest(
    { ...validDraft, ...changes },
    products,
    warehouses
  );
}

test('приймає допустимі граничні значення', () => {
  const result = validate({
    quantity: '1000',
    positions: '10',
    note: 'А'.repeat(10),
  });

  expect(result.ok).toBe(true);
  expect(result.value.quantity).toBe(1000);
  expect(result.value.positions).toBe(10);
});

test('відхиляє кількість меншу за 1 і більшу за 1000', () => {
  const tooSmall = validate({ quantity: '0' });
  const tooLarge = validate({ quantity: '1001' });

  expect(tooSmall.errors.quantity).toBe(
    'Укажіть цілу кількість від 1 до 1000.'
  );

  expect(tooLarge.errors.quantity).toBe(
    'Укажіть цілу кількість від 1 до 1000.'
  );
});

test('не дозволяє зайняти більше вільних місць, ніж є на складі', () => {
  const result = validate({ positions: '11' });

  expect(result.ok).toBe(false);
  expect(result.errors.positions).toBe(
    'На складі вільно лише 10 місць.'
  );
});

test('перевіряє довжину примітки', () => {
  const tooShort = validate({ note: 'А'.repeat(9) });
  const longestValid = validate({ note: 'А'.repeat(200) });
  const tooLong = validate({ note: 'А'.repeat(201) });

  expect(tooShort.errors.note).toBe(
    'Примітка має містити від 10 до 200 символів.'
  );

  expect(longestValid.ok).toBe(true);

  expect(tooLong.errors.note).toBe(
    'Примітка має містити від 10 до 200 символів.'
  );
});

test('відхиляє невідомий товар і склад', () => {
  const result = validate({
    productId: 'невідомий-товар',
    warehouseId: 'невідомий-склад',
  });

  expect(result.errors.productId).toBe('Виберіть товар із каталогу.');
  expect(result.errors.warehouseId).toBe('Виберіть склад.');
});