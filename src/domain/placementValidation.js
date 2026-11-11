export function validatePlacementRequest(draft, products, warehouses) {
  const errors = {};
  const product = products.find((item) => item.id === draft.productId);
  const warehouse = warehouses.find((item) => item.id === draft.warehouseId);

  const quantityText = String(draft.quantity ?? '').trim();
  const positionsText = String(draft.positions ?? '').trim();
  const note = String(draft.note ?? '').trim();

  if (!product) {
    errors.productId = 'Виберіть товар із каталогу.';
  }

  if (!warehouse) {
    errors.warehouseId = 'Виберіть склад.';
  }

  const quantity = Number(quantityText);
  if (
    !/^[1-9]\d*$/.test(quantityText) ||
    !Number.isSafeInteger(quantity) ||
    quantity > 1000
  ) {
    errors.quantity = 'Укажіть цілу кількість від 1 до 1000.';
  }

  const positions = Number(positionsText);
  if (
    !/^[1-9]\d*$/.test(positionsText) ||
    !Number.isSafeInteger(positions)
  ) {
    errors.positions = 'Укажіть додатне ціле число місць.';
  } else if (
    warehouse &&
    positions > warehouse.capacity - warehouse.occupied
  ) {
    errors.positions =
      `На складі вільно лише ${warehouse.capacity - warehouse.occupied} місць.`;
  }

  if (note.length < 10 || note.length > 200) {
    errors.note = 'Примітка має містити від 10 до 200 символів.';
  }

  const ok = Object.keys(errors).length === 0;

  return {
    ok,
    errors,
    value: ok
      ? {
          productId: product.id,
          warehouseId: warehouse.id,
          quantity,
          positions,
          note,
        }
      : null,
  };
}