import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PlacementPage from './pages/PlacementPage';
import PlacementsPage from './pages/PlacementsPage';
import PlacementEditPage from './pages/PlacementEditPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { ProductSelectionProvider } from './context/ProductSelectionContext';
import {
  PlacementRequestsProvider,
  usePlacementRequests,
} from './context/PlacementRequestsContext';
import { products, warehouses } from './data/inventory';
import PlacementDetailsPage from './pages/PlacementDetailsPage';


const links = [
  { to: '/', label: 'Головна' },
  { to: '/products', label: 'Товари' },
  { to: '/placements/new', label: 'Розміщення' },
  { to: '/placements', label: 'Заявки' },
  { to: '/about', label: 'Про нас' },
];

function AppRoutes() {
  const { requests } = usePlacementRequests();

  return (
    <Routes>
      <Route element={<AppLayout title="Склади та товари" links={links} />}>
        <Route index element={<HomePage warehouses={warehouses} />} />

        <Route
          path="products"
          element={<ProductsPage products={products} />}
        />
        <Route
          path="products/:productId"
          element={<ProductDetailsPage products={products} />}
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
                requests={requests}
                products={products}
                warehouses={warehouses}
              />
            }
          />
          <Route
            path=":placementId"
            element={
              <PlacementDetailsPage
                requests={requests}
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
                requests={requests}
                products={products}
                warehouses={warehouses}
              />
            }
          />
        </Route>

        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ProductSelectionProvider>
      <PlacementRequestsProvider
        products={products}
        warehouses={warehouses}
      >
        <AppRoutes />
      </PlacementRequestsProvider>
    </ProductSelectionProvider>
  );
}