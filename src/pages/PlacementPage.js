import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import PlacementForm from '../components/PlacementForm';
import { useProductSelection } from '../context/ProductSelectionContext';
import { usePlacementRequests } from '../context/PlacementRequestsContext';
import { MutedText } from '../styles/ui';

const emptyDraft = {
  warehouseId: '',
  quantity: '',
  positions: '',
  note: '',
};

export default function PlacementPage({ products, warehouses }) {
  const navigate = useNavigate();
  const { createRequest } = usePlacementRequests();

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

  const selectedProduct = products.find(
    (item) => item.id === selectedProductId
  );
  const selectedWarehouse = warehouses.find(
    (item) => item.id === draft.warehouseId
  );

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
  }

  function handleDraftChange(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleClear() {
    setDraft(emptyDraft);
  }

  function handleSubmit(value) {
    const result = createRequest(value);

    if (result.ok) {
      navigate('/placements', {
        state: { notice: `Заявку ${result.record.id} створено.` },
      });
    }
  }

  return (
    <>
      <h1>Розміщення товару</h1>
      <MutedText>
        Заявки зберігаються в пам’яті сторінки до її оновлення.
        Залишки товарів на складах не змінюються.
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
          onSubmit={handleSubmit}
        />

        <div style={{ marginTop: 24 }}>
          <h3>Підсумок чернетки</h3>
          <p>Товар: {selectedProduct?.name || 'не вибрано'}</p>
          <p>Склад: {selectedWarehouse?.name || 'не вибрано'}</p>
          <p>Кількість: {draft.quantity || 'не вказано'}</p>
          <p>Місць зберігання: {draft.positions || 'не вказано'}</p>
          <p>Примітка: {draft.note || 'не вказано'}</p>
        </div>
      </Section>
    </>
  );
}