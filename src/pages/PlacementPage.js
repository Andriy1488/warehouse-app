import React, { useState } from 'react';
import Section from '../components/Section';
import PlacementForm from '../components/PlacementForm';
import { MutedText } from '../styles/ui';

export default function PlacementPage({ products, warehouses }) {
  const [request, setRequest] = useState(null);
  const product = request && products.find((item) => item.id === request.productId);
  const warehouse = request && warehouses.find((item) => item.id === request.warehouseId);

  return (
    <>
      <h1>Розміщення товару</h1>
      <MutedText>Навчальний макет заявки. Формування заявки не змінює залишки на складах.</MutedText>
      <Section id="placement" title="Нова заявка">
        <PlacementForm products={products} warehouses={warehouses} onSubmit={setRequest} />
        {request && product && warehouse && (
          <p role="status" style={{ marginTop: 20 }}>
            Заявку сформовано: {product.name}, {request.quantity} {product.unit};
            склад — {warehouse.name}; потрібно {request.positions} місць зберігання.
          </p>
        )}
      </Section>
    </>
  );
}
