import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import EmptyState from '../components/EmptyState';

export default function PlacementsPage({ requests, products, warehouses }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const warehouseId = searchParams.get('warehouse') || '';
  const sort = searchParams.get('sort') || 'default';

  function updateParam(name, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value && value !== 'default') {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    setSearchParams(nextParams, { replace: true });
  }

  const visibleRequests = requests
    .filter((request) => {
      const product = products.find(
        (item) => item.id === request.productId
      );
      const warehouse = warehouses.find(
        (item) => item.id === request.warehouseId
      );

      const searchableText = [
        request.id,
        product?.name,
        warehouse?.name,
        request.note,
      ]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('uk');

      const matchesSearch = searchableText.includes(
        query.trim().toLocaleLowerCase('uk')
      );
      const matchesWarehouse =
        !warehouseId || request.warehouseId === warehouseId;

      return matchesSearch && matchesWarehouse;
    })
    .sort((first, second) => {
      if (sort === 'quantity-asc') {
        return first.quantity - second.quantity;
      }

      if (sort === 'quantity-desc') {
        return second.quantity - first.quantity;
      }

      return 0;
    });

  return (
    <>
      <h1>Заявки на розміщення</h1>

      {location.state?.notice && (
        <p role="status">{location.state.notice}</p>
      )}

      <p>
        Нові заявки додаються до списку та зберігаються до оновлення сторінки.
      </p>

      <Section id="placement-requests" title="Список заявок">
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 24,
          }}
        >
          <label htmlFor="request-search">
            Пошук заявки
            <input
              id="request-search"
              type="search"
              value={query}
              onChange={(event) =>
                updateParam('q', event.target.value)
              }
              placeholder="ID, товар, склад або примітка"
            />
          </label>

          <label htmlFor="request-warehouse">
            Склад
            <select
              id="request-warehouse"
              value={warehouseId}
              onChange={(event) =>
                updateParam('warehouse', event.target.value)
              }
            >
              <option value="">Усі склади</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="request-sort">
            Сортування
            <select
              id="request-sort"
              value={sort}
              onChange={(event) =>
                updateParam('sort', event.target.value)
              }
            >
              <option value="default">За порядком додавання</option>
              <option value="quantity-asc">Кількість: від меншої</option>
              <option value="quantity-desc">Кількість: від більшої</option>
            </select>
          </label>
        </div>

        {requests.length === 0 ? (
          <EmptyState message="Заявок поки немає." />
        ) : visibleRequests.length === 0 ? (
          <EmptyState message="За обраними умовами заявок не знайдено." />
        ) : (
          <ul>
            {visibleRequests.map((request) => {
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
                  <p>
                    Кількість: {request.quantity} {product?.unit || ''}
                  </p>
                  <p>Місць зберігання: {request.positions}</p>
                  <p>Примітка: {request.note}</p>
                  <Link to={`/placements/${request.id}`}>
                    Переглянути заявку
                  </Link>{' '}
                  <Link to={`/placements/${request.id}/edit`}>
                    Редагувати заявку
                  </Link>
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