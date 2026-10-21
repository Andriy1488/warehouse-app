import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <h1>Сторінку не знайдено</h1>
      <p>Перевір адресу або повернися на головну сторінку.</p>
      <Link to="/">На головну</Link>
    </>
  );
}