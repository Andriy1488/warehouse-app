import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
import PlacementForm from '../components/PlacementForm';
import { useProductSelection } from '../context/ProductSelectionContext';
import { MutedText } from '../styles/ui';
import { useSearchParams } from 'react-router-dom';

const emptyDraft = {
  warehouseId: '',
  quantity: '',
  positions: '',
};

export default function PlacementPage({ products, warehouses }) {
  const {
  selectedProductId: rememberedProductId,
  setSelectedProductId,
} = useProductSelection();

const [searchParams, setSearchParams] = useSearchParams();

const selectedProductId = searchParams.has('productId')
  ? products.find(
      (item) => item.id === searchParams.get('productId')
    )?.id ?? null
  : rememberedProductId;

  const [draft, setDraft] = useState(emptyDraft);
  const [request, setRequest] = useState(null);

  const selectedProduct = products.find(
    (item) => item.id === selectedProductId
  );
  const selectedWarehouse = warehouses.find(
    (item) => item.id === draft.warehouseId
  );

  const requestedProduct = request
    ? products.find((item) => item.id === request.productId)
    : null;
  const requestedWarehouse = request
    ? warehouses.find((item) => item.id === request.warehouseId)
    : null;

  const pageTitle = selectedProduct
    ? `${selectedProduct.name} | Розміщення товару`
    : 'Розміщення товару | Склади та товари';

  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;

    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);

  function handleSelectProduct(id) {
    const nextId = id || null;

    if (nextId === selectedProductId) return;

    setSelectedProductId(nextId);
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextId) {
      nextSearchParams.set('productId', nextId);
    } else {
      nextSearchParams.delete('productId');
    }

    setSearchParams(nextSearchParams, { replace: true });
    setDraft(emptyDraft);
    setRequest(null);
  }

  function handleDraftChange(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
    setRequest(null);
  }

  function handleClear() {
    setDraft(emptyDraft);
    setRequest(null);
  }

  return (
    <>
      <h1>Розміщення товару</h1>
      <MutedText>
        Навчальний макет заявки. Формування заявки не змінює залишки на складах.
      </MutedText>

      <Section id="placement" title="Нова заявка">
        <PlacementForm
          products={products}
          warehouses={warehouses}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
          draft={draft}
          onDraftChange={handleDraftChange}
          onClear={handleClear}
          onSubmit={setRequest}
        />

        <div style={{ marginTop: 24 }}>
          <h3>Підсумок чернетки</h3>
          <p>Товар: {selectedProduct?.name || 'не вибрано'}</p>
          <p>Склад: {selectedWarehouse?.name || 'не вибрано'}</p>
          <p>Кількість: {draft.quantity || 'не вказано'}</p>
          <p>Місць зберігання: {draft.positions || 'не вказано'}</p>
        </div>

        {request && requestedProduct && requestedWarehouse && (
          <p role="status" style={{ marginTop: 20 }}>
            Заявку сформовано: {requestedProduct.name}, {request.quantity}{' '}
            {requestedProduct.unit}; склад — {requestedWarehouse.name};
            потрібно {request.positions} місць зберігання.
          </p>
        )}
      </Section>
    </>
  );
}