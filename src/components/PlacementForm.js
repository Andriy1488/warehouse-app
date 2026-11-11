import React, { useState } from 'react';
import styled from 'styled-components';
import FormField from './FormField';
import AppButton from './AppButton';
import CapacityBadge from './CapacityBadge';
import EmptyState from './EmptyState';
import { validatePlacementRequest } from '../domain/placementValidation';

const Form = styled.form`
  max-width: 600px;
  padding: 24px;
  border: 1px solid #dbe3ee;
  border-radius: 12px;
  background: white;
`;

const ErrorText = styled.p`
  margin: 4px 0 16px;
  color: #b42318;
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
  const [errors, setErrors] = useState({});

  const product = products.find((item) => item.id === selectedProductId);
  const warehouse = warehouses.find(
    (item) => item.id === draft.warehouseId
  );
  const freePositions = warehouse
    ? warehouse.capacity - warehouse.occupied
    : 0;

  function handleSubmit(event) {
    event.preventDefault();

    const result = validatePlacementRequest(
      { productId: selectedProductId, ...draft },
      products,
      warehouses
    );

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onSubmit(result.value);
  }

  if (products.length === 0 || warehouses.length === 0) {
    return (
      <EmptyState message="Для заявки потрібні хоча б один товар і один склад." />
    );
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormField id="product" label="Товар">
        <select
          id="product"
          value={selectedProductId || ''}
          aria-invalid={Boolean(errors.productId)}
          aria-describedby={errors.productId ? 'product-error' : undefined}
          onChange={(event) => {
            onSelectProduct(event.target.value);
            setErrors({});
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
      {errors.productId && (
        <ErrorText id="product-error" role="alert">
          {errors.productId}
        </ErrorText>
      )}

      <FormField id="warehouse" label="Склад">
        <select
          id="warehouse"
          value={draft.warehouseId}
          aria-invalid={Boolean(errors.warehouseId)}
          aria-describedby={errors.warehouseId ? 'warehouse-error' : undefined}
          onChange={(event) => {
            onDraftChange('warehouseId', event.target.value);
            setErrors({});
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
      {errors.warehouseId && (
        <ErrorText id="warehouse-error" role="alert">
          {errors.warehouseId}
        </ErrorText>
      )}

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
        label={
          product
            ? `Кількість товару (${product.unit})`
            : 'Кількість товару'
        }
      >
        <input
          id="quantity"
          type="number"
          min="1"
          step="1"
          value={draft.quantity}
          aria-invalid={Boolean(errors.quantity)}
          aria-describedby={errors.quantity ? 'quantity-error' : undefined}
          onChange={(event) => {
            onDraftChange('quantity', event.target.value);
            setErrors({});
          }}
          required
        />
      </FormField>
      {errors.quantity && (
        <ErrorText id="quantity-error" role="alert">
          {errors.quantity}
        </ErrorText>
      )}

      <FormField
        id="positions"
        label="Потрібно місць зберігання"
        hint="Одна партія товару може займати кілька місць незалежно від кількості одиниць товару."
      >
        <input
          id="positions"
          type="number"
          min="1"
          step="1"
          value={draft.positions}
          aria-invalid={Boolean(errors.positions)}
          aria-describedby={
            errors.positions
              ? 'positions-hint positions-error'
              : 'positions-hint'
          }
          onChange={(event) => {
            onDraftChange('positions', event.target.value);
            setErrors({});
          }}
          required
        />
      </FormField>
      {errors.positions && (
        <ErrorText id="positions-error" role="alert">
          {errors.positions}
        </ErrorText>
      )}

      <FormField id="note" label="Примітка до заявки">
        <textarea
          id="note"
          rows={4}
          value={draft.note ?? ''}
          aria-invalid={Boolean(errors.note)}
          aria-describedby={errors.note ? 'note-error' : undefined}
          onChange={(event) => {
            onDraftChange('note', event.target.value);
            setErrors({});
          }}
          required
        />
      </FormField>
      {errors.note && (
        <ErrorText id="note-error" role="alert">
          {errors.note}
        </ErrorText>
      )}

      <AppButton type="submit">Сформувати заявку</AppButton>{' '}
      <AppButton
        type="button"
        onClick={() => {
          onClear();
          setErrors({});
        }}
      >
        Очистити поля
      </AppButton>
    </Form>
  );
}