import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import PlacementPage from './pages/PlacementPage';
import AboutPage from './pages/AboutPage';
import { ProductSelectionProvider } from './context/ProductSelectionContext';
import { products, warehouses } from './data/inventory';

const links = [
  { to: '/', label: 'Головна' },
  { to: '/products', label: 'Товари' },
  { to: '/placement', label: 'Розміщення' },
  { to: '/about', label: 'Про нас' },
];

export default function App() {
  return (
    <AppLayout title="Склади та товари" links={links}>
      <ProductSelectionProvider>
        <Routes>
          <Route
            path="/"
            element={<HomePage warehouses={warehouses} />}
          />
          <Route
            path="/products"
            element={<ProductsPage products={products} />}
          />
          <Route
            path="/placement"
            element={
              <PlacementPage
                products={products}
                warehouses={warehouses}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="*"
            element={<p>Сторінку не знайдено. Виберіть розділ у меню.</p>}
          />
        </Routes>
      </ProductSelectionProvider>
    </AppLayout>
  );
}