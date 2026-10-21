import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Section from '../components/Section';
import StockBadge from '../components/StockBadge';
import EmptyState from '../components/EmptyState';

export default function ProductDetailsPage({ products }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <>
        <h1>Товар не знайдено</h1>
        <p>Товару з ID «{productId}» немає в каталозі.</p>
        <Link to="/products">Повернутися до каталогу</Link>
      </>
    );
  }

  const totalQuantity = product.placements.reduce(
    (sum, placement) => sum + placement.quantity,
    0
  );

  return (
    <>
      <Link to="/products">← Назад до каталогу</Link>
      <h1>{product.name}</h1>
      <p>Артикул: {product.sku}</p>
      <p><StockBadge quantity={totalQuantity} unit={product.unit} /></p>

      <p>
        <button
            type="button"
            onClick={() =>
            navigate(`/placements/new?productId=${product.id}`)
            }
        >
            Створити заявку для цього товару
        </button>
        </p>

      <Section id="product-placements" title="Розміщення на складах">
        {product.placements.length > 0 ? (
          <ul>
            {product.placements.map((placement) => (
              <li key={placement.warehouseId}>
                {placement.warehouseName}: {placement.quantity} {product.unit}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState message="Цей товар ще не розміщено на складах." />
        )}
      </Section>
    </>
  );
}