import React from 'react';
import Section from '../components/Section';
import WarehouseSummary from '../components/WarehouseSummary';
import WarehouseList from '../components/WarehouseList';
import { MutedText } from '../styles/ui';

export default function HomePage({ warehouses }) {
  return (
    <>
      <h1>Огляд складів</h1>
      <MutedText>Перевірте доступні місця й перейдіть до розміщення товарів.</MutedText>

      <Section id="summary" title="Загальна інформація">
        <WarehouseSummary items={warehouses} />
      </Section>

      <Section id="warehouses" title="Наші склади">
        <WarehouseList items={warehouses} />
      </Section>
    </>
  );
}
