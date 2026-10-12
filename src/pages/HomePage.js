import React, { useState } from 'react';
import Section from '../components/Section';
import WarehouseSummary from '../components/WarehouseSummary';
import WarehouseList from '../components/WarehouseList';
import Hello from '../components/Hello';
import Goodbye from '../components/Goodbye';
import StateMessage from '../components/StateMessage';
import AppButton from '../components/AppButton';
import { MutedText } from '../styles/ui';

export default function HomePage({ warehouses }) {
  const [changed, setChanged] = useState(false);

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

      <Section id="react-demo" title="Демонстрація стану з ЛР 1.1">
        <Hello />
        <Goodbye />
        <StateMessage changed={changed} />
        <AppButton onClick={() => setChanged((current) => !current)}>
          {changed ? 'Повернути текст' : 'Змінити текст'}
        </AppButton>
      </Section>
    </>
  );
}
