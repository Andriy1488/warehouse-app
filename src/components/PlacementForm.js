import React, { useState } from 'react';
import styled from 'styled-components';
import FormField from './FormField';
import AppButton from './AppButton';
import CapacityBadge from './CapacityBadge';
import EmptyState from './EmptyState';

const Form = styled.form`
  max-width: 600px;
  padding: 24px;
  border: 1px solid #dbe3ee;
  border-radius: 12px;
  background: white;
`;

export default function PlacementForm({
  products,
  warehouses,
  selectedProductId,
  onSelectProduct,
  draft,
  onDraftChange,
  onClear,
  onSubmit,
}) {
  const [error, setError] = useState('');

  const product = products.find((item) => item.id === selectedProductId);
  const warehouse = warehouses.find(
    (item) => item.id === draft.warehouseId
  );
  const freePositions = warehouse
    ? warehouse.capacity - warehouse.occupied
    : 0;

  function handleSubmit(event) {
    event.preventDefault();

    const count = Number(draft.quantity);
    const places = Number(draft.positions);

    if (!product || !warehouse) {
      setError('Виберіть товар і склад.');
      return;
    }

    if (
      !Number.isSafeInteger(count) ||
      count <= 0 ||
      !Number.isSafeInteger(places) ||
      places <= 0
    ) {
      setError('Кількість товару й місць має бути додатним цілим числом.');
      return;
    }

    if (places > freePositions) {
      setError(`На цьому складі доступно лише ${freePositions} місць.`);
      return;
    }

    setError('');
    onSubmit({
      productId: selectedProductId,
      warehouseId: draft.warehouseId,
      quantity: count,
      positions: places,
    });
  }

  if (products.length === 0 || warehouses.length === 0) {
    return (
      <EmptyState message="Для заявки потрібні хоча б один товар і один склад." />
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField id="product" label="Товар">
        <select
          id="product"
          value={selectedProductId || ''}
          onChange={(event) => {
            onSelectProduct(event.target.value);
            setError('');
          }}
          required
        >
          <option value="">Виберіть товар</option>
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="warehouse" label="Склад">
        <select
          id="warehouse"
          value={draft.warehouseId}
          onChange={(event) => {
            onDraftChange('warehouseId', event.target.value);
            setError('');
          }}
          required
        >
          <option value="">Виберіть склад</option>
          {warehouses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </FormField>

      {warehouse && (
        <p>
          <CapacityBadge
            occupied={warehouse.occupied}
            capacity={warehouse.capacity}
          />
          <br />
          Вільно: {freePositions} місць зберігання.
        </p>
      )}

      <FormField
        id="quantity"
        label={product
          ? `Кількість товару (${product.unit})`
          : 'Кількість товару'}
      >
        <input
          id="quantity"
          type="number"
          min="1"
          step="1"
          value={draft.quantity}
          onChange={(event) => {
            onDraftChange('quantity', event.target.value);
            setError('');
          }}
          required
        />
      </FormField>

      <FormField
        id="positions"
        label="Потрібно місць зберігання"
        hint="Одна партія товару може займати кілька місць незалежно від кількості одиниць товару."
      >
        <input
          id="positions"
          aria-describedby="positions-hint"
          type="number"
          min="1"
          step="1"
          value={draft.positions}
          onChange={(event) => {
            onDraftChange('positions', event.target.value);
            setError('');
          }}
          required
        />
      </FormField>

      {error && <p role="alert">{error}</p>}

      <AppButton type="submit">Сформувати заявку</AppButton>{' '}
      <AppButton
        type="button"
        onClick={() => {
          onClear();
          setError('');
        }}
      >
        Очистити поля
      </AppButton>
    </Form>
  );
}