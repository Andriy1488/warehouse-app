import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppButton from '../components/AppButton';
import { usePlacementRequests } from '../context/PlacementRequestsContext';

export default function PlacementDetailsPage({
  requests,
  products,
  warehouses,
}) {
  const { placementId } = useParams();
  const navigate = useNavigate();
  const { deleteRequest, status, loadError, reload } =
  usePlacementRequests();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const request = requests.find((item) => item.id === placementId);

        async function handleDelete() {
        if (isDeleting) return;

        const confirmed = window.confirm(
          `Видалити заявку ${placementId}?`
        );

        if (!confirmed) return;

        setIsDeleting(true);
        setDeleteError('');

        try {
          const result = await deleteRequest(placementId);

          if (!result.ok) {
            setDeleteError(result.message || 'Не вдалося видалити заявку.');
            return;
          }

          navigate('/placements', {
            state: { notice: `Заявку ${placementId} видалено.` },
          });
        } catch {
          setDeleteError('Не вдалося видалити заявку. Спробуйте ще раз.');
        } finally {
          setIsDeleting(false);
        }
}
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

  const product = products.find(
    (item) => item.id === request.productId
  );
  const warehouse = warehouses.find(
    (item) => item.id === request.warehouseId
  );

  return (
    <>
      <Link to="/placements">← До списку заявок</Link>
      <h1>Заявка {request.id}</h1>
      <p>Товар: {product?.name || 'Не знайдено'}</p>
      <p>Склад: {warehouse?.name || 'Не знайдено'}</p>
      <p>
        Кількість: {request.quantity} {product?.unit || ''}
      </p>
      <p>Місць зберігання: {request.positions}</p>
      <p>Примітка: {request.note}</p>

      <Link to={`/placements/${request.id}/edit`}>
        Редагувати заявку
      </Link>{' '}
      <fieldset
          disabled={isDeleting}
          style={{ border: 0, margin: 0, padding: 0 }}
        >
          <AppButton type="button" onClick={handleDelete}>
            Видалити заявку
          </AppButton>
        </fieldset>

        {isDeleting && <p role="status">Видаляємо заявку…</p>}
        {deleteError && <p role="alert">{deleteError}</p>}
    </>
  );
}