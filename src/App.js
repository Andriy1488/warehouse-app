import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import PlacementPage from './pages/PlacementPage';
import AboutPage from './pages/AboutPage';
import { ProductSelectionProvider } from './context/ProductSelectionContext';
import { products, warehouses } from './data/inventory';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PlacementsPage from './pages/PlacementsPage';
import { placementRequests } from './data/placementRequests';
import PlacementEditPage from './pages/PlacementEditPage';
import { Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';


const links = [
  { to: '/', label: 'Головна' },
  { to: '/products', label: 'Товари' },
  { to: '/placements/new', label: 'Розміщення' },
  { to: '/placements', label: 'Заявки' },
  { to: '/about', label: 'Про нас' },
];

export default function App() {
  return (
    <ProductSelectionProvider>
      <Routes>
        <Route element={<AppLayout title="Склади та товари" links={links} />}>
          <Route index element={<HomePage warehouses={warehouses} />} />
          <Route
            path="products"
            element={<ProductsPage products={products} />}
          />
          <Route
            path="placement"
            element={<Navigate to="/placements/new" replace />}
          />
          <Route path="placements">
          <Route
            index
            element={
              <PlacementsPage
                requests={placementRequests}
                products={products}
                warehouses={warehouses}
              />
            }
          />
          <Route
            path="new"
            element={
              <PlacementPage products={products} warehouses={warehouses} />
            }
          />
          <Route
            path=":placementId/edit"
            element={
              <PlacementEditPage
                requests={placementRequests}
                products={products}
                warehouses={warehouses}
              />
            }
          />
        </Route>
          <Route path="about" element={<AboutPage />} />
          <Route
          path="products/:productId"
          element={<ProductDetailsPage products={products} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
      </Routes>
    </ProductSelectionProvider>
  );
}