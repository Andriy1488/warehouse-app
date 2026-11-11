import React from 'react';
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
  const { deleteRequest } = usePlacementRequests();

  const request = requests.find((item) => item.id === placementId);

  function handleDelete() {
    const confirmed = window.confirm(
      `Видалити заявку ${placementId}?`
    );

    if (!confirmed) return;

    const result = deleteRequest(placementId);

    if (result.ok) {
      navigate('/placements', {
        state: { notice: `Заявку ${placementId} видалено.` },
      });
    }
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
      <AppButton type="button" onClick={handleDelete}>
        Видалити заявку
      </AppButton>
    </>
  );
}