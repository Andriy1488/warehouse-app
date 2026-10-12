import React from 'react';
import { MutedText } from '../styles/ui';

export default function EmptyState({ message = 'Дані відсутні.' }) {
  return <MutedText>{message}</MutedText>;
}
