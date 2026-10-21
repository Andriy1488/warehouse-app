import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import EmptyState from '../components/EmptyState';

export default function PlacementsPage({ requests, products, warehouses }) {
  return (
    <>
      <h1>Заявки на розміщення</h1>
      <p>Це демонстраційні записи. Нові заявки поки не зберігаються.</p>

      <Section id="placement-requests" title="Список заявок">
        {requests.length === 0 ? (
          <EmptyState message="Заявок поки немає." />
        ) : (
          <ul>
            {requests.map((request) => {
              const product = products.find(
                (item) => item.id === request.productId
              );
              const warehouse = warehouses.find(
                (item) => item.id === request.warehouseId
              );

              return (
                <li key={request.id}>
                  <h3>Заявка {request.id}</h3>
                  <p>Товар: {product?.name || 'Не знайдено'}</p>
                  <p>Склад: {warehouse?.name || 'Не знайдено'}</p>
                  <p>Кількість: {request.quantity} {product?.unit || ''}</p>
                  <p>Місць зберігання: {request.positions}</p>
                  {' '} <Link to={`/placements/${request.id}/edit`}> Редагувати заявку</Link>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Link to="/placements/new">Створити нову заявку</Link>
    </>
  );
}