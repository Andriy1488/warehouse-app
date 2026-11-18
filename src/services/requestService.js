import { mockRequestService } from './mockRequestService';
import { apiRequestService } from './apiRequestService';

export const requestService =
  process.env.REACT_APP_DATA_SOURCE === 'api'
    ? apiRequestService
    : mockRequestService;