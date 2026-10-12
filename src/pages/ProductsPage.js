import React from 'react';
import Section from '../components/Section';
import ProductList from '../components/ProductList';
import { MutedText } from '../styles/ui';

export default function ProductsPage({ products }) {
  return (
    <>
      <h1>Товари</h1>
      <MutedText>Кількість товарів і їх розміщення на складах.</MutedText>
      <Section id="products" title="Каталог товарів">
        <ProductList items={products} />
      </Section>
    </>
  );
}
