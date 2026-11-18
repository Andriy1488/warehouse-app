import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PlacementForm from '../components/PlacementForm';
import { usePlacementRequests } from '../context/PlacementRequestsContext';

function PlacementEditor({ request, products, warehouses }) {
  const navigate = useNavigate();
  const { updateRequest } = usePlacementRequests();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const [selectedProductId, setSelectedProductId] = useState(
    request.productId
  );
  const [draft, setDraft] = useState({
    warehouseId: request.warehouseId,
    quantity: String(request.quantity),
    positions: String(request.positions),
    note: request.note ?? '',
  });

  function handleSelectProduct(id) {
    setSelectedProductId(id || null);
    setDraft({
      warehouseId: '',
      quantity: '',
      positions: '',
      note: '',
    });
  }

  function handleDraftChange(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleClear() {
    setDraft({
      warehouseId: '',
      quantity: '',
      positions: '',
      note: '',
    });
  }

  async function handleSubmit(value) {
  if (isSaving) return;

  setIsSaving(true);
  setSaveError('');

  try {
    const result = await updateRequest(request.id, value);

    if (!result.ok) {
      setSaveError(result.message || 'Не вдалося оновити заявку.');
      return;
    }

    navigate('/placements', {
      state: { notice: `Заявку ${request.id} оновлено.` },
    });
  } catch {
    setSaveError('Не вдалося оновити заявку. Спробуйте ще раз.');
  } finally {
    setIsSaving(false);
  }
}
const product = products.find(
  (item) => item.id === selectedProductId
);

const warehouse = warehouses.find(
  (item) => item.id === draft.warehouseId
);
  return (
    <>
      <Link to="/placements">← До списку заявок</Link>
      <h1>Редагування заявки {request.id}</h1>
      <p>Після збереження зміни з’являться у списку заявок.</p>

      <fieldset
  disabled={isSaving}
  style={{ border: 0, margin: 0, padding: 0 }}
>
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
      </fieldset>

      {isSaving && <p role="status">Зберігаємо зміни…</p>}
      {saveError && <p role="alert">{saveError}</p>}

      <h2>Підсумок чернетки</h2>
      <p>Товар: {product?.name || 'не вибрано'}</p>
      <p>Склад: {warehouse?.name || 'не вибрано'}</p>
      <p>Кількість: {draft.quantity || 'не вказано'}</p>
      <p>Місць зберігання: {draft.positions || 'не вказано'}</p>
      <p>Примітка: {draft.note || 'не вказано'}</p>
    </>
  );
}

export default function PlacementEditPage({
  requests,
  products,
  warehouses,
}) {
  const { placementId } = useParams();
  const { status, loadError, reload } = usePlacementRequests();
  const request = requests.find((item) => item.id === placementId);

  if (status === 'loading') {
  return <p role="status">Завантажуємо заявку…</p>;
}

if (status === 'error') {
  return (
    <>
      <p role="alert">
        Не вдалося завантажити заявку. {loadError}
      </p>
      <button type="button" onClick={reload}>
        Спробувати ще раз
      </button>
    </>
  );
}

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