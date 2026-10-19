import React from 'react';
import styled from 'styled-components';
import Section from '../components/Section';
import ProductList from '../components/ProductList';
import EmptyState from '../components/EmptyState';
import useProductFilters from '../hooks/useProductFilters';
import { useProductSelection } from '../context/ProductSelectionContext';
import { MutedText } from '../styles/ui';

const Filters = styled.div`
  display: grid;
  gap: 8px;
  max-width: 480px;
  margin-bottom: 20px;

  input[type='search'] {
    width: 100%;
    min-width: 0;
  }

  label:last-child {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    justify-self: start;
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    min-height: 18px;
    margin: 0;
    padding: 0;
    flex: 0 0 auto;
  }
`;

export default function ProductsPage({ products }) {
  const {
    query,
    setQuery,
    inStockOnly,
    setInStockOnly,
    visibleProducts,
  } = useProductFilters(products);

  const {
    selectedProductId,
    setSelectedProductId,
  } = useProductSelection();

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  );

  return (
    <>
      <h1>Товари</h1>
      <MutedText>Кількість товарів і їх розміщення на складах.</MutedText>

      <Section id="products" title="Каталог товарів">
        <Filters>
          <label htmlFor="product-search">Пошук товару:</label>
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Введіть назву"
          />

          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
            />
            Лише товари в наявності
          </label>
        </Filters>

        <p role="status">
          {selectedProduct
            ? `Вибрано для розміщення: ${selectedProduct.name}`
            : 'Товар для розміщення не вибрано.'}
        </p>

        <p>Знайдено товарів: {visibleProducts.length}</p>

        {visibleProducts.length > 0 ? (
          <ProductList
            items={visibleProducts}
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
          />
        ) : (
          <EmptyState message="За вибраними фільтрами товарів не знайдено." />
        )}
      </Section>
    </>
  );
}