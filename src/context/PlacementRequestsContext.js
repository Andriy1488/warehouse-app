import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { requestService as service } from '../services/requestService';
import { errorMessage } from '../services/ServiceError';

const PlacementRequestsContext = createContext(null);

export function PlacementRequestsProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('loading');
  const [loadError, setLoadError] = useState('');
  const activeRead = useRef(null);

  const reload = useCallback(async () => {
    activeRead.current?.abort();

    const controller = new AbortController();
    activeRead.current = controller;

    setStatus('loading');
    setLoadError('');

    try {
      const records = await service.getAll({ signal: controller.signal });

      if (controller.signal.aborted) return;

      setRequests(records);
      setStatus('success');
    } catch (error) {
      if (controller.signal.aborted) return;

      setLoadError(errorMessage(error));
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
    return () => activeRead.current?.abort();
  }, [reload]);

  // Спочатку чекаємо підтвердження запису, потім оновлюємо список.
  async function saveChange(operation) {
    try {
      const record = await operation();
      await reload();
      return { ok: true, record };
    } catch (error) {
      return {
        ok: false,
        message: errorMessage(error),
        errors: error.errors || {},
      };
    }
  }

  function createRequest(input) {
    return saveChange(() => service.create(input));
  }

  function updateRequest(id, input) {
    return saveChange(() => service.update(id, input));
  }

  function deleteRequest(id) {
    return saveChange(() => service.delete(id));
  }

  return (
    <PlacementRequestsContext.Provider
      value={{
        requests,
        status,
        loadError,
        reload,
        createRequest,
        updateRequest,
        deleteRequest,
      }}
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