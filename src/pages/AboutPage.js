import React from 'react';
import Section from '../components/Section';

export default function AboutPage() {
  return (
    <>
      <h1>Про нас</h1>
      <Section id="about" title="Про систему">
        <p>Веб-сайт розміщення товарів по складах створено в межах лабораторної роботи 1.2.</p>
        <p>Застосунок показує склади, їх заповненість, перелік товарів та макет заявки на розміщення.</p>
        <p>Сторінки мають спільний заголовок і навігацію. Для оформлення використано styled-components.</p>
      </Section>
    </>
  );
}
