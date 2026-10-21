import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PlacementForm from '../components/PlacementForm';

function PlacementEditor({ request, products, warehouses }) {
  const [selectedProductId, setSelectedProductId] = useState(request.productId);
  const [draft, setDraft] = useState({
    warehouseId: request.warehouseId,
    quantity: String(request.quantity),
    positions: String(request.positions),
  });
  const [preview, setPreview] = useState(null);

  function handleSelectProduct(id) {
    setSelectedProductId(id || null);
    setDraft({ warehouseId: '', quantity: '', positions: '' });
    setPreview(null);
  }

  function handleDraftChange(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
    setPreview(null);
  }

  function handleClear() {
    setDraft({ warehouseId: '', quantity: '', positions: '' });
    setPreview(null);
  }

  const product = products.find((item) => item.id === selectedProductId);
  const warehouse = warehouses.find((item) => item.id === draft.warehouseId);

  return (
    <>
      <Link to="/placements">← До списку заявок</Link>
      <h1>Редагування заявки {request.id}</h1>
      <p>Поля заповнено з демонстраційного запису. Зміни поки не зберігаються.</p>

      <PlacementForm
        products={products}
        warehouses={warehouses}
        selectedProductId={selectedProductId}
        onSelectProduct={handleSelectProduct}
        draft={draft}
        onDraftChange={handleDraftChange}
        onClear={handleClear}
        onSubmit={setPreview}
      />

      <h2>Підсумок чернетки</h2>
      <p>Товар: {product?.name || 'не вибрано'}</p>
      <p>Склад: {warehouse?.name || 'не вибрано'}</p>
      <p>Кількість: {draft.quantity || 'не вказано'}</p>
      <p>Місць зберігання: {draft.positions || 'не вказано'}</p>

      {preview && (
        <p role="status">
          Дані форми перевірено. Демонстраційна заявка не змінена.
        </p>
      )}
    </>
  );
}

export default function PlacementEditPage({ requests, products, warehouses }) {
  const { placementId } = useParams();
  const request = requests.find((item) => item.id === placementId);

  if (!request) {
    return (
      <>
        <h1>Заявку не знайдено</h1>
        <p>Заявки з ID «{placementId}» немає у списку.</p>
        <Link to="/placements">Повернутися до списку заявок</Link>
      </>
    );
  }

  return (
    <PlacementEditor
      key={request.id}
      request={request}
      products={products}
      warehouses={warehouses}
    />
  );
}