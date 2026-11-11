import React, { createContext, useContext, useRef, useState } from 'react';
import { placementRequests } from '../data/placementRequests';
import { validatePlacementRequest } from '../domain/placementValidation';

const PlacementRequestsContext = createContext(null);

export function PlacementRequestsProvider({
  products,
  warehouses,
  children,
}) {
  const [requests, setRequests] = useState(() =>
    placementRequests.map((request) => ({ ...request }))
  );

  const nextId = useRef(
    Math.max(
      0,
      ...placementRequests.map((request) => Number(request.id.slice(2)) || 0)
    ) + 1
  );

  function createRequest(draft) {
    const result = validatePlacementRequest(draft, products, warehouses);
    if (!result.ok) return result;

    const record = {
      id: `pl${nextId.current++}`,
      ...result.value,
    };

    setRequests((current) => [...current, record]);
    return { ok: true, record };
  }

  function updateRequest(id, draft) {
    const existing = requests.find((request) => request.id === id);
    if (!existing) {
      return { ok: false, message: 'Заявку не знайдено.' };
    }

    const result = validatePlacementRequest(draft, products, warehouses);
    if (!result.ok) return result;

    const record = { ...existing, ...result.value, id };

    setRequests((current) =>
      current.map((request) => (request.id === id ? record : request))
    );

    return { ok: true, record };
  }

  function deleteRequest(id) {
    const existing = requests.find((request) => request.id === id);
    if (!existing) {
      return { ok: false, message: 'Заявку не знайдено.' };
    }

    setRequests((current) =>
      current.filter((request) => request.id !== id)
    );

    return { ok: true, record: existing };
  }

  return (
    <PlacementRequestsContext.Provider
      value={{ requests, createRequest, updateRequest, deleteRequest }}
    >
      {children}
    </PlacementRequestsContext.Provider>
  );
}

export function usePlacementRequests() {
  const context = useContext(PlacementRequestsContext);

  if (!context) {
    throw new Error(
      'usePlacementRequests потрібно викликати всередині PlacementRequestsProvider'
    );
  }

  return context;
}